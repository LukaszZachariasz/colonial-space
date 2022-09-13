import 'babylonjs-loaders';
import 'reflect-metadata';
import {Container} from 'typedi';
import {GamePlatform} from './game-platform/game-platform';

Container.get(GamePlatform).bootstrap(document.getElementById('render-canvas') as HTMLCanvasElement);
