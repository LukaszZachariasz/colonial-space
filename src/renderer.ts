import 'babylonjs-loaders';
import {Engine} from 'engine';
import {gamePlatform} from './core/game-platform';

gamePlatform().startEngine(new Engine(), document.getElementById('render-canvas') as HTMLCanvasElement);
