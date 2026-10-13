import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Poke } from "../../domain/entities/poke";
import type { StaticScreenProps } from "@react-navigation/native";
import { THEME } from "../../../../core/theme/mainTheme";
import { LAYOUT } from "../constants/layout";
import { CustomImage } from "../../../../core/components/customImage";
import { useFavorites } from "../hooks/useFavorites";

type Props = StaticScreenProps<{
    pokemon: Poke;
}>;

export default function PokeDetail({ route }: Props) {
    const { pokemon } = route.params;

    const { toggleFavorite, isFavorite } = useFavorites();

    const handleToggleFavorite = useCallback(() => {
        toggleFavorite(pokemon);
    }, [toggleFavorite, pokemon]);

    return (
        <View style={styles.container}>
            <View style={styles.pokeContainer}>
                <CustomImage
                    uri={pokemon.imageUrl}
                    style={styles.image}
                />
                <Text style={styles.name}>{pokemon.name}</Text>
                <Text style={styles.types}>ID: {pokemon.id}</Text>
                <Text style={styles.types}>Tipo: {pokemon.types.join(', ')}</Text>
                <Text style={styles.types}>Altura: {pokemon.height}m</Text>
                <Text style={styles.types}>Peso: {pokemon.weight}kg</Text>

                <Pressable
                    style={styles.favoriteButton}
                    onPress={handleToggleFavorite}
                >
                    <Text style={styles.favoriteText}>{isFavorite(pokemon) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.red,
        padding: LAYOUT.MARGIN,
    },
    pokeContainer: {
        backgroundColor: "#fff",
        padding: LAYOUT.MARGIN,
        borderRadius: LAYOUT.MARGIN,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 4,
    },
    image: {
        width: 150,
        height: 150,
    },
    types: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    favoriteButton: {
        backgroundColor: THEME.red,
        padding: LAYOUT.MARGIN,
        borderRadius: LAYOUT.MARGIN,
        marginTop: LAYOUT.MARGIN,
    },
    favoriteText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
})