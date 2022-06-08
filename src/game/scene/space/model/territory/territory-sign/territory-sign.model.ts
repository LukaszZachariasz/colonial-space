import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {IconControl} from '../../../gui/shared/icon/icon.control';
import {Subject} from 'rxjs';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../gui/shared/text/text.control';

export class TerritorySignModel {
    public signMesh: BABYLON.Mesh;
    public advancedTexture: GUI.AdvancedDynamicTexture;

    public icon: IconControl;
    public text: TextControl;

    public clicked$ = new Subject<void>();

    private readonly WIDTH = 10;
    private readonly HEIGHT = 2;
    private readonly GUI_SIZE = 512;
    private readonly TEXT_PADDING = 100;

    constructor(private scene: BABYLON.Scene,
                private territoryState: TerritoryState) {
        this.signMesh = BABYLON.MeshBuilder.CreatePlane('sign', {
            width: this.WIDTH,
            height: this.HEIGHT
        }, this.scene);
        this.signMesh.rotation.x = Math.PI;
        this.signMesh.position.y = -8; // TODO: why -8 instead of 8?
        this.signMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(this.signMesh, this.GUI_SIZE * this.WIDTH, this.GUI_SIZE * this.HEIGHT);
        this.advancedTexture.background = 'rgba(0, 0, 0, 0.2)';

        this.icon = new IconControl(this.territoryState.icon);
        this.icon.render();
        this.icon.icon.widthInPixels = this.GUI_SIZE * this.HEIGHT;
        this.icon.icon.heightInPixels = this.GUI_SIZE * this.HEIGHT;
        this.icon.icon.onPointerDownObservable.add(() => {
            this.clicked$.next();
        });

        this.text = new TextControl(this.territoryState.name);
        this.text.render();
        this.text.textBlock.fontSize = this.GUI_SIZE + 'px';
        this.text.textBlock.left = (this.GUI_SIZE * this.HEIGHT) + this.TEXT_PADDING + 'px';
        this.text.textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.textBlock.widthInPixels = (this.GUI_SIZE * this.WIDTH) - (this.GUI_SIZE * this.HEIGHT) - this.TEXT_PADDING;
        this.text.textBlock.onPointerDownObservable.add(() => {
            this.clicked$.next();
        });

        this.advancedTexture.addControl(this.icon.icon);
        this.advancedTexture.addControl(this.text.textBlock);
    }
}
