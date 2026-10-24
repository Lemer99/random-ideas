'use client';

import { useEffect, useRef, useState } from 'react';

// Rejection sampling gives every candidate the same probability.
function randomIndex(size) {
  const range = 2 ** 32;
  const limit = range - (range % size);
  const value = new Uint32Array(1);
  do { crypto.getRandomValues(value); } while (value[0] >= limit);
  return value[0] % size;
}

function pickNext(size, previous) {
  if (size === 1) return 0;
  const next = randomIndex(previous >= 0 ? size - 1 : size);
  return previous >= 0 && next >= previous ? next + 1 : next;
}

export default function Home() {
  const [ideas, setIdeas] = useState([]);
  const [current, setCurrent] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const shuffleButton = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('/ideas.json', { signal: controller.signal });
        if (!response.ok) throw new Error('Could not load your collection. Please try again.');
        const data = await response.json();
        if (!Array.isArray(data.ideas) || !data.ideas.length) throw new Error('Your collection has no ideas yet.');
        setIdeas(data.ideas);
        setCurrent(pickNext(data.ideas.length, -1));
      } catch (failure) {
        if (controller.signal.aborted) return;
        setError(failure.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.code !== 'Space' || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target.closest('button, a, input, textarea, select, [contenteditable]')) return;
      event.preventDefault();
      shuffleButton.current?.click();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function shuffle() {
    if (error) { setAttempt(value => value + 1); return; }
    // Compute randomness outside the React updater so that updater stays pure.
    setCurrent(pickNext(ideas.length, current));
  }

  const idea = ideas[current];

  return (
    <main className="app">
      <section className="reading" aria-label="Random startup idea" aria-busy={loading}>
        <article aria-live="polite" aria-atomic="true">
          <h1>{idea?.headline ?? (error ? 'Could not load ideas.' : 'Loading…')}</h1>
          <p id="description">{idea?.description ?? (error || 'Finding your first idea.')}</p>
        </article>
      </section>
      <button id="shuffle" ref={shuffleButton} type="button" disabled={loading} onClick={shuffle}>
        {error ? 'Try again' : 'Shuffle'}
      </button>
    </main>
  );
}
