import {combineReducers} from 'redux';

import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>; // 타입 에러 방지
export default rootReducer;
