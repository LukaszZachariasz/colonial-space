import 'babylonjs-loaders'
import engine from 'engine';
import {InitializationScenario} from "./scenarios/01-initialization/initialization-scenario";
import gameState from "./engine/game-state/game-state";

require('./watcher')

engine.initialize(document.getElementById('render-canvas') as HTMLCanvasElement);
gameState.startScenario(new InitializationScenario());