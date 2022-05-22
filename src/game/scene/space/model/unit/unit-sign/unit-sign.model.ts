import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {IconControl} from '../../../gui/shared/icon/icon.control';
import {Subject} from 'rxjs';

export class UnitSignModel {
    public signMesh: BABYLON.Mesh;
    public advancedTexture: GUI.AdvancedDynamicTexture;

    public clicked$ = new Subject<void>();

    constructor(private scene: BABYLON.Scene) {
        this.signMesh = BABYLON.Mesh.CreatePlane('sign', 2, this.scene);
        this.signMesh.rotation.x = Math.PI;
        this.signMesh.position.y = -5; // TODO: why -5 instead of 5?
        this.signMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(this.signMesh);
        const icon = new IconControl('spyglass').render();
        icon.widthInPixels = 1024;
        icon.heightInPixels = 1024;
        this.advancedTexture.addControl(icon);

        icon.onPointerDownObservable.add(() => {
            this.clicked$.next();
        });
    }
}
