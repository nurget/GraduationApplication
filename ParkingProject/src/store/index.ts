import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
  // middleware는 flipper와 연동하는 부분
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      return getDefaultMiddleware().concat(createDebugger());
    }
    return getDefaultMiddleware();
  },
});
export default store;

// 아래 두 개가 타입 에러 방지
export type AppDispatch = typeof store.dispatch;
// 기존 함수를 새로운 함수로 바꿔주는 걸 래핑, 단순히 타입스크립트를 위해 래핑함.
export const useAppDispatch = () => useDispatch<AppDispatch>();
