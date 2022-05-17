import {View, Text, TextInput, Button} from "react-native";
import {FC, useEffect, useState} from "react";
import {useTailwind} from "tailwind-rn";
import {SafeAreaView} from "react-native-safe-area-context";
import {Branch} from "../services/http/types";
import {httpIndexBranches} from "../services/http";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {screens} from "../routing";
import { RootStackParamList } from "../App";

const ListScreen: FC = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [search, setSearch] = useState("");

    const tw = useTailwind();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    function filterItems() {
        return branches.filter((item) => {
            const treateditemVal = item.name.toString().toLowerCase().trim();
            const treatedSearchVal = search.toString().toLowerCase().trim();

            return treateditemVal.includes(treatedSearchVal);
        });
    }

    function show(id: number) {
        navigation.navigate({
            name: screens.details.name,
            params: {
                id,
            },
        })
    }

    useEffect(() => {
        httpIndexBranches(navigation.navigate).then(setBranches);
    }, []);

    return (
        <SafeAreaView style={tw('h-full flex flex-col px-5')}>
            <View style={tw('')}>
                <TextInput
                    style={tw('h-12 px-2 border border-gray-300 rounded-lg')}
                    placeholder="Filtrar filiais por nome"
                    onChangeText={setSearch}
                    value={search}
                />
            </View>

            {filterItems().map((branch) => (
                <View style={tw('mt-5')} key={branch.id}>
                    <View style={tw('border-b border-gray-500 py-2 flex-row px-3 justify-between items-center')}>
                        <Text style={tw('')}>{branch.name}</Text>
                        <View style={tw('flex-row')}>
                            <Button title="Detalhes" onPress={() => show(branch.id)} />
                        </View>
                    </View>
                </View>
            ))}
        </SafeAreaView>
    );
}

export default ListScreen;