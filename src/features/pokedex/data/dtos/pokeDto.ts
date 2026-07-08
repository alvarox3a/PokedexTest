export interface PokeDto {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other?: {
            'official-artwork'?: {
                front_default: string;
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
}