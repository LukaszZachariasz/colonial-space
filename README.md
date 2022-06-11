# Colonial Space

3d economic strategy game based in cosmos. Game is supported by webgl rendering from BABYLONJS library.

## Development

1. npm install
2. npm run prepare
3. npm run start

## Project structure

| Name      | Description                                                                                                                                                               |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| core      | This module provides gamePlatform instance. Using it allows to create game instance. <br/>In core module we should place other unrelated directly with game engine stuff. |
| engine    | Stuff related with engine behaviour, scene management, gui management, save or load game, start scenario and so on is placed in src/engine.                               |
| game      | Here should be places whole game scenes, gui, models and login                                                                                                            |
| loading   | Loading scene                                                                                                                                                             |
| main-menu | Main menu scene                                                                                                                                                           |

## Thanks to

Insane skybox generator
https://tools.wwwtyro.net/space-3d/index.html

Game icons 
https://game-icons.net/

Planet name generator
https://nerdburglars.net/namegenerator/planet-name-generator/

Sun name generator
https://nerdburglars.net/namegenerator/sun-name-generator/
