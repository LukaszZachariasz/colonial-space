import * as BABYLON from 'babylonjs';

export abstract class ModelParticleSystem {
    public emitter: BABYLON.Mesh;
    public particleSystem: BABYLON.ParticleSystem;
}
