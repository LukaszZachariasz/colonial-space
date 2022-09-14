import 'babylonjs-loaders';
import 'reflect-metadata';
import {GameModule} from './game/game.module';
import {Platform} from '@colonial-space/core/platform';

Platform.bootstrap(GameModule, 'render-canvas');
