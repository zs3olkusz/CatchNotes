import React, { Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './components/Layout';
import IndexProviders from './providers';
import IndexRouter from './routes';

function App(): React.ReactElement {
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
