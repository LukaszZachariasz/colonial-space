import * as BABYLON from 'babylonjs';
import {IconControl} from '../../../gui/shared/icon/icon.control';
import {Subject, tap} from 'rxjs';
import {TerritorySignTitleContainer} from './territory-sign-title.container';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../gui/shared/text/text.control';
import {guiManager} from 'engine';

export class TerritorySignModel {
    public signMesh: BABYLON.Mesh;
    public territorySignTitleContainer: TerritorySignTitleContainer;

    public icon: IconControl;
    public text: TextControl;

    public clicked$ = new Subject<void>();

    private readonly WIDTH = 10;
    private readonly HEIGHT = 2;
    private readonly GUI_SIZE = 512;

    constructor(private scene: BABYLON.Scene,
                private territoryState: TerritoryState) {
        this.signMesh = BABYLON.MeshBuilder.CreatePlane('sign', {
            width: this.WIDTH,
            height: this.HEIGHT
        }, this.scene);
        this.signMesh.rotation.x = Math.PI;
        this.signMesh.position.y = -8; // TODO: why -8 instead of 8?
        this.signMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        this.territorySignTitleContainer = new TerritorySignTitleContainer(this.territoryState);
        this.territorySignTitleContainer.clicked$.pipe(
            tap(() => this.clicked$.next())
        ).subscribe();
        guiManager().createForMesh('TerritorySignTitleContainer', this.signMesh, this.territorySignTitleContainer, this.GUI_SIZE * this.WIDTH, this.GUI_SIZE * this.HEIGHT);
    }
}
