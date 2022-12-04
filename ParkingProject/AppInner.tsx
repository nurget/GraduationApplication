import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings';
import Booking from './src/pages/Booking';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{title: '주차장 찾기'}}
          />
          <Tab.Screen
            name="주차장 예약"
            component={Delivery}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="즐겨찾기"
            component={Settings}
            options={{title: '즐겨찾기'}}
          />
          <Tab.Screen
            name="프로필"
            component={Booking}
            options={{title: '프로필'}}
          />
        </Tab.Navigator>
      ) : (
        // 로그인 안되어있으면 나타나는 화면
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인', headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입', headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;
