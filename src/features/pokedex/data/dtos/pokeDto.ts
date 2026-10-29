export interface PokeDto {
    id: number;
    name: string;
    base_experience: number | null;
    height: number;
    weight: number;
    sprites: {
        front_default: string | null;
        other?: {
            'official-artwork'?: {
                front_default: string | null;
            };
        };
    };
    types: Array<{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }>;
    abilities?: Array<{
        is_hidden: boolean;
        slot: number;
        ability: {
            name: string;
            url: string;
        };
    }>;
    stats?: Array<{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }>;
}
