import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {RootState} from './src/store/reducer';
import AppInner from './AppInner';

function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
