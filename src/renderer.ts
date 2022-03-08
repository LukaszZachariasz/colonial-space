import 'babylonjs-loaders';
import {InitializationScenario} from './scenarios/01-initialization/initialization-scenario';
import engine from 'engine';
import gameState from './engine/game-stage/game-stage';

require('./watcher');

engine.initialize(document.getElementById('render-canvas') as HTMLCanvasElement);
gameState.startScenario(new InitializationScenario());