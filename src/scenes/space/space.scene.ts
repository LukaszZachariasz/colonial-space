import * as BABYLON from 'babylonjs';
import {GalaxyDust} from '../../game-objects/galaxy-dust/galaxy-dust';
import {Hex} from '../../game-objects/hex/hex';
import {HexState} from '../../game-state/map/hex/hex.state';
import {Planet} from '../../game-objects/hex/planet/planet';
import {Scene} from '../scene';
import {SpaceSceneGui} from './gui/space.scene-gui';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';
import {gameState} from '../../core/game-platform';

export class SpaceScene extends Scene<BABYLON.ArcRotateCamera, SpaceSceneGui> {
    public skybox: SpaceSkybox = new SpaceSkybox();
    public galaxyDust: GalaxyDust = new GalaxyDust();
    public hex: Hex = new Hex(new BABYLON.Vector2(0, 0));

    constructor() {
        super(true);
        this.gui = new SpaceSceneGui();
        this.camera = new BABYLON.ArcRotateCamera('spaceCamera', -Math.PI / 2, 0, 20, new BABYLON.Vector3(20, 0, -30), this.scene);
        this.camera.attachControl();

        this.skybox.create(this.scene);
        this.hex.create(this.scene);
        this.galaxyDust.create(this.scene);

        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(20, 0, -30), this.scene);

        gameState().map.hexes.forEach((hexStates: HexState[]) => {
            hexStates.forEach((hexState: HexState) => {
                const hex = new Hex(new BABYLON.Vector2(hexState.x, hexState.y));
                hex.create(this.scene);
                if (hexState.object) {
                    hex.setGameObject(new Planet());
                }
            });
        });
    }
}
