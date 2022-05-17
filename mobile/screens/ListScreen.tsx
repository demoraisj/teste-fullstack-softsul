import {View, Text, TextInput} from "react-native";
import { FC } from "react";
import {useTailwind} from "tailwind-rn";
import {SafeAreaView} from "react-native-safe-area-context";

const ListScreen: FC = () => {
    const tw = useTailwind();

    return (
        <SafeAreaView style={tw('h-full flex flex-col px-5')}>
            <View style={tw('')}>
                <TextInput
                    style={tw('h-12 px-2 border border-gray-300 rounded-lg')}
                    placeholder="Filtrar filiais por nome"
                />
            </View>

            <View style={tw('mt-5')}>
                <View style={tw('border-b border-gray-500 py-2 px-3 flex justify-between')}>
                    <Text>Nome</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ListScreen;