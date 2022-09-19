import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelMesh} from '@colonial-space/core/module/scene/model/mesh/model-mesh';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';
import {SquareModel} from '../square.model';
import {selectPlayerColor} from '../../../../../game-logic/store/player/player.selectors';

export class SquareBorderModel extends ModelMesh<BABYLON.LinesMesh> implements OnInit {
    @Inject(SCENE) private scene: BABYLON.Scene;

    public gameOnInit(): void {
        this.mesh = BABYLON.MeshBuilder.CreateLines('SquareBorder', {points: this.generateSquarePolygon()}, this.scene);
        this.mesh.alpha = 0.05;
    }

    public setPlayer(): void {
        this.mesh.color = BABYLON.Color3.FromHexString(selectPlayerColor());
        this.mesh.alpha = 1;
    }

    private generateSquarePolygon(): BABYLON.Vector3[] {
        return [
            new BABYLON.Vector3(-SquareModel.SquareEdgeSize / 2, 0, SquareModel.SquareEdgeSize / 2),
            new BABYLON.Vector3(SquareModel.SquareEdgeSize / 2, 0, SquareModel.SquareEdgeSize / 2),
            new BABYLON.Vector3(SquareModel.SquareEdgeSize / 2, 0, -SquareModel.SquareEdgeSize / 2),
            new BABYLON.Vector3(-SquareModel.SquareEdgeSize / 2, 0, -SquareModel.SquareEdgeSize / 2),
            new BABYLON.Vector3(-SquareModel.SquareEdgeSize / 2, 0, SquareModel.SquareEdgeSize / 2)
        ];
    }
}
