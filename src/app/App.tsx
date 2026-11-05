import { useEffect, useState } from 'react';

export const App = () => {
  const [version, setVersion] = useState<string>();

  useEffect(() => {
    void window.clippyx.getVersion().then(setVersion);
  }, []);

  return (
    <main className="app">
      <h1 className="app__title">Clippyx</h1>
      <p className="app__meta">{version ? `Version ${version}` : 'Loading…'}</p>
    </main>
  );
};
