import {View, Text, Image, TextInput, Pressable} from "react-native";
import {FC, useState} from "react";
import {useTailwind} from 'tailwind-rn';
import {SafeAreaView} from "react-native-safe-area-context";
import {screens} from "../routing";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {httpGetToken} from "../services/http";
import {RootStackParamList} from "../App";

const LoginScreen: FC = () => {
    const [inputStyle, setInputStyle] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    const tw = useTailwind();
    const navidation = useNavigation<NavigationProp<RootStackParamList>>();

    async function login() {
        if (!email || !password) {
            setError('Por favor preencha todos os campos.');
            return;
        }

        const ok = await httpGetToken({email, password});

        if (ok) {
            navidation.navigate({
                name: screens.list.name,
                params: {
                    id: undefined,
                }
            });
        } else {
            setError('Usuário ou senha inválidos.');
        }
    }

    return (
        <SafeAreaView style={tw('h-full bg-secondary flex flex-col justify-center items-center')}>
            <View style={tw('items-center')}>
                <Image source={require('../assets/logo-light2.png')} />
            </View>

            <View style={tw('items-center')}>
                <Text style={tw('text-center text-white text-2xl mt-3 font-bold')}>
                    Gerenciamento de Filiais
                </Text>
            </View>

            <View style={tw('bg-white p-5 mt-5 rounded-md w-80')}>
                <View style={tw('items-center')}>
                    <Text style={tw('text-2xl')}>Entrar</Text>
                </View>

                <View style={tw('items-center')}>
                    <TextInput
                        style={tw(`rounded-lg p-2 mt-5 text-white border w-full text-secondary ${inputStyle.email}`)}
                        onFocus={() => setInputStyle({...inputStyle, email: 'border-primary'})}
                        onBlur={() => setInputStyle({...inputStyle, email: 'border-secondary'})}
                        placeholderTextColor={inputStyle.email.includes('primary') ? '#95c431' : '#373435'}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Email"
                    />
                </View>

                <View style={tw('items-center')}>
                    <TextInput
                        style={tw(`rounded-lg p-2 mt-5 text-white border w-full text-secondary ${inputStyle.password}`)}
                        onFocus={() => setInputStyle({...inputStyle, password: 'border-primary'})}
                        onBlur={() => setInputStyle({...inputStyle, password: 'border-secondary'})}
                        placeholder="Senha"
                        passwordRules="minlength: 8"
                        placeholderTextColor={inputStyle.password.includes('primary') ? '#95c431' : '#373435'}
                        onChangeText={onChangePassword}
                        value={password}
                        secureTextEntry
                    />
                </View>

                <View style={tw('items-center mt-5')}>
                    <Pressable onPress={login} style={tw('w-full items-center py-2 px-4 border border-transparent rounded-md text-white bg-primary')}>
                        <Text style={tw('text-white font-bold')}>Entrar</Text>
                    </Pressable>
                </View>

                <View style={tw(`items-center mt-5 ${error ? '' : 'hidden'}`)} >
                    <Text style={tw('text-red-800')}>{error}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;