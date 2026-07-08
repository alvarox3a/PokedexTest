import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokemonScreen } from '../screens/pokeListScreen';
import PokeDetail from '../screens/pokeDetail';

const RootStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: PokemonScreen,
            options: { title: 'PokeDex', headerTitleAlign: 'center' }
        },
        PokemonDetail: {
            screen: PokeDetail,
            options: { title: 'Pokemon', headerBackTitle: "Atras", headerTitleAlign: 'center' },
        },
    },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

const Navigation = createStaticNavigation(RootStack);

export default function PokeNavigator() {
    return <Navigation />;
}