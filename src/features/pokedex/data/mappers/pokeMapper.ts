import { PokeDto } from "../dtos/pokeDto";
import { Poke } from "../../domain/entities/poke";

export class PokeMapper {
    static toDomain(dto: PokeDto): Poke {
        return {
            id: dto.id,
            name: dto.name.charAt(0).toUpperCase() + dto.name.slice(1), // Capitaliza el nombre
            sprite: dto.sprites.front_default || '',
            imageUrl: dto.sprites.other?.['official-artwork']?.front_default || '',
            height: dto.height / 10, // Convierte decímetros a metros
            weight: dto.weight / 10, // Convierte hectogramos a kilogramos
            types: dto.types.map(t => t.type.name),
        };
    }
}