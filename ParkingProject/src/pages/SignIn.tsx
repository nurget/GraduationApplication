import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../components/DismissKeyboardView';
import {Button, SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';

SplashScreen.hide();

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null); // generic, ts에만 있음. 타입이라고 보면 됨.
  const passwordRef = useRef<TextInput | null>(null); // TextInput 또는 null, 기본값도 null인데 입력 받으면 레프가 TextInput이 됨.

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim()); // trim은 스페이스바 입력 못하게 막아줌
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      // trim은 좌우공백을 없애줌, 확실히 검증.
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (
      // 이메일을 검사하는 정규표현식(문자의 패턴을 나타내는 표현식)
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;

  return (
    <DismissKeyboardView style={styles.bgColor}>
      <View style={styles.logoImg}>
        <Image source={require('../assets/img/appIcon.png')}></Image>
        <Text style={styles.logoTxt}>나만의 주차장</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.titleTxt}>로그인</Text>
      </View>
      <View style={styles.inputWrapper}>
        {/* <Text style={styles.label}>이메일</Text> */}
        <TextInput
          style={styles.textInput}
          placeholder="이메일을 입력해주세요"
          value={email}
          onChangeText={onChangeEmail}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus;
          }}
          blurOnSubmit={false} // 키보드 내려가는 거 막아줌
          ref={emailRef}
          clearButtonMode="while-editing" //iOS에서만 동작
        />
      </View>
      <View style={styles.inputWrapper}>
        {/* <Text style={styles.label}>비밀번호</Text> */}
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Pressable>
          <Text style={styles.passwordLabel}>비밀번호를 잊으셨나요?</Text>
        </Pressable>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.orArea}>OR</Text>
      </View>

      <View>
        {/* <Image source={require('../assets/img/Mail.png')} /> */}
        <Pressable
          onPress={onSubmit}
          style={styles.kakaoLoginButton}
          disabled={!canGoNext}>
          <Text style={styles.kakaoLoginButtonText}>카카오 로그인</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={onSubmit}
          style={styles.googleLoginButton}
          disabled={!canGoNext}>
          <Text style={styles.googleLoginButtonText}>구글 로그인</Text>
        </Pressable>
      </View>
      <View style={styles.buttonZone}>
        <Pressable onPress={toSignUp}>
          <Text style={styles.registerText}>아직 계정이 없으신가요?</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#fff',
  },
  logoImg: {
    alignItems: 'center',
    marginTop: 50,
  },
  logoTxt: {
    fontWeight: '600',
    fontSize: 32,
    marginTop: 10,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
  },
  inputWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  label: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 10,
  },
  passwordLabel: {
    color: '#3D56F0',
  },
  loginButton: {
    backgroundColor: 'gray',
    // paddingHorizontal: 20,
    padding: 150,
    paddingVertical: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  kakaoLoginButton: {
    backgroundColor: '#F7E600',
    padding: 130,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
  },
  googleLoginButton: {
    backgroundColor: '#4285f4',
    padding: 130,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
  },

  kakaoLoginButtonText: {
    color: '#111',
    fontSize: 16,
  },
  googleLoginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginButtonActive: {
    backgroundColor: '#3D56F0',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  registerText: {
    color: '#3D56F0',
    marginTop: 10,
  },
  buttonZone: {
    alignItems: 'center',
  },
  orArea: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#9D9898',
  },
});

export default SignIn;
