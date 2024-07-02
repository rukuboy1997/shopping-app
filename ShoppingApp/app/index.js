import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: 'Bicycle' },
  { id: '2', name: 'Motorbike' },
  { id: '3', name: 'Tricycle' },
  { id: '4', name: 'Car' },
  { id: '5', name: 'Jet' },
  // Add more products here
];

export default function ProductsScreen() {
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

  const addToCheckout = async (item) => {
    const updatedItems = [...checkoutItems, item];
    setCheckoutItems(updatedItems);
    await AsyncStorage.setItem('checkoutItems', JSON.stringify(updatedItems));
  };

  const ProductList = ({ product }) => (
    <View style={styles.item}>
      <Text>{product.name}</Text>
      <Button title="Add to Checkout" onPress={() => addToCheckout(product)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductList product={item} />}
        keyExtractor={item => item.id}
      />
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
    backgroundColor: '#F7C6D5',
  },
});
