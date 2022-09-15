import 'babylonjs-loaders';
import 'reflect-metadata';
import {ColonialSpaceModule} from './colonial-space/colonial-space.module';
import {Platform} from '@colonial-space/core/platform';

new Platform().bootstrap(ColonialSpaceModule, 'game-root-scene-ready');
