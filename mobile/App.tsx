import { StatusBar } from 'expo-status-bar';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./screens/LoginScreen";
import ListScreen from "./screens/ListScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
        <StatusBar />

        <TailwindProvider utilities={utilities}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Entrar" component={LoginScreen} />
                    <Stack.Screen name="Lista de Filiais" component={ListScreen} />
                    <Stack.Screen name="Detalhes da Filial" component={DetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </TailwindProvider>
    </>
  );
}
