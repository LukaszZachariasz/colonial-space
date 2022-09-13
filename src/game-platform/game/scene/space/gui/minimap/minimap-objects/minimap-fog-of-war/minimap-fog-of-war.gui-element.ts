import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {EMPTY, Subscription, delay, filter, of, tap} from 'rxjs';
import {FromAboveCamera} from '../../../../camera/from-above-camera';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {MapGenerator} from '../../../../../../logic/store-generator/map-generator/map.generator';
import {SquareModel} from '../../../../model/map/square/square.model';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {logic} from '../../../../../../game';
import {sceneManager} from 'engine';

@GuiElement()
export class MinimapFogOfWarGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('minimapObjects');
    public colors = [
        BABYLON.Color3.Purple().toHexString(),
        BABYLON.Color3.Purple().scale(1.2).toHexString(),
        BABYLON.Color3.Purple().scale(1.3).toHexString()
    ];

    public get squareId(): string {
        return this.squareState.id;
    }

    private disposeControl = (): void => this.disposeAlpha();
    private camera: FromAboveCamera = sceneManager().currentCamera as FromAboveCamera;
    private removeFogOfWarSubscription: Subscription;

    constructor(private squareState: SquareState) {
    }

    public gameAfterCreated(): void {
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.background = this.colors[Math.floor(Math.random() * this.colors.length)];

        this.control.width = ((SquareModel.SquareEdgeSize / (MapGenerator.MapWidth * SquareModel.SquareEdgeSize)) * 100) + 0.3 + '%';
        this.control.height = ((SquareModel.SquareEdgeSize / (MapGenerator.MapHeight * SquareModel.SquareEdgeSize)) * 100) + 1 + '%';

        this.control.left = (this.squareState.x * 100) / this.camera.maxRight + '%';
        this.control.top = (this.squareState.y * 100) / this.camera.maxBottom + '%';
        this.control.alpha = 0.5;

        this.removeFogOfWarSubscription = logic().fogOfWarService.removeFogOfWar$.pipe(
            filter((id: string) => this.squareState.id === id),
            tap(() => this.destroy())
        ).subscribe();
    }

    private destroy(): void {
        of(EMPTY).pipe(
            tap(() => sceneManager().currentBabylonScene.registerBeforeRender(this.disposeControl)),
            delay(1500),
            tap(() => this.control.dispose())
        ).subscribe();
    }

    private disposeAlpha(): void {
        this.control.alpha -= 0.01;
        if (this.control.alpha < 0) {
            this.control.alpha = 0;
            sceneManager().currentBabylonScene.unregisterBeforeRender(this.disposeControl);
        }
    }

    public gameOnDestroy(): void {
        this.removeFogOfWarSubscription?.unsubscribe();
    }
}