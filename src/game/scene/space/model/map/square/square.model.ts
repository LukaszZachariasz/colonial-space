import * as BABYLON from 'babylonjs';
import {FogOfWarModel} from './fog-of-war/fog-of-war.model';
import {SquareBorderModel} from './square-border/square-border.model';
import {SquareState} from '../../../../../logic/store/map/square/square.state';
import {SquareSurfaceModel} from './square-surface/square-surface.model';
import {filter, tap} from 'rxjs';
import {logic} from '../../../../../game';

export class SquareModel {
    public static readonly SquareEdgeSize = 10;

    public squareNode: BABYLON.TransformNode;

    private fogOfWarModel: FogOfWarModel;
    private squareBorderModel: SquareBorderModel;
    private squareSurfaceModel: SquareSurfaceModel;

    constructor(private scene: BABYLON.Scene,
                private state: SquareState) {
        this.squareNode = new BABYLON.TransformNode(`Square[${this.state.x}, ${this.state.y}]`, this.scene);
        this.squareNode.position.x = this.state.x;
        this.squareNode.position.z = this.state.y;

        if (this.state.fogOfWar) {
            this.createFogOfWarModel();
        }
        this.createSquareBorderModel();
        this.createSquareSurfaceModel();
        this.listenOnFogOfWarChanged();
    }

    private createFogOfWarModel(): void {
        this.fogOfWarModel = new FogOfWarModel(this.scene, this.state);
        this.fogOfWarModel.plane.parent = this.squareNode;
        this.fogOfWarModel.emitter.parent = this.squareNode;
    }

    private createSquareBorderModel(): void {
        this.squareBorderModel = new SquareBorderModel(this.scene);
        this.squareBorderModel.lines.parent = this.squareNode;
        if (this.state.playerId) {
            this.squareBorderModel.setPlayer();
        }
    }

    private createSquareSurfaceModel(): void {
        this.squareSurfaceModel = new SquareSurfaceModel(this.scene, this.state);
        this.squareSurfaceModel.plane.parent = this.squareNode;
    }

    private listenOnFogOfWarChanged(): void {
        logic().fogOfWarService.removeFogOfWar$.pipe(
            filter((id: string) => this.state.id === id),
            tap(() => this.fogOfWarModel.plane.dispose()),
            tap(() => this.fogOfWarModel.emitter.dispose()),
            tap(() => {
                this.fogOfWarModel = undefined;
            })
        ).subscribe();
    }
}
