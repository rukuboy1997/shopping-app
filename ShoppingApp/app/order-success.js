import { View, Text, StyleSheet } from 'react-native';

export default function OrderSuccessScreen() {
  return (
    <View style={styles.container}>
      <Text>Order Successful!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
