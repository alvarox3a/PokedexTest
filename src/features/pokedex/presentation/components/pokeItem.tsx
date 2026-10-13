import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Poke } from "../../domain/entities/poke";
import { POKEMON_LAYOUT } from "../constants/pokeLayout";
import { CustomImage } from "../../../../core/components/customImage";

interface PokemonItemProps {
    pokemon: Poke;
    onPress?: () => void;
}

function PokemonItem({ pokemon, onPress }: PokemonItemProps) {

    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
        >
            <CustomImage
                uri={pokemon.sprite}
                style={styles.image}
            />
            <Text style={styles.text} numberOfLines={1}>{pokemon.name.toUpperCase()}</Text>
        </Pressable>
    );
}

export const PokemonItemMemo = React.memo(PokemonItem);

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: POKEMON_LAYOUT.CARD_WIDTH,
        height: POKEMON_LAYOUT.CARD_HEIGHT
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
});