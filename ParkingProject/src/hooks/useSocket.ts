import {useCallback} from 'react';
import {io, Socket} from 'socket.io-client';
import Config from 'react-native-config';

// 리액트에서 절대 하면 안되는 것, 하지만 여기선 전역변수 설정을 위해..
// 소켓이 있을 수도 없을 수도
let socket: Socket | undefined;

const useSocket = (): [typeof socket, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);
  if (!socket) {
    // socket이 없을 때 새로운 연결을 맺는 부분
    socket = io(`${Config.API_URL}`, {
      transports: ['websocket'],
    });
  }
  // 타입스크립트는 매개변수 타입 리턴값이 붙어야 함
  return [socket, disconnect];
};

export default useSocket;
