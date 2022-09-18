import {ModuleSceneOption} from '@colonial-space/core/module/module-scene-option';
import {Type} from '@colonial-space/core/type';

export interface ModuleOption {
    imports?: Type<unknown>[];
    providers?: Type<unknown>[];
    scenes?: ModuleSceneOption[];
}
