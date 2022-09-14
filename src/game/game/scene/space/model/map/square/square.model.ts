import * as BABYLON from 'babylonjs';
import {Container} from 'typedi';
import {FogOfWarModel} from './fog-of-war/fog-of-war.model';
import {ModelManagerService} from '../../../../../../core/model-manager/model-manager.service';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {SimpleModel} from '../../../../../../core/model-manager/model-elements/simple-model';
import {SquareBorderModel} from './square-border/square-border.model';
import {SquareState} from '../../../../../logic/store/map/square/square.state';
import {SquareSurfaceModel} from './square-surface/square-surface.model';
import {Subscription, tap} from 'rxjs';

export class SquareModel extends SimpleModel<BABYLON.TransformNode> implements OnDestroy {
    public static readonly SquareEdgeSize = 10;

    private fogOfWarModel: FogOfWarModel;
    private squareBorderModel: SquareBorderModel;
    private squareSurfaceModel: SquareSurfaceModel;

    private fogOfWarRemovedSubscription: Subscription;

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
    }

    private createFogOfWarModel(): void {
        this.fogOfWarModel = Container.get(ModelManagerService).addSimpleModel(new FogOfWarModel(this.scene, this.state));
        this.fogOfWarModel.mesh.parent = this.mesh;
        this.fogOfWarModel.emitter.parent = this.mesh;
        this.fogOfWarRemovedSubscription = this.fogOfWarModel.destroyed$.pipe(
            tap(() => {
                this.fogOfWarModel = undefined;
            })
        ).subscribe();
    }

    private createSquareBorderModel(): void {
        this.squareBorderModel = Container.get(ModelManagerService).addSimpleModel(new SquareBorderModel(this.scene));
        this.squareBorderModel.mesh.parent = this.mesh;
        if (this.state.playerId) {
            this.squareBorderModel.setPlayer();
        }
    }

    private createSquareSurfaceModel(): void {
        this.squareSurfaceModel = Container.get(ModelManagerService).addSimpleModel(new SquareSurfaceModel(this.scene, this.state));
        this.squareSurfaceModel.mesh.parent = this.mesh;
    }

    public gameOnDestroy(): void {
        this.fogOfWarRemovedSubscription?.unsubscribe();
    }
}
