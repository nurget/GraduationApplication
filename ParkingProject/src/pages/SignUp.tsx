import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {Button} from 'react-native-elements';
import Config from 'react-native-config';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);
  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onChangeConfirmPassword = useCallback(text => {
    setConfirmPassword(text.trim());
  }, []);

  // useEffect는 async쓰면 안되는데 useCallback은 사용 가능
  const onSubmit = useCallback(async () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (password != confirmPassword) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (
      // 이메일을 검사하는 정규표현식(문자의 패턴을 나타내는 표현식)
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    // 이 정규표현식은 비밀번호 형태에 해당.
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    console.log(email, name, password, confirmPassword);
    try {
      setLoading(true);
      console.log(Config.API_URL);
      // http 메서드: get, put, fetch, post, delete, head, options
      const response = await axios.post(
        `${Config.API_URL}/user`, // 개발모드에선 localhost, 배포할 때는 실제 서버 주소
        {
          email,
          name,
          password,
          // 일방향암호화 (hash화) ex) 비밀번호를 ayeong123으로 하면 해시화 진행,
          // 1223020283 같은 알 수 없는 암호로 변경됨. 서버로 가는 순간 ayeong123 사라지고 1223020283 같은 알 수 없는 암호로 남음.
          confirmPassword,
        },
      );
      console.log(response.data);
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
      if (errorResponse) {
        Alert.alert('알림', (errorResponse.data as any).message);
      }
    } finally {
      setLoading(false);
    }
  }, [navigation, email, name, password, confirmPassword]);

  const toSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const canGoNext = email && name && password && confirmPassword;
  return (
    <DismissKeyboardView style={styles.bgColor}>
      <View style={styles.inputWrapper}>
        <Pressable onPress={toSignIn}>
          <Image
            style={styles.backStyle}
            source={require('../assets/img/Back.png')}
          />
        </Pressable>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.titleTxt}>회원가입</Text>
      </View>
      <View style={styles.inputWrapper}>
        {/* <Text style={styles.label}>이름</Text> */}
        <TextInput
          style={styles.textInput}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#666"
          onChangeText={onChangeName}
          value={name}
          textContentType="name"
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={nameRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        {/* <Text style={styles.label}>이메일</Text> */}
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          textContentType="emailAddress"
          value={email}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={emailRef}
          onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        {/* <Text style={styles.label}>비밀번호</Text> */}
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          onChangeText={onChangePassword}
          value={password}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 확인해주세요"
          placeholderTextColor="#666"
          onChangeText={onChangeConfirmPassword}
          value={confirmPassword}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!canGoNext || loading}
          onPress={onSubmit}>
          {/* 로그인 중에 버튼이 눌리지 않도록 */}
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>회원가입</Text>
          )}
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
        <Pressable onPress={toSignIn}>
          <Text style={styles.loginGoText}>이미 계정이 있으신가요?</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#fff',
  },
  backStyle: {
    marginTop: 20,
  },
  textInput: {
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    marginVertical: -5,
  },
  inputWrapper: {
    padding: 20,
  },
  titleTxt: {
    fontSize: 24,
    fontWeight: '600',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    padding: 150,
    // paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 10,
    marginVertical: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
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
  orArea: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#9D9898',
  },
  loginGoText: {
    color: '#3D56F0',
    marginTop: 10,
  },
});

export default SignUp;
