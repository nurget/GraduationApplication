import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const DismissKeyboardView: React.FC<{style?: StyleProp<ViewStyle>}> = ({
  children,
  ...props
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    {/* keyboard.dismiss 는 리액트 네이티브에서 제공하는 Keyboard API를 빈 공간을 터치했을 때 내려가게 해주는 함수 */}
    <KeyboardAwareScrollView
      {...props}
      behavior={Platform.OS === 'android' ? 'position' : 'padding'} // 분기처리해서 안드로이드에선 position, iOS에서는 padding
      style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
