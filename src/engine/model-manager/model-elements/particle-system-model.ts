import * as BABYLON from 'babylonjs';
import {Model} from './model';

export abstract class ParticleSystemModel extends Model<BABYLON.Mesh> {
    public emitter: BABYLON.Mesh;
    public particleSystem: BABYLON.ParticleSystem;

    public abstract onCreate(): void;
}