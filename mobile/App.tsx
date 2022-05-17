import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./screens/LoginScreen";
import ListScreen from "./screens/ListScreen";
import DetailsScreen from "./screens/DetailsScreen";
import {screens} from "./routing";
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import LoadingScreen from "./screens/LoadingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <TailwindProvider utilities={utilities}>
            <StatusBar backgroundColor="#fff" />

            <NavigationContainer>
                <Stack.Navigator initialRouteName={screens.loading.name}>
                    <Stack.Screen
                        name={screens.loading.name}
                        options={screens.loading.options}
                        component={LoadingScreen}
                    />

                    <Stack.Screen
                        name={screens.login.name}
                        options={screens.login.options}
                        component={LoginScreen}
                    />

                    <Stack.Screen
                        name={screens.list.name}
                        options={screens.list.options}
                        component={ListScreen}
                    />

                    <Stack.Screen
                        name={screens.details.name}
                        options={screens.details.options}
                        component={DetailsScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </TailwindProvider>
    );
}