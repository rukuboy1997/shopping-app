import { Tabs } from 'expo-router';

export default function Layout() {
    return (
	    <Tabs>
	    <Tabs.Screen name="index" options={{ title: 'Products' }} />
	    <Tabs.Screen name="checkout" options={{ title: 'Checkout' }} />
	    <Tabs.Screen name="order-success" options={{ href: null }} />
	    </Tabs>
    );
}
