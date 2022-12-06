import * as BABYLON from 'babylonjs';
import {FogOfWarModel} from './fog-of-war/fog-of-war.model';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/module/scene/model/model-manager';
import {ModelNode} from '@colonial-space/core/module/scene/model/node/model-node';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';
import {SquareBorderModel} from './square-border/square-border.model';
import {SquareState} from '../../../../game-logic/store/map/square/square.state';
import {SquareSurfaceModel} from './square-surface/square-surface.model';
import {Subscription, tap} from 'rxjs';

export class SquareModel extends ModelNode<BABYLON.TransformNode> implements OnInit, OnDestroy {
    @Inject(ModelManager) private modelManager: ModelManager;
    @Inject(SCENE) private scene: BABYLON.Scene;

    public static readonly SquareEdgeSize = 10;

    private fogOfWarModel: FogOfWarModel;
    private squareBorderModel: SquareBorderModel;
    private squareSurfaceModel: SquareSurfaceModel;

    private fogOfWarRemovedSubscription: Subscription;

    constructor(private state: SquareState) {
        super();
    }

    public gameOnInit(): void {
        this.node = new BABYLON.TransformNode(`Square[${this.state.x}, ${this.state.y}]`, this.scene);
        this.node.position.x = this.state.x;
        this.node.position.z = this.state.y;

        if (this.state.fogOfWar) {
            this.createFogOfWarModel();
        }
        this.createSquareBorderModel();
        this.createSquareSurfaceModel();
    }

    private createFogOfWarModel(): void {
        this.fogOfWarModel = this.modelManager.create(FogOfWarModel, this.state);
        this.fogOfWarModel.emitter.parent = this.node;
        this.fogOfWarRemovedSubscription = this.fogOfWarModel.destroyed$.pipe(
            tap(() => {
                this.fogOfWarModel = undefined;
            })
        ).subscribe();
    }

    private createSquareBorderModel(): void {
        this.squareBorderModel = this.modelManager.create(SquareBorderModel);
        this.squareBorderModel.mesh.parent = this.node;
        if (this.state.playerId) {
            this.squareBorderModel.setPlayer();
        }
    }

    private createSquareSurfaceModel(): void {
        this.squareSurfaceModel = this.modelManager.create(SquareSurfaceModel, this.state);
        this.squareSurfaceModel.mesh.parent = this.node;
    }

    public gameOnDestroy(): void {
        this.fogOfWarRemovedSubscription?.unsubscribe();
    }
}
