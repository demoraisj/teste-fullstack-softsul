import {View, Text, Alert, BackHandler} from "react-native";
import {FC, useEffect} from "react";
import * as SecureStore from "expo-secure-store";
import {axiosInstance} from "../services/http/instance";
import {NavigationProp, useNavigation, useNavigationState} from "@react-navigation/native";
import {screens} from "../routing";
import {httpGetUserData} from "../services/http";
import {RootStackParamList} from "../App";

const LoadingScreen: FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const navState = useNavigationState((state) => state);
    const nextRoute = (navState.routeNames[navState.index]);

    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            if (token) {
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                httpGetUserData().then(() => {
                    navigation.navigate({
                        name: screens.list.name,
                        params: {
                            id: undefined
                        }
                    });
                }).catch(() => {
                    navigation.navigate({
                        name: screens.login.name,
                        params: {
                            id: undefined
                        }
                    });
                });
            } else {
                navigation.navigate({
                    name: screens.login.name,
                    params: {
                        id: undefined
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        function backHandler() {
            const exitIfBack = [screens.login.name, screens.loading.name];

            if (exitIfBack.includes(nextRoute)) {
                Alert.alert('Sair', 'Deseja sair do aplicativo?', [
                    {
                        text: 'Não',
                        style: 'cancel',
                    },
                    {
                        text: 'Sim',
                        onPress: () => {
                            BackHandler.exitApp();
                        },
                    },
                ]);

                return true;
            }

            return false;
        }

        BackHandler.addEventListener('hardwareBackPress', backHandler);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backHandler);
        }
    }, [nextRoute]);

    return (
        <View>
            <Text>Carregando</Text>
        </View>
    );
}

export default LoadingScreen;
