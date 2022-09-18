import * as BABYLON from 'babylonjs';
import {GameObjectFromFile} from '@colonial-space/core/scene-manager/model/game-object';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {UnitModel} from '../unit.model';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../../game-logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'ScoutShipModel',
    meshUrl: 'resources/unit/scout-ship/',
    meshName: 'scout_ship_01.glb'
})
export class ScoutShipModel extends UnitModel implements OnLoad {
    constructor(protected state: UnitState) {
        super(state);
    }

    public gameOnLoad(): void {
        this.primaryMesh.position = new BABYLON.Vector3(selectSquareByUnitId(this.state.id).x + 3, 2, selectSquareByUnitId(this.state.id).y - 4);
        super.gameOnLoad();

        this.createGlowLayer('ScoutShipModelGlowLayer', 5);

        this.addGlareFrontView();
        this.addGlareRoof();
        this.addCablesGlare();
        this.addRadiatorGlare();
        this.addRocketGlare();
    }

    private addGlareFrontView(): void {
        const GLARE_FRONT_MESH_NAME = 'GLARE_FRONT';
        const GLARE_FRONT_MATERIAL_NAME = 'GLARE_FRONT_MATERIAL_NAME';

        const mesh = this.meshes.find((mesh: BABYLON.AbstractMesh) => mesh.name === GLARE_FRONT_MESH_NAME) as BABYLON.Mesh;
        mesh.material = this.getGlareMaterial(GLARE_FRONT_MATERIAL_NAME, BABYLON.Color3.White());
    }


    private addGlareRoof(): void {
        const GLARE_ROOF_MESH_NAME = 'GLARE_ROOF';
        const GLARE_ROOF_MATERIAL_NAME = 'GLARE_ROOF_MATERIAL_NAME';

        const mesh = this.meshes.find((mesh: BABYLON.AbstractMesh) => mesh.name === GLARE_ROOF_MESH_NAME) as BABYLON.Mesh;
        mesh.material = this.getGlareMaterial(GLARE_ROOF_MATERIAL_NAME, BABYLON.Color3.Yellow());
    }

    private addCablesGlare(): void {
        const GLARE_CABLES_MESH_NAME = 'GLARE_CABLES';
        const CABLES_MATERIAL_NAME = 'CABLES_MATERIAL_NAME';

        const mesh = this.meshes.find((mesh: BABYLON.AbstractMesh) => mesh.name === GLARE_CABLES_MESH_NAME) as BABYLON.Mesh;
        mesh.material = this.getGlareMaterial(CABLES_MATERIAL_NAME, BABYLON.Color3.Yellow());
    }

    private addRocketGlare(): void {
        const GLARE_ROCKET_ENGINE_MESH_NAME = 'GLARE_ROCKET_ENGINE';
        const GLARE_ROCKET_ENGINE_MATERIAL_NAME = 'GLARE_ROCKET_ENGINE_MATERIAL_NAME';

        const meshEngine = this.meshes.find((mesh: BABYLON.AbstractMesh) => mesh.name === GLARE_ROCKET_ENGINE_MESH_NAME) as BABYLON.Mesh;
        meshEngine.material = this.getGlareMaterial(GLARE_ROCKET_ENGINE_MATERIAL_NAME, BABYLON.Color3.Red());

        const GLARE_ROCKET_PROPS_MESH_NAME = 'GLARE_ROCKET_PROPS';
        const GLARE_ROCKET_PROPS_MATERIAL_NAME = 'GLARE_ROCKET_PROPS_MATERIAL_NAME';

        const meshProps = this.meshes.find((mesh: BABYLON.AbstractMesh) => mesh.name === GLARE_ROCKET_PROPS_MESH_NAME) as BABYLON.Mesh;
        meshProps.material = this.getGlareMaterial(GLARE_ROCKET_PROPS_MATERIAL_NAME, BABYLON.Color3.Red());
    }

    private addRadiatorGlare(): void {
        const GLARE_RADIATOR_MESH_NAME = 'GLARE_RADIATOR';
        const RADIATOR_MATERIAL_NAME = 'RADIATOR_MATERIAL_NAME';

        const mesh = this.meshes.find((mesh: BABYLON.AbstractMesh) => mesh.name === GLARE_RADIATOR_MESH_NAME) as BABYLON.Mesh;
        mesh.material = this.getGlareMaterial(RADIATOR_MATERIAL_NAME, BABYLON.Color3.Blue());
    }

    private createGlowLayer(glareName: string, intensity: number): void {
        const glowLayer = new BABYLON.GlowLayer(glareName, this.scene, {
            mainTextureFixedSize: 4096,
            blurKernelSize: 0,
            mainTextureRatio: 4096
        });

        glowLayer.intensity = intensity;
    }

    private getGlareMaterial(glareMatName: string, color: BABYLON.Color3): BABYLON.PBRMaterial {
        const mat = new BABYLON.PBRMaterial(glareMatName);
        mat.emissiveColor = color;
        return mat;
    }
}
