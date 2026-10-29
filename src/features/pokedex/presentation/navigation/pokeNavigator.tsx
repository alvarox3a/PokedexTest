import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokemonScreen } from '../screens/pokeListScreen';
import PokeDetail from '../screens/pokeDetail';
import FavoritesScreen from '../screens/favoritesScreen';
import { FavoritesButton, PokedexLens } from '../components/favoritesButton';
import { THEME } from '../../../../core/theme/mainTheme';

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerStyle: { backgroundColor: THEME.red },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible: false,
    },
    screens: {
        Home: {
            screen: PokemonScreen,
            options: {
                title: 'PokeDex',
                headerTitleAlign: 'center',
                headerLeft: () => <PokedexLens />,
                headerRight: () => <FavoritesButton />,
            }
        },
        PokemonDetail: {
            screen: PokeDetail,
            options: { title: 'Pokemon', headerBackTitle: "Atras", headerTitleAlign: 'center' },
        },
        Favorites: {
            screen: FavoritesScreen,
            options: { title: 'Favoritos', headerBackTitle: "Atras", headerTitleAlign: 'center' },
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