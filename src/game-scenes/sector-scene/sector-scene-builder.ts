import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from '../../engine/camera/from-above-camera/from-above-camera';
import {SectorScene} from './sector-scene';

export class SectorSceneBuilder {
    public sectorScene: SectorScene;

    constructor() {
        this.sectorScene = new SectorScene();
    }

    public withArcCamera(): SectorSceneBuilder {
        this.sectorScene.camera = new FromAboveCamera('camera', 0, 0, 10, new BABYLON.Vector3(0, 50, -70), this.sectorScene.scene);
        this.sectorScene.camera.setTarget(BABYLON.Vector3.Zero());
        this.sectorScene.camera.attachControl(false);
        return this;
    }

    public withGround(): SectorSceneBuilder {
        this.sectorScene.ground = BABYLON.MeshBuilder.CreateGround('ground', {width: 100, height: 100});
        return this;
    }

    public withLights(): SectorSceneBuilder {
        const light = new BABYLON.HemisphericLight('planetLight', new BABYLON.Vector3(0, 1, 0), this.sectorScene.scene);
        light.intensity = 1;
        return this;
    }

    public build(): SectorScene {
        return this.sectorScene;
    }
}