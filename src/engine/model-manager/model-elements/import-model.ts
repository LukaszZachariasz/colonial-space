import * as BABYLON from 'babylonjs';
import {Model} from './model';

export abstract class ImportModel extends Model<BABYLON.AbstractMesh> {
    public meshes: BABYLON.AbstractMesh[] = [];
    public particleSystems: BABYLON.IParticleSystem[] = [];
    public skeletons: BABYLON.Skeleton[] = [];
    public animationGroups: BABYLON.AnimationGroup[] = [];
    public transformNodes: BABYLON.TransformNode[] = [];
    public geometries: BABYLON.Geometry[] = [];
    public lights: BABYLON.Light[] = [];

    public abstract onImport(): Promise<BABYLON.ISceneLoaderAsyncResult>;

    public setImportResult(result: BABYLON.ISceneLoaderAsyncResult): void {
        this.meshes = result.meshes;
        this.particleSystems = result.particleSystems;
        this.skeletons = result.skeletons;
        this.animationGroups = result.animationGroups;
        this.transformNodes = result.transformNodes;
        this.geometries = result.geometries;
        this.lights = result.lights;

        this.mesh = result.meshes[0];
    }
}
