import React, { Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import IndexProviders from './providers';
import IndexRouter from './routes';

function App(): React.ReactElement {
  return (
    <IndexProviders>
      <>
        <Suspense fallback={() => 'loading...'}>
          <IndexRouter />
        </Suspense>
        {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
      </>
    </IndexProviders>
  );
}

export default App;
