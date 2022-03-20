import * as BABYLON from 'babylonjs';
import {Model} from '../../model';
import {selectPlayerColor} from '../../../../../store/player/player.selectors';

export class HexLinesModel implements Model {
    public lines: BABYLON.LinesMesh;
    public playerId: string | undefined;

    constructor(private hexPoints: BABYLON.Vector3[]) {
    }

    public create(scene: BABYLON.Scene): void {
        this.lines = BABYLON.MeshBuilder.CreateLines('hex', {points: this.hexPoints}, scene);
        this.lines.alpha = 0.1;

        if (this.playerId) {
            this.lines.color = selectPlayerColor();
            this.lines.alpha = 1;
        }
    }
}
