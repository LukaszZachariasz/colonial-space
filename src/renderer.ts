import 'babylonjs-loaders';
import {gamePlatform} from './core/game-platform';
import engine from 'engine';

gamePlatform().startEngine(engine, document.getElementById('render-canvas') as HTMLCanvasElement);
