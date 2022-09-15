import 'babylonjs-loaders';
import 'reflect-metadata';
import {ColonialSpaceModule} from './colonial-space/colonial-space.module';
import {Platform} from '@colonial-space/core/platform';

Platform.bootstrap(ColonialSpaceModule, 'render-canvas');
