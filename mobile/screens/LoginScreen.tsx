import {View, Text} from "react-native";
import { FC } from "react";
import {useTailwind} from 'tailwind-rn';
import {SafeAreaView} from "react-native-safe-area-context";

const LoginScreen: FC = () => {
    const tw = useTailwind();

    return (
        <SafeAreaView style={tw('h-full')}>
            <View style={tw('pt-12 items-center')}>
                <View style={tw('bg-blue-200 px-3 py-1 rounded-full')}>
                    <Text style={tw('text-blue-800 font-semibold')}>
                        Hello Tailwind
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;