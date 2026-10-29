import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PokeStat } from "../../domain/entities/poke";
import { THEME } from "../../../../core/theme/mainTheme";
import { MAX_STAT_VALUE, STAT_LABELS } from "../constants/pokeStats";

const statColor = (value: number) =>
    value >= 90 ? THEME.green : value >= 60 ? THEME.yellow : THEME.red;

// Panel oscuro con las estadísticas base en barras
export function StatBars({ stats, showTotal = false }: { stats: PokeStat[]; showTotal?: boolean }) {
    const total = stats.reduce((sum, stat) => sum + stat.value, 0);

    return (
        <View style={styles.panel}>
            {stats.map(stat => (
                <View key={stat.name} style={styles.row}>
                    <Text style={styles.label}>{STAT_LABELS[stat.name] ?? stat.name}</Text>
                    <Text style={styles.value}>{stat.value}</Text>
                    <View style={styles.track}>
                        <View
                            style={[
                                styles.fill,
                                {
                                    width: `${Math.min(stat.value / MAX_STAT_VALUE, 1) * 100}%`,
                                    backgroundColor: statColor(stat.value),
                                },
                            ]}
                        />
                    </View>
                </View>
            ))}
            {showTotal && (
                <View style={[styles.row, styles.totalRow]}>
                    <Text style={styles.label}>TOTAL</Text>
                    <Text style={styles.value}>{total}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    panel: {
        backgroundColor: THEME.dark,
        borderRadius: 8,
        padding: 10,
        gap: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    totalRow: {
        marginTop: 4,
        paddingTop: 6,
        borderTopWidth: 1,
        borderTopColor: '#444',
    },
    label: {
        width: 40,
        color: '#9fd3a6',
        fontSize: 11,
        fontWeight: 'bold',
    },
    value: {
        width: 28,
        color: '#fff',
        fontSize: 11,
        textAlign: 'right',
        fontVariant: ['tabular-nums'],
    },
    track: {
        flex: 1,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#444',
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 3,
    },
});
