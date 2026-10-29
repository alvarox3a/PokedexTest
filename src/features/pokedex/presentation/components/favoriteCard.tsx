import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Poke } from "../../domain/entities/poke";
import { THEME } from "../../../../core/theme/mainTheme";
import { CustomImage } from "../../../../core/components/customImage";
import { formatPokeNumber } from "../constants/pokeStats";
import { PokedexLights } from "./pokedexLights";
import { TypeChips } from "./typeChips";
import { StatBars } from "./statBars";

interface FavoriteCardProps {
    pokemon: Poke;
    onPress: () => void;
    onRemove: () => void;
}

// Entrada de la Pokédex: bisel gris con pantalla, datos básicos y estadísticas base
function FavoriteCard({ pokemon, onPress, onRemove }: FavoriteCardProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
            <View style={styles.header}>
                <PokedexLights size={8} />
                <Text style={styles.number}>{formatPokeNumber(pokemon.id)}</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.screen}>
                    <CustomImage uri={pokemon.imageUrl || pokemon.sprite} style={styles.image} />
                </View>

                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1}>{pokemon.name.toUpperCase()}</Text>
                    <TypeChips types={pokemon.types} />
                    <Text style={styles.detail}>{pokemon.height} m · {pokemon.weight} kg</Text>
                    {pokemon.abilities.length > 0 && (
                        <Text style={styles.detail} numberOfLines={2}>
                            {pokemon.abilities.join(', ')}
                        </Text>
                    )}
                </View>
            </View>

            {pokemon.stats.length > 0 && (
                <View style={styles.stats}>
                    <StatBars stats={pokemon.stats} />
                </View>
            )}

            <View style={styles.footer}>
                <View style={styles.redDot} />
                <Pressable
                    onPress={onRemove}
                    accessibilityRole="button"
                    accessibilityLabel={`Quitar a ${pokemon.name} de favoritos`}
                    hitSlop={8}
                    style={({ pressed }) => [styles.removeButton, pressed && styles.removePressed]}
                >
                    <Text style={styles.removeStar}>★</Text>
                    <Text style={styles.removeText}>QUITAR</Text>
                </Pressable>
            </View>
        </Pressable>
    );
}

export const FavoriteCardMemo = React.memo(FavoriteCard);

const styles = StyleSheet.create({
    card: {
        backgroundColor: THEME.bezel,
        borderRadius: 8,
        borderBottomLeftRadius: 32,
        borderWidth: 3,
        borderColor: THEME.dark,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cardPressed: {
        transform: [{ scale: 0.98 }],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    number: {
        color: THEME.dark,
        fontWeight: 'bold',
        fontSize: 16,
        fontVariant: ['tabular-nums'],
    },
    body: {
        flexDirection: 'row',
        gap: 12,
    },
    screen: {
        backgroundColor: THEME.screen,
        borderRadius: 6,
        borderWidth: 3,
        borderColor: THEME.dark,
        padding: 4,
    },
    image: {
        width: 96,
        height: 96,
    },
    info: {
        flex: 1,
        gap: 4,
    },
    name: {
        color: THEME.dark,
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
    },
    detail: {
        color: '#555',
        fontSize: 12,
        textTransform: 'capitalize',
    },
    stats: {
        marginTop: 12,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingLeft: 8,
    },
    redDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: THEME.darkRed,
        borderWidth: 2,
        borderColor: THEME.dark,
    },
    removeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: THEME.yellow,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: THEME.dark,
    },
    removePressed: {
        transform: [{ scale: 0.95 }],
    },
    removeStar: {
        color: THEME.dark,
        fontSize: 14,
    },
    removeText: {
        color: THEME.dark,
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 1,
    },
});
