import {combineReducers} from 'redux';
import orderSlice from '../slices/order';

import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  order: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>; // 타입 에러 방지
export default rootReducer;
