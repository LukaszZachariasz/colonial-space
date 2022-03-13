# Colonial Space

3d economic strategy game based in cosmos. Game is supported by webgl rendering from BABYLONJS library.

## Development

1. npm install
2. npm run prepare
3. npm run start

## Project structure

| Name         | Description                                                                                                                                                              |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| core         | This module provides gamePlatform instance. Using it allows to create game instance. <br/>In core module we should place other unrelated directly with game engine stuff. |
| engine       | Stuff related with engine behaviour, scene management, gui management, save or load game, start scenario and so on is placed in src/engine.                              |
| game-core    | Here should be places whole game logic                                                                                                                                   |
| game-objects | All shareable 3d object should be defined in this folder                                                                                                                 |
| gui-objects  | All shareable gui objects should be defined in this folder                                                                                                               |
| scenarios    | List of predefined scenarios.                                                                                                                                            |
| scenes       | All game scenes                                                                                                                                                          |
