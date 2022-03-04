import 'babylonjs-loaders'
import engine from 'engine';
import gameSceneLoader from "./game-scenes/game-scene-loader";
import {MainMenuScene} from './game-scenes/main-menu-scene/main-menu-scene';

require('./watcher')

engine.initialize(document.getElementById('render-canvas') as HTMLCanvasElement);

gameSceneLoader.activeGameScene = new MainMenuScene();
gameSceneLoader.activeGameScene.create();



