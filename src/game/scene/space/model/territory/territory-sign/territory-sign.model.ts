import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {IconControl} from '../../../gui/shared/icon/icon.control';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../gui/shared/text/text.control';

export class TerritorySignModel {
    public signMesh: BABYLON.Mesh;
    public advancedTexture: GUI.AdvancedDynamicTexture;

    public icon: IconControl;
    public text: TextControl;

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
        this.signMesh.position.y = -5; // TODO: why -5 instead of 5?
        this.signMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(this.signMesh, this.GUI_SIZE * this.WIDTH, this.GUI_SIZE * this.HEIGHT);
        this.advancedTexture.background = 'rgba(0, 0, 0, 0.2)';

        this.icon = new IconControl('planet');
        this.icon.render();
        this.icon.icon.widthInPixels = this.GUI_SIZE * this.HEIGHT;
        this.icon.icon.heightInPixels = this.GUI_SIZE * this.HEIGHT;

        this.text = new TextControl(this.territoryState.name);
        this.text.render();
        this.text.textBlock.fontSize = this.GUI_SIZE + 'px';
        this.text.textBlock.left = (this.GUI_SIZE * this.HEIGHT) + this.TEXT_PADDING + 'px';
        this.text.textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.textBlock.widthInPixels = (this.GUI_SIZE * this.WIDTH) - (this.GUI_SIZE * this.HEIGHT) - this.TEXT_PADDING;

        this.advancedTexture.addControl(this.icon.icon);
        this.advancedTexture.addControl(this.text.textBlock);
    }
}
