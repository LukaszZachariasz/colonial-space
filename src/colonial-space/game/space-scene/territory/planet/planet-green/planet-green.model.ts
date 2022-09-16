import * as BABYLON from 'babylonjs';
import {GameObjectFromFile} from '@colonial-space/core/scene-manager/model/game-object';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SquareState} from '../../../../game-logic/store/map/square/square.state';
import {TerritoryModel} from '../../territory.model';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';
import {selectSquareByTerritoryId} from '../../../../game-logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'PlanetGreenModel',
    meshUrl: 'resources/territory/planet/planet-green/',
    meshName: 'planet_01.glb'
})
export class PlanetGreenModel extends TerritoryModel implements OnLoad, OnInit {
    public type: TerritoryType = TerritoryType.PLANET_GREEN;
    public square: SquareState = selectSquareByTerritoryId(this.state.id);

    constructor(public scene: BABYLON.Scene,
                public state: TerritoryState) {
        super(scene, state);
    }

    public gameOnInit(): void {
        this.primaryMesh.position = new BABYLON.Vector3(this.square.x, 0, this.square.y);
        this.createGlowLayer('PlanetGreenGlowLayer', 1);
        this.addWaterGlare();
    }

    public gameOnLoad(): void {
        super.gameOnLoad();
    }

    private createGlowLayer(glareName: string, intensity: number): void {
        const glowLayer = new BABYLON.GlowLayer(glareName, this.scene, {
            mainTextureFixedSize: 256,
            blurKernelSize: 10
        });

        glowLayer.intensity = intensity;
    }

    private addWaterGlare(): void {
        const PLANET_GREEN_WATER_GLOW = 'PLANET_GREEN_WATER_GLOW';
        const PLANET_GREEN_WATER_GLOW_MAT = 'PLANET_GREEN_WATER_GLOW_MAT';
        const mesh = this.meshes.find((mesh: BABYLON.AbstractMesh) => mesh.name === PLANET_GREEN_WATER_GLOW) as BABYLON.Mesh;
        mesh.material = this.getGlareMaterial(PLANET_GREEN_WATER_GLOW_MAT, BABYLON.Color3.Blue());
    }

    private getGlareMaterial(glareMatName: string, color: BABYLON.Color3): BABYLON.PBRMaterial {
        const mat = new BABYLON.PBRMaterial(glareMatName);
        mat.emissiveColor = color;
        return mat;
    }
}
