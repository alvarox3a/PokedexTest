# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React Native 0.88 (React 19, TypeScript, New Architecture) Pokédex app backed by [PokeAPI](https://pokeapi.co/api/v2). Node >= 22.11. User-facing strings, error messages, and test descriptions are written in Spanish — keep that convention.

## Commands

```bash
npm install
npm start                      # Metro bundler (keep running in a separate terminal)
npm run ios                    # requires: bundle install && bundle exec pod install (in ios/)
npm run android
npm run iosr / npm run androidr  # Release builds
npm run lint                   # ESLint (@react-native config), Prettier 2.8.8
npm test                       # Jest (@react-native/jest-preset)
npx jest __tests__/domain/pokeRepository.test.ts   # single test file
npx jest -t "nombre del test"                     # single test by name
```

## Architecture

Clean Architecture, organized by feature under `src/features/<feature>/` (currently only `pokedex`). Dependency flow:

```
presentation (screens, hooks) → domain (use-cases → repository interfaces) → data (datasources, DTOs, mappers)
```

- **data/datasources**: `PokeDataSource` calls PokeAPI via `fetch`; `FavoritesDataSource` reads/writes favorites in MMKV. Note `getPokemons` fetches the list endpoint, then fetches every Pokémon's detail in parallel, and caches the full page in MMKV under `POKES-{limit}-{offset}` (cache-first, no expiry).
- **data/mappers**: `PokeMapper.toDomain` converts `PokeDto` → `Poke` entity (capitalizes name, converts height dm→m and weight hg→kg).
- **domain**: entities, `I*Repository` interfaces, `*RepositoryImp.ts` implementations (implementations live in `domain/repositories`, not `data`), and single-method use-case classes with `execute()` that validate input. Repositories wrap errors into Spanish user-facing messages.
- **presentation/hooks** (`usePoke`, `useFavorites`): manual DI — datasource → repository → use-cases are instantiated as module-level singletons at the top of each hook file. There is no DI container or global state library; screens consume these hooks.
- **Navigation**: React Navigation 7 *static* API (`createStaticNavigation`) in `presentation/navigation/pokeNavigator.tsx`; `RootStackParamList` is registered globally via `declare global namespace ReactNavigation`. Screens: `Home`, `PokemonDetail`, `Favorites`.
- **Shared code**: `src/core/` (theme, constants such as `STORAGE_KEYS`, `customImage` wrapping `@d11/react-native-fast-image`), `src/storage/mmkv.ts` (single MMKV instance, id `poke-storage`).

## Testing

Tests live in `__tests__/` mirroring the layers (`data/`, `domain/`, `features/...`). `__tests__/setup.js` globally mocks `fetch`, `react-native-mmkv` (`createMMKV` returns a shared mock storage), safe-area-context, fast-image, and React Navigation — new native modules usually need a mock added there and, if ESM, an entry in `transformIgnorePatterns` in `jest.config.js`. Repository tests mock the datasource class with `jest.mock(...)`.
