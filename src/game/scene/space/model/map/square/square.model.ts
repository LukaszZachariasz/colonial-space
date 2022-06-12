import * as BABYLON from 'babylonjs';
import {FogOfWarModel} from './fog-of-war/fog-of-war.model';
import {SimpleModel} from '../../../../../../engine/model-manager/model-elements/simple-model';
import {SquareBorderModel} from './square-border/square-border.model';
import {SquareState} from '../../../../../logic/store/map/square/square.state';
import {SquareSurfaceModel} from './square-surface/square-surface.model';
import {filter, tap} from 'rxjs';
import {logic} from '../../../../../game';
import {modelManager} from 'engine';

export class SquareModel extends SimpleModel<BABYLON.TransformNode> {
    public static readonly SquareEdgeSize = 10;

    private fogOfWarModel: FogOfWarModel;
    private squareBorderModel: SquareBorderModel;
    private squareSurfaceModel: SquareSurfaceModel;

    constructor(private scene: BABYLON.Scene,
                private state: SquareState) {
        super();
    }

    public onCreate(): void {
        this.mesh = new BABYLON.TransformNode(`Square[${this.state.x}, ${this.state.y}]`, this.scene);
        this.mesh.position.x = this.state.x;
        this.mesh.position.z = this.state.y;

        if (this.state.fogOfWar) {
            this.createFogOfWarModel();
        }
        this.createSquareBorderModel();
        this.createSquareSurfaceModel();
        this.listenOnFogOfWarChanged();
    }

    private createFogOfWarModel(): void {
        this.fogOfWarModel = modelManager().addModel(new FogOfWarModel(this.scene, this.state));
        this.fogOfWarModel.mesh.parent = this.mesh;
        this.fogOfWarModel.emitter.parent = this.mesh;
    }

    private createSquareBorderModel(): void {
        this.squareBorderModel = modelManager().addModel(new SquareBorderModel(this.scene));
        this.squareBorderModel.mesh.parent = this.mesh;
        if (this.state.playerId) {
            this.squareBorderModel.setPlayer();
        }
    }

    private createSquareSurfaceModel(): void {
        this.squareSurfaceModel = modelManager().addModel(new SquareSurfaceModel(this.scene, this.state));
        this.squareSurfaceModel.mesh.parent = this.mesh;
    }

    private listenOnFogOfWarChanged(): void {
        logic().fogOfWarService.removeFogOfWar$.pipe(
            filter((id: string) => this.state.id === id),
            tap(() => this.fogOfWarModel.destroy()),
            tap(() => {
                this.fogOfWarModel = undefined;
            })
        ).subscribe();
    }
}
