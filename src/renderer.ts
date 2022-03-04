import 'babylonjs-loaders'
import engine from 'engine';
import gameSceneLoader from "./game-scenes/game-scene-loader";
import {PlanetScene} from "./game-scenes/planet-scene/planet-scene";

require('./watcher')

engine.initialize(document.getElementById('render-canvas') as HTMLCanvasElement);

gameSceneLoader.loadScene(new PlanetScene());



