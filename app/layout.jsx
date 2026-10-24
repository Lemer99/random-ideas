import './globals.css';

export const metadata = {
  title: 'Idea Shuffle',
  description: 'A little space to explore big startup ideas. Pick one at random and take your time.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
