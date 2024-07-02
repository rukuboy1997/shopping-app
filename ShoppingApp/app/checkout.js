import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckoutScreen() {
  const router = useRouter();
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const loadCheckoutItems = async () => {
      const storedItems = await AsyncStorage.getItem('checkoutItems');
      if (storedItems) {
        setCheckoutItems(JSON.parse(storedItems));
      }
    };
    loadCheckoutItems();
  }, []);

  const removeFromCheckout = async (item) => {
    const updatedItems = checkoutItems.filter(i => i.id !== item.id);
    setCheckoutItems(updatedItems);
    await AsyncStorage.setItem('checkoutItems', JSON.stringify(updatedItems));
  };

  const handlePlaceOrder = async () => {
    await AsyncStorage.removeItem('checkoutItems');
    router.push('/order-success');
  };

  const CheckoutList = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Button title="Remove" onPress={() => removeFromCheckout(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={checkoutItems}
        renderItem={({ item }) => <CheckoutList item={item} />}
        keyExtractor={item => item.id}
      />
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#D3D3D3',
  },
});
