import * as BABYLON from 'babylonjs';
import {GameObjectFromFile} from '@colonial-space/core/module/scene/model/game-object';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SquareState} from '../../../../../game-logic/store/map/square/square.state';
import {TerritoryModel} from '../../territory.model';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../../game-logic/store/territory/territory-type';
import {selectSquareByTerritoryId} from '../../../../../game-logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'AsteroidVolcanicModel',
    meshUrl: 'resources/territory/asteroid/asteroid-volcanic/',
    meshName: 'asteroid_volcanic_01.glb'
})
export class AsteroidVolcanicModel extends TerritoryModel implements OnLoad {
    public type: TerritoryType = TerritoryType.ASTEROID_VOLCANIC;
    public square: SquareState = selectSquareByTerritoryId(this.state.id);

    private readonly LAVA_MESH_NAME = 'asteroid_volcanic_lava';
    private readonly ASTEROID_GLOW_LAYER_NAME = 'asteroid_volcano_glow_layer';
    private readonly LAVAL_MATERIAL_NAME = 'asteroid_volcano_material';
    private readonly ASTEROID_PARTICLES = 'asteroid_particles';

    private lavaMesh: BABYLON.Mesh;

    constructor(public state: TerritoryState) {
        super(state);
    }

    public gameOnLoad(): void {
        this.primaryMesh.position = new BABYLON.Vector3(this.square.x, 5, this.square.y);

        this.lavaMesh = this.meshes.find((mesh: BABYLON.AbstractMesh) => mesh.name === this.LAVA_MESH_NAME) as BABYLON.Mesh;
        this.lavaMesh.material = this.getLavaMeshMaterial();

        this.createLavaGlowLayer(1);
        this.startAsteroidRotation();
        this.attachParticles();
        super.gameOnLoad();
    }

    private getRandom(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    private attachParticles(): void {
        const particleSystem = new BABYLON.ParticleSystem(this.ASTEROID_PARTICLES, 300, this.scene);

        particleSystem.particleTexture = new BABYLON.Texture('resources/galaxy-dust/galaxy-dust.png', this.scene);
        particleSystem.emitter = this.lavaMesh;

        particleSystem.color1 = new BABYLON.Color4(1, 0.0, 0.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.0, 0.0, 0.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        particleSystem.minSize = 0.01;
        particleSystem.maxSize = 0.1;

        particleSystem.minLifeTime = 0.1;
        particleSystem.maxLifeTime = 0.5;

        particleSystem.emitRate = 1500;

        particleSystem.minEmitPower = 4;
        particleSystem.maxEmitPower = 10;
        particleSystem.updateSpeed = 0.0005;

        particleSystem.start();
    }

    private getLavaMeshMaterial(): BABYLON.PBRMaterial {
        const lavaMeshMat = new BABYLON.PBRMaterial(this.LAVAL_MATERIAL_NAME);
        lavaMeshMat.emissiveColor = BABYLON.Color3.Red();
        return lavaMeshMat;
    }

    private createLavaGlowLayer(intensity: number): void {
        const lavaGlowLayer = new BABYLON.GlowLayer(this.ASTEROID_GLOW_LAYER_NAME, this.scene, {
            mainTextureFixedSize: 1024,
            blurKernelSize: 64
        });
        lavaGlowLayer.intensity = intensity;

        let intensityDelta = 0;
        this.scene.onBeforeRenderObservable.add(() => {
            intensityDelta += 0.01;
            lavaGlowLayer.intensity = Math.cos(intensityDelta) * 0.2 + 0.6;
        });
    }

    private startAsteroidRotation(): void {
        const rotationAxis = new BABYLON.Vector3(Math.sin(23 * Math.PI / this.getRandom(1, 180)), Math.cos(23 * Math.PI / this.getRandom(1, 180)), 0);
        this.scene.registerBeforeRender(() => this.primaryMesh.rotate(rotationAxis, 0.01, BABYLON.Space.WORLD));
    }
}
