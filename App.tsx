import { StatusBar } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import PokeNavigator from './src/features/pokedex/presentation/navigation/pokeNavigator';

function App() {

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <PokeNavigator />
    </SafeAreaProvider>
  );
}

export default App;