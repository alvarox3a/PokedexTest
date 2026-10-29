import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Poke } from "../../domain/entities/poke";
import { POKEMON_LAYOUT } from "../constants/pokeLayout";
import { CustomImage } from "../../../../core/components/customImage";
import { THEME } from "../../../../core/theme/mainTheme";
import { formatPokeNumber } from "../constants/pokeStats";
import { PokedexLights } from "./pokedexLights";
import { TypeChips } from "./typeChips";

interface PokemonItemProps {
    pokemon: Poke;
    onPress?: () => void;
}

// Mini Pokédex: bisel gris con pantalla, número, nombre y tipos
function PokemonItem({ pokemon, onPress }: PokemonItemProps) {

    return (
        <Pressable
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View style={styles.header}>
                <PokedexLights size={7} />
                <Text style={styles.number}>{formatPokeNumber(pokemon.id)}</Text>
            </View>
            <View style={styles.screen}>
                <CustomImage
                    uri={pokemon.sprite}
                    style={styles.image}
                />
            </View>
            <Text style={styles.text} numberOfLines={1}>{pokemon.name.toUpperCase()}</Text>
            <TypeChips types={pokemon.types} />
        </Pressable>
    );
}

export const PokemonItemMemo = React.memo(PokemonItem);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: THEME.bezel,
        borderRadius: 8,
        borderBottomLeftRadius: 24,
        borderWidth: 3,
        borderColor: THEME.dark,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 4,
        width: POKEMON_LAYOUT.CARD_WIDTH,
        height: POKEMON_LAYOUT.CARD_HEIGHT
    },
    pressed: {
        transform: [{ scale: 0.96 }],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    number: {
        color: THEME.dark,
        fontWeight: 'bold',
        fontSize: 13,
        fontVariant: ['tabular-nums'],
    },
    screen: {
        backgroundColor: THEME.screen,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: THEME.dark,
        alignItems: 'center',
        paddingVertical: 4,
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: THEME.dark,
        letterSpacing: 1,
    },
});
