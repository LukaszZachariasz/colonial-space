import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {IconControl} from '../../../gui/shared/icon/icon.control';

export class UnitSignModel {
    public signMesh: BABYLON.Mesh;
    public advancedTexture: GUI.AdvancedDynamicTexture;

    constructor(private scene: BABYLON.Scene) {
        this.signMesh = BABYLON.Mesh.CreatePlane('plane', 2, this.scene);
        this.signMesh.position.y = -5; // TODO: why -5 instead of 5?
        this.signMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(this.signMesh);
        const icon = new IconControl('spyglass').render();
        icon.widthInPixels = 1024;
        icon.heightInPixels = 1024;
        this.advancedTexture.addControl(icon);
    }
}