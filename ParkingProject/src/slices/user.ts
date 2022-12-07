import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// store -> root reducer (state) -> user slice
// state.user

// action: state를 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 실행하는 함수
// reducers: 액션이 실제로 실행되면 state를 바꾸는 로직

// 전역 state
const initialState = {
  name: '',
  email: '',
  accessToken: '',
  // 수익금
  money: 0,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },

    //수익금
    setMoney(state, action: PayloadAction<number>) {
      state.money = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
  // 보통 비동기액션
  extraReducers: builder => {},
});

export default user;
