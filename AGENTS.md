# Repository Guidelines

## Project Structure & Module Organization

This is a React Native Pokédex app using TypeScript, PokeAPI, and MMKV storage.

- `src/features/pokedex/` contains `data/` (datasources, DTOs, mappers), `domain/` (entities, repositories, use cases), and `presentation/` (screens, hooks, components, navigation).
- `src/core/` holds shared components, theme, and constants; `src/storage/mmkv.ts` configures storage.
- `App.tsx` is the root component; `index.js` registers the app.
- `__tests__/` contains application and layer tests; `__tests__/setup.js` supplies shared mocks.
- `android/` and `ios/` contain native projects and platform assets. Pokémon images come from remote URLs.

Keep API and persistence logic in datasources, conversions in mappers, and UI behavior in presentation hooks and components.

## Build, Test, and Development Commands

Use Node.js >= 22.11.0.

- `npm install`: install dependencies.
- `npm start`: start Metro; leave it running in a separate terminal.
- `npm run android` / `npm run ios`: build and launch on a device or emulator/simulator.
- Before iOS builds, run `bundle install` at the root, then `bundle exec pod install` inside `ios/`.
- `npm run androidr` / `npm run iosr`: build and launch release configurations.
- `npm run lint`: run ESLint.
- `npm test -- --runInBand`: run Jest sequentially.
- `npx jest __tests__/domain/pokeRepository.test.ts`: run one test file.

## Coding Style & Naming Conventions

Use TypeScript for application code. Follow Prettier defaults for two-space indentation, with single quotes, trailing commas, and unparenthesized single arrow parameters as configured in `.prettierrc.js`. ESLint extends `@react-native`; avoid unrelated formatting changes in files with older styles.

Use PascalCase for components and classes, camelCase for functions, and `use` prefixes for hooks. Follow existing filenames such as `favoritesScreen.tsx` and `getPokemonUseCase.ts`. Keep user-facing text and test descriptions in Spanish.

## Testing Guidelines

Jest uses `@react-native/jest-preset`; component tests use React Test Renderer. Name tests `*.test.ts` or `*.test.tsx` under `__tests__/`, following existing layer directories. Mock network and native dependencies through the shared setup or focused mocks. Cover changed behavior, validation, and failure cases. No coverage threshold is configured.

## Commit & Pull Request Guidelines

History uses short, plain descriptions such as `favorites` and `test cases`; no formal commit prefix convention is established. Write concise, action-oriented subjects. Pull requests should explain the change, link relevant issues, list validation performed, and include screenshots or recordings for UI changes.
