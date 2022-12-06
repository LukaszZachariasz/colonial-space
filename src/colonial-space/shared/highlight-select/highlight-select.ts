import * as BABYLON from 'babylonjs';
import {Subject} from 'rxjs';

export class HighlightSelect {
    public actionManager: BABYLON.ActionManager;
    public clicked$: Subject<void> = new Subject();

    constructor(private mesh: BABYLON.Mesh) {
        this.createActionManager();
    }

    private createActionManager(): void {
        this.actionManager = new BABYLON.ActionManager(this.mesh.getScene());
        const highlightLayer = new BABYLON.HighlightLayer('hover_highlight_layer', this.mesh.getScene());
        this.mesh.enablePointerMoveEvents = false;

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                highlightLayer.addMesh(this.mesh, BABYLON.Color3.Yellow());
            })
        );
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                this.clicked$.next();
            })
        );
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                highlightLayer.removeAllMeshes();
            })
        );
        this.mesh.actionManager = this.actionManager;
    }
}
