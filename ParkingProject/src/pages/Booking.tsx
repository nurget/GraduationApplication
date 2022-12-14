import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';

function Booking() {
  const [count, setCount] = useState(1);

  return (
    <View>
      <Pressable onPress={() => setCount(p => p + 1)}>
        <Text>{count}</Text>
      </Pressable>
    </View>
  );
}

export default Booking;
