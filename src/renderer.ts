import 'babylonjs-loaders';
import {gamePlatform} from './core/game-platform';
import {initialization} from './scenarios/01-initialization/initialization';
import engine from 'engine';
import gameLoader from './game-core/game-loader/game-loader';

gamePlatform().startEngine(engine, document.getElementById('render-canvas') as HTMLCanvasElement);
gameLoader.load(initialization);
