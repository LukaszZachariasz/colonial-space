import * as BABYLON from 'babylonjs';
import {Model} from '../../model';
import {selectPlayerColor} from '../../../../../store/player/player.selectors';

export class SquareLinesModel implements Model {
    public lines: BABYLON.LinesMesh;
    public playerId: string | undefined;

    constructor(private squarePoints: BABYLON.Vector3[]) {
    }

    public create(scene: BABYLON.Scene): void {
        this.lines = BABYLON.MeshBuilder.CreateLines('squareLines', {points: this.squarePoints}, scene);
        this.lines.alpha = 0.05;

        if (this.playerId) {
            this.lines.color = selectPlayerColor();
            this.lines.alpha = 1;
        }
    }
}
