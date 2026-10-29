import { View, StyleSheet, Text, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LAYOUT } from "../constants/layout";
import { FavoriteCardMemo } from "../components/favoriteCard";
import { PokedexLights } from "../components/pokedexLights";
import { Poke } from "../../domain/entities/poke";
import { useCallback } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { THEME } from "../../../../core/theme/mainTheme";

const keyExtractor = (item: Poke) => item.id.toString();

export default function FavoritesScreen() {

    const { favorites, fetchFavorites, toggleFavorite } = useFavorites();
    const navigation = useNavigation();

    // Refresca al volver del detalle, donde se puede quitar un favorito
    useFocusEffect(useCallback(() => {
        fetchFavorites();
    }, [fetchFavorites]));

    const renderItem = useCallback(({ item }: { item: Poke }) => (
        <FavoriteCardMemo
            pokemon={item}
            onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
            onRemove={() => toggleFavorite(item)}
        />
    ), [navigation, toggleFavorite]);

    return <View style={styles.container}>
        <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={[styles.content, favorites.length === 0 && styles.emptyContent]}
            ListHeaderComponent={favorites.length > 0 ? <FavoritesSummary favorites={favorites} /> : undefined}
            ListEmptyComponent={<EmptyFavorites />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={5}
        />
    </View>
}

// Panel resumen: cantidad registrada y tipos distintos entre los favoritos
function FavoritesSummary({ favorites }: { favorites: Poke[] }) {
    const typeCount = new Set(favorites.flatMap(poke => poke.types)).size;

    return (
        <View style={styles.summary}>
            <PokedexLights size={8} />
            <View style={styles.summaryTiles}>
                <SummaryTile label="REGISTRADOS" value={favorites.length.toString().padStart(3, '0')} />
                <SummaryTile label="TIPOS" value={typeCount.toString().padStart(2, '0')} />
            </View>
        </View>
    );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.tile}>
            <Text style={styles.tileLabel}>{label}</Text>
            <Text style={styles.tileValue}>{value}</Text>
        </View>
    );
}

function EmptyFavorites() {
    return (
        <View style={styles.bezel}>
            <View style={styles.bezelTop}>
                <PokedexLights size={8} />
            </View>
            <View style={styles.screen}>
                <View style={styles.pokeball}>
                    <View style={styles.pokeballTop} />
                    <View style={styles.pokeballBand} />
                    <View style={styles.pokeballCenter} />
                </View>
                <Text style={styles.emptyTitle}>SIN REGISTROS</Text>
                <Text style={styles.emptyText}>
                    Abre un Pokémon y toca "Agregar a favoritos" para registrarlo aquí.
                </Text>
            </View>
            <View style={styles.bezelBottom}>
                <View style={styles.redDot} />
                <View style={styles.speaker}>
                    <View style={styles.speakerLine} />
                    <View style={styles.speakerLine} />
                    <View style={styles.speakerLine} />
                </View>
            </View>
        </View>
    );
}

const POKEBALL_SIZE = 96;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.red,
    },
    content: {
        padding: LAYOUT.MARGIN,
        gap: LAYOUT.MARGIN,
    },
    emptyContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    summary: {
        backgroundColor: THEME.dark,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#111',
        padding: 10,
        gap: 8,
    },
    summaryTiles: {
        flexDirection: 'row',
        gap: 8,
    },
    tile: {
        flex: 1,
        backgroundColor: '#1d1d1d',
        borderRadius: 6,
        paddingVertical: 8,
        alignItems: 'center',
        gap: 2,
    },
    tileLabel: {
        color: '#9fd3a6',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    tileValue: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontVariant: ['tabular-nums'],
    },
    bezel: {
        backgroundColor: THEME.bezel,
        borderRadius: 8,
        borderBottomLeftRadius: 40,
        borderWidth: 3,
        borderColor: THEME.dark,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    bezelTop: {
        alignItems: 'center',
        marginBottom: 8,
    },
    screen: {
        backgroundColor: THEME.screen,
        borderRadius: 6,
        borderWidth: 3,
        borderColor: THEME.dark,
        alignItems: 'center',
        padding: LAYOUT.MARGIN,
        gap: 8,
    },
    bezelBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 8,
    },
    redDot: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: THEME.darkRed,
        borderWidth: 2,
        borderColor: THEME.dark,
    },
    speaker: {
        gap: 3,
    },
    speakerLine: {
        width: 32,
        height: 3,
        borderRadius: 2,
        backgroundColor: THEME.dark,
    },
    pokeball: {
        width: POKEBALL_SIZE,
        height: POKEBALL_SIZE,
        borderRadius: POKEBALL_SIZE / 2,
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: '#111',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    pokeballTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: THEME.red,
    },
    pokeballBand: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: '#111',
    },
    pokeballCenter: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: '#111',
    },
    emptyTitle: {
        color: THEME.dark,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    emptyText: {
        color: '#555',
        fontSize: 14,
        textAlign: 'center',
    },
})
