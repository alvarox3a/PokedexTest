import { View, StyleSheet, Text, FlatList } from "react-native";
import { POKEMON_LAYOUT } from "../constants/pokeLayout";
import { LAYOUT } from "../constants/layout";
import { PokemonItemMemo } from "../components/pokeItem";
import { Poke } from "../../domain/entities/poke";
import { useCallback, useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites";



export default function FavoritesScreen() {

    const { favorites, fetchFavorites } = useFavorites();

    const keyExtractor = useCallback((item: Poke) => item.id?.toString(), []);

    const renderItem = useCallback(({ item }: { item: Poke }) => {
        console.log('item renderItem', item);
        return <PokemonItemMemo
            pokemon={item}
            onPress={() => { }}
        />
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, []);



    return <View style={styles.container}>
        <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
            numColumns={POKEMON_LAYOUT.NUM_COLUMNS}
            columnWrapperStyle={styles.columnWrapper}
            getItemLayout={(_data, index) => ({
                length: POKEMON_LAYOUT.CARD_HEIGHT + LAYOUT.MARGIN,
                offset: index * (POKEMON_LAYOUT.CARD_HEIGHT + LAYOUT.MARGIN),
                index
            })}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={50}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    columnWrapper: {
        gap: LAYOUT.MARGIN
    },
})