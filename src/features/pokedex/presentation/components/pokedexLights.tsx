import React from "react";
import { StyleSheet, View } from "react-native";
import { THEME } from "../../../../core/theme/mainTheme";

const COLORS = [THEME.darkRed, THEME.yellow, THEME.green];

// Luces indicadoras roja, amarilla y verde de la Pokédex
export function PokedexLights({ size = 10 }: { size?: number }) {
    return (
        <View style={[styles.row, { gap: size / 2 }]}>
            {COLORS.map(color => (
                <View
                    key={color}
                    style={[styles.light, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    light: {
        borderWidth: 1.5,
        borderColor: THEME.dark,
    },
});
