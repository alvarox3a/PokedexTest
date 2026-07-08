import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Poke } from "../../domain/entities/poke";
import type { StaticScreenProps } from "@react-navigation/native";
import { THEME } from "../../../../core/theme/mainTheme";
import { LAYOUT } from "../constants/layout";
import { CustomImage } from "../../../../core/components/customImage";

type Props = StaticScreenProps<{
    pokemon: Poke;
}>;

export default function PokeDetail({ route }: Props) {
    const { pokemon } = route.params;
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
})