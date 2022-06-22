import * as BABYLON from 'babylonjs';


export abstract class ImportModelAbstract {
    private _mesh: BABYLON.AbstractMesh;
    private _animationGroups: BABYLON.AnimationGroup[];
    private _geometries: BABYLON.Geometry[];
    private _lights: BABYLON.Light[];
    private _meshes: BABYLON.AbstractMesh[];
    private _particleSystems: BABYLON.IParticleSystem[];
    private _skeletons: BABYLON.Skeleton[];
    private _transformNodes: BABYLON.TransformNode[];

    public get mesh(): BABYLON.AbstractMesh {
        return this._mesh;
    }

    public set mesh(value: BABYLON.AbstractMesh) {
        this._mesh = value;
    }

    public get animationGroups(): BABYLON.AnimationGroup[] {
        return this._animationGroups;
    }

    public set animationGroups(value: BABYLON.AnimationGroup[]) {
        this._animationGroups = value;
    }

    public get geometries(): BABYLON.Geometry[] {
        return this._geometries;
    }

    public set geometries(value: BABYLON.Geometry[]) {
        this._geometries = value;
    }

    public get lights(): BABYLON.Light[] {
        return this._lights;
    }

    public set lights(value: BABYLON.Light[]) {
        this._lights = value;
    }

    public get meshes(): BABYLON.AbstractMesh[] {
        return this._meshes;
    }

    public set meshes(value: BABYLON.AbstractMesh[]) {
        this._meshes = value;
    }

    public get particleSystems(): BABYLON.IParticleSystem[] {
        return this._particleSystems;
    }

    public set particleSystems(value: BABYLON.IParticleSystem[]) {
        this._particleSystems = value;
    }

    public get skeletons(): BABYLON.Skeleton[] {
        return this._skeletons;
    }

    public set skeletons(value: BABYLON.Skeleton[]) {
        this._skeletons = value;
    }

    public get transformNodes(): BABYLON.TransformNode[] {
        return this._transformNodes;
    }

    public set transformNodes(value: BABYLON.TransformNode[]) {
        this._transformNodes = value;
    }
}
