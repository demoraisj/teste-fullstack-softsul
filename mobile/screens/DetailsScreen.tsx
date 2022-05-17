import {View, Text, Button, Platform, Linking} from "react-native";
import {FC, useEffect, useState} from "react";
import {Branch} from "../services/http/types";
import {httpShowBranch} from "../services/http";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useTailwind} from "tailwind-rn";
import {cnpj} from "../tools/masks";

type Props = {
    route: {
        params: {
            id: number
        }
    }
}

const DetailsScreen: FC<Props> = (props) => {
    const [branch, setBranch] = useState<Branch | null>(null);

    const navigation = useNavigation();
    const tw = useTailwind();

    async function openMap() {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${branch!.lat},${branch!.lng}`;
        const label = branch!.name;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        if (url) {
            await Linking.openURL(url);
        }
    }

    useEffect(() => {
        httpShowBranch(props.route.params.id, navigation.navigate).then(setBranch);
    }, []);

    return (
        <SafeAreaView style={tw('h-full flex flex-col')}>
            {branch ? (
                <>
                    <View style={tw('mx-5 mt-3 p-2 flex border-b border-gray-400')}>
                        <Text style={tw('text-lg')}>Nome: {branch.name}</Text>
                    </View>

                    <View style={tw('mx-5 p-2 border-b border-gray-400')}>
                        <Text style={tw('text-lg')}>CNPJ: {cnpj.mask(branch.cnpj)}</Text>
                    </View>

                    <View style={tw('mx-5 p-2 border-b border-gray-400')}>
                        <Text style={tw('text-lg')}>Cidade: {cnpj.mask(branch.city)}</Text>
                    </View>

                    <View style={tw('mx-5 p-2 border-b border-gray-400')}>
                        <Text style={tw('text-lg')}>Email: {cnpj.mask(branch.email)}</Text>
                    </View>

                    <View style={tw('mx-5 p-2 border-b border-gray-400')}>
                        <Text style={tw('text-lg')}>Endereço: {cnpj.mask(branch.address)}</Text>
                    </View>

                    <View style={tw('mx-5 p-2 border-b border-gray-400')}>
                        <Text style={tw('text-lg')}>Latitude: {branch.lat}</Text>
                    </View>

                    <View style={tw('mx-5 p-2 border-b border-gray-400')}>
                        <Text style={tw('text-lg')}>Longitude: {branch.lng}</Text>
                    </View>

                    <View style={tw('mt-10 mx-5')}>
                        <Button title="Abrir no mapa" onPress={openMap} />
                    </View>
                </>
            ) : (
                <View style={tw('flex items-center justify-center h-full')}>
                    <Text>Carregando...</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

export default DetailsScreen;