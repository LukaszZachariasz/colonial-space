import 'babylonjs-loaders';
import {initialization} from './scenarios/01-initialization/initialization';
import engine from 'engine';
import gameLoader from './game-core/game-loader/game-loader';

require('./watcher');

engine.initialize(document.getElementById('render-canvas') as HTMLCanvasElement);
gameLoader.load(initialization);