import {View, Text} from "react-native";
import {FC, useEffect} from "react";
import * as SecureStore from "expo-secure-store";
import {axiosInstance} from "../services/http/instance";
import {useNavigation} from "@react-navigation/native";
import {screens} from "../routing";
import {httpGetUserData} from "../services/http";

const LoadingScreen: FC = () => {
    const navigation = useNavigation();

    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            if (token) {
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                httpGetUserData().then(() => {
                    // @ts-ignore
                    navidation.navigate({ name: screens.list.name });
                }).catch(() => {
                    // @ts-ignore
                    navigation.navigate({ name: screens.login.name });
                });
            } else {
                // @ts-ignore
                navigation.navigate({ name: screens.login.name });
            }
        });
    }, []);

    return (
        <View>
            <Text>Carregando</Text>
        </View>
    );
}

export default LoadingScreen;
