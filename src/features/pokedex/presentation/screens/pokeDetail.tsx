import React, { useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Poke } from "../../domain/entities/poke";
import type { StaticScreenProps } from "@react-navigation/native";
import { THEME } from "../../../../core/theme/mainTheme";
import { LAYOUT } from "../constants/layout";
import { CustomImage } from "../../../../core/components/customImage";
import { useFavorites } from "../hooks/useFavorites";
import { formatPokeNumber } from "../constants/pokeStats";
import { PokedexLights } from "../components/pokedexLights";
import { TypeChips } from "../components/typeChips";
import { StatBars } from "../components/statBars";

type Props = StaticScreenProps<{
    pokemon: Poke;
}>;

export default function PokeDetail({ route }: Props) {
    const { pokemon } = route.params;

    const { toggleFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(pokemon);

    const handleToggleFavorite = useCallback(() => {
        toggleFavorite(pokemon);
    }, [toggleFavorite, pokemon]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Pantalla principal de la Pokédex */}
            <View style={styles.bezel}>
                <View style={styles.bezelTop}>
                    <PokedexLights size={8} />
                </View>
                <View style={styles.screen}>
                    <Text style={styles.number}>{formatPokeNumber(pokemon.id)}</Text>
                    <CustomImage
                        uri={pokemon.imageUrl || pokemon.sprite}
                        style={styles.image}
                    />
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

            <View style={styles.titleRow}>
                <Text style={styles.name} numberOfLines={1}>{pokemon.name.toUpperCase()}</Text>
                <TypeChips types={pokemon.types} large />
            </View>

            <View style={styles.dataRow}>
                <DataTile label="ALTURA" value={`${pokemon.height} m`} />
                <DataTile label="PESO" value={`${pokemon.weight} kg`} />
                <DataTile label="EXP. BASE" value={pokemon.baseExperience > 0 ? `${pokemon.baseExperience}` : '—'} />
            </View>

            {pokemon.abilities.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>HABILIDADES</Text>
                    <View style={styles.abilities}>
                        {pokemon.abilities.map(ability => (
                            <View key={ability} style={styles.ability}>
                                <Text style={styles.abilityText}>{ability}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {pokemon.stats.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ESTADÍSTICAS BASE</Text>
                    <StatBars stats={pokemon.stats} showTotal />
                </View>
            )}

            <Pressable
                onPress={handleToggleFavorite}
                accessibilityRole="button"
                style={({ pressed }) => [
                    styles.favoriteButton,
                    favorite && styles.favoriteButtonActive,
                    pressed && styles.favoriteButtonPressed,
                ]}
            >
                <Text style={[styles.favoriteStar, favorite && styles.favoriteStarActive]}>
                    {favorite ? '★' : '☆'}
                </Text>
                <Text style={[styles.favoriteText, favorite && styles.favoriteTextActive]}>
                    {favorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
                </Text>
            </Pressable>
        </ScrollView>
    );
}

function DataTile({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.tile}>
            <Text style={styles.tileLabel}>{label}</Text>
            <Text style={styles.tileValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.red,
    },
    content: {
        padding: LAYOUT.MARGIN,
        gap: LAYOUT.MARGIN,
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
        paddingVertical: 12,
    },
    number: {
        alignSelf: 'flex-end',
        marginRight: 10,
        color: THEME.dark,
        fontWeight: 'bold',
        fontSize: 16,
        fontVariant: ['tabular-nums'],
    },
    image: {
        width: 200,
        height: 200,
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
    titleRow: {
        alignItems: 'center',
        gap: 8,
    },
    name: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 2,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 2,
    },
    dataRow: {
        flexDirection: 'row',
        gap: 8,
    },
    tile: {
        flex: 1,
        backgroundColor: THEME.dark,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#111',
        paddingVertical: 10,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    section: {
        gap: 6,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    abilities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    ability: {
        backgroundColor: THEME.screen,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: THEME.dark,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    abilityText: {
        color: THEME.dark,
        fontWeight: 'bold',
        fontSize: 13,
        textTransform: 'capitalize',
    },
    favoriteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: THEME.yellow,
        paddingVertical: 14,
        borderRadius: 28,
        borderWidth: 3,
        borderColor: THEME.dark,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 4,
    },
    favoriteButtonActive: {
        backgroundColor: THEME.dark,
    },
    favoriteButtonPressed: {
        transform: [{ translateY: 2 }],
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    favoriteStar: {
        color: THEME.dark,
        fontSize: 20,
    },
    favoriteStarActive: {
        color: THEME.yellow,
    },
    favoriteText: {
        color: THEME.dark,
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    favoriteTextActive: {
        color: '#fff',
    },
})
