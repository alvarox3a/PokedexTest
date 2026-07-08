import { Dimensions } from 'react-native';
import { LAYOUT } from './layout';

const { width } = Dimensions.get('window');
const COLUMNS = 2;

export const POKEMON_LAYOUT = {
    NUM_COLUMNS: COLUMNS,
    CARD_WIDTH: (width - (LAYOUT.MARGIN * (COLUMNS + 1))) / COLUMNS,
    CARD_HEIGHT: 150,
};