import * as BABYLON from 'babylonjs';
import {IconGuiElement} from '../../gui/shared/icon/icon.gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {SceneGuiManager} from '@colonial-space/core/scene-manager/gui/scene-gui-manager';
import {SimpleModel} from '../../../../../core/scene-manager/model/model-elements/simple-model';
import {Subject, tap} from 'rxjs';
import {TerritorySignTitleContainer} from './territory-sign-title.container';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';
import {TextGuiElement} from '../../gui/shared/text/text.gui-element';

export class TerritorySignModel extends SimpleModel<BABYLON.Mesh> {
    @Inject(SceneGuiManager) private sceneGuiManager: SceneGuiManager;
    
    public territorySignTitleContainer: TerritorySignTitleContainer;

    public icon: IconGuiElement;
    public text: TextGuiElement;

    public clicked$ = new Subject<void>();

    private readonly WIDTH = 10;
    private readonly HEIGHT = 2;
    private readonly GUI_SIZE = 512;

    constructor(private scene: BABYLON.Scene,
                private territoryState: TerritoryState) {
        super();
    }

    public onCreate(): void {
        this.mesh = BABYLON.MeshBuilder.CreatePlane('sign', {
            width: this.WIDTH,
            height: this.HEIGHT
        }, this.scene);
        this.mesh.rotation.x = Math.PI;
        this.mesh.position.y = -8; // TODO: why -8 instead of 8?
        this.mesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        this.createTerritorySignTitleContainer();
    }

    private createTerritorySignTitleContainer(): void {
        this.territorySignTitleContainer = new TerritorySignTitleContainer(this.territoryState);
        this.territorySignTitleContainer.clicked$.pipe(
            tap(() => this.clicked$.next())
        ).subscribe();
        this.sceneGuiManager.createForMesh('TerritorySignTitleContainer', this.mesh, this.territorySignTitleContainer, this.GUI_SIZE * this.WIDTH, this.GUI_SIZE * this.HEIGHT);
    }
}
