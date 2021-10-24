import React, { Suspense, useEffect } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './components/Layout';
import IndexProviders from './providers';
import IndexRouter from './routes';

function App(): React.ReactElement {
  useEffect(() => {
    const root = window.document.documentElement;

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  return (
    <IndexProviders>
      <Layout>
        <>
          <Suspense fallback={() => 'loading...'}>
            <IndexRouter />
          </Suspense>
          {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
        </>
      </Layout>
    </IndexProviders>
  );
}

export default App;
