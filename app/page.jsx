'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [src, setSrc] = useState('/game/index.html');
  useEffect(() => {
    if (window.location.search) setSrc(`/game/index.html${window.location.search}`);
  }, []);

  return (
    <main className="game-host">
      <iframe
        className="game-frame"
        src={src}
        title="Dopa Drill"
        allow="autoplay"
      />
    </main>
  );
}
