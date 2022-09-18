import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {EMPTY, Subscription, delay, filter, of, tap} from 'rxjs';
import {FogOfWarService} from '../../../../../game-logic/fog-of-war/fog-of-war.service';
import {FromAboveCamera} from '../../../../../../shared/camera/from-above-camera';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/module/scene/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {MapGeneratorService} from '../../../../../game-generator/map-generator/map-generator.service';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SquareModel} from '../../../../model/map/square/square.model';
import {SquareState} from '../../../../../game-logic/store/map/square/square.state';

@GuiElement()
export class MinimapFogOfWarGuiElement implements GuiControl<GUI.Container>, OnInit {
    @Inject(CAMERA) private camera: FromAboveCamera;
    @Inject(SCENE) private scene: BABYLON.Scene;
    @Inject(FogOfWarService) private fogOfWarService: FogOfWarService;

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
    private removeFogOfWarSubscription: Subscription;

    constructor(private squareState: SquareState) {
    }

    public gameOnInit(): void {
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.background = this.colors[Math.floor(Math.random() * this.colors.length)];

        this.control.width = ((SquareModel.SquareEdgeSize / (MapGeneratorService.MapWidth * SquareModel.SquareEdgeSize)) * 100) + 0.3 + '%';
        this.control.height = ((SquareModel.SquareEdgeSize / (MapGeneratorService.MapHeight * SquareModel.SquareEdgeSize)) * 100) + 1 + '%';

        this.control.left = (this.squareState.x * 100) / this.camera.maxRight + '%';
        this.control.top = (this.squareState.y * 100) / this.camera.maxBottom + '%';
        this.control.alpha = 0.5;

        this.removeFogOfWarSubscription = this.fogOfWarService.removeFogOfWar$.pipe(
            filter((id: string) => this.squareState.id === id),
            tap(() => this.destroy())
        ).subscribe();
    }

    private destroy(): void {
        of(EMPTY).pipe(
            tap(() => this.scene.registerBeforeRender(this.disposeControl)),
            delay(1500),
            tap(() => this.control.dispose())
        ).subscribe();
    }

    private disposeAlpha(): void {
        this.control.alpha -= 0.01;
        if (this.control.alpha < 0) {
            this.control.alpha = 0;
            this.scene.unregisterBeforeRender(this.disposeControl);
        }
    }

    public gameOnDestroy(): void {
        this.removeFogOfWarSubscription?.unsubscribe();
    }
}
