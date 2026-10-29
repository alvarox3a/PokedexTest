import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { THEME } from "../../../../core/theme/mainTheme";
import { useFavorites } from "../hooks/useFavorites";
import { PokedexLights } from "./pokedexLights";

// Lente azul y luces indicadoras de la Pokédex, para el lado izquierdo del header
export function PokedexLens() {
    return (
        <View style={styles.lensContainer}>
            <View style={styles.lensRing}>
                <View style={styles.lens}>
                    <View style={styles.lensShine} />
                </View>
            </View>
            <View style={styles.lights}>
                <PokedexLights size={9} />
            </View>
        </View>
    );
}

// Acceso a favoritos con contador, para el lado derecho del header
export function FavoritesButton() {
    const { favorites, fetchFavorites } = useFavorites();
    const navigation = useNavigation();

    // Actualiza el contador al volver del detalle o de favoritos
    useFocusEffect(useCallback(() => {
        fetchFavorites();
    }, [fetchFavorites]));

    return (
        <Pressable
            onPress={() => navigation.navigate('Favorites')}
            accessibilityRole="button"
            accessibilityLabel={`Ver favoritos, ${favorites.length} guardados`}
            hitSlop={8}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
            <Text style={styles.star}>★</Text>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{favorites.length}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    lensContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    lensRing: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: THEME.dark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lens: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: THEME.blue,
        borderWidth: 2,
        borderColor: '#2d6fa8',
    },
    lensShine: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.8)',
        marginTop: 3,
        marginLeft: 3,
    },
    lights: {
        marginLeft: 6,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: THEME.dark,
        paddingVertical: 4,
        paddingLeft: 10,
        paddingRight: 4,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#111',
    },
    buttonPressed: {
        transform: [{ scale: 0.94 }],
    },
    star: {
        color: THEME.yellow,
        fontSize: 16,
    },
    badge: {
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        paddingHorizontal: 6,
        backgroundColor: THEME.yellow,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: THEME.dark,
        fontWeight: 'bold',
        fontSize: 12,
    },
});
