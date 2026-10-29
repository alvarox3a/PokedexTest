import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getPokeType } from "../constants/pokeTypes";

export function TypeChips({ types, large = false }: { types: string[]; large?: boolean }) {
    return (
        <View style={styles.row}>
            {types.map(type => {
                const { label, color } = getPokeType(type);
                return (
                    <View key={type} style={[styles.chip, large && styles.chipLarge, { backgroundColor: color }]}>
                        <Text style={[styles.text, large && styles.textLarge]}>{label}</Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    chip: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.25)',
    },
    chipLarge: {
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 14,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 11,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    textLarge: {
        fontSize: 14,
    },
});
