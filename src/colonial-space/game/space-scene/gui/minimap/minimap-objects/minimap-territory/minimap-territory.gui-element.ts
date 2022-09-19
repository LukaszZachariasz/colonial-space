import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '../../../../../../../core/module/scene/gui/gui-elements/append-gui-control/append-gui-control';
import {CAMERA} from '@colonial-space/core/module/scene/camera.token';
import {FromAboveCamera} from '../../../../../../shared/camera/from-above-camera';
import {GuiControl} from '../../../../../../../core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/module/scene/gui/gui-elements/gui-element';
import {IconGuiElement} from '../../../shared/icon/icon.gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SquareState} from '../../../../../game-logic/store/map/square/square.state';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {selectTerritoryById} from '../../../../../game-logic/store/territory/territory.selectors';

@GuiElement()
export class MinimapTerritoryGuiElement implements GuiControl<GUI.Container>, OnInit {
    @Inject(CAMERA) private camera: FromAboveCamera;
    
    public control: GUI.Container = new GUI.Container('minimapTerritory');
    public territoryState: TerritoryState = selectTerritoryById(this.squareState.territoryId);

    @AppendGuiControl() public icon: IconGuiElement = new IconGuiElement(this.territoryState.icon);

    constructor(private squareState: SquareState) {
    }

    public gameOnInit(): void {
        this.control.width = '20px';
        this.control.height = '20px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.alpha = 0.99;
        this.control.zIndex = 99;
        this.icon.control.width = '20px';
        this.icon.control.height = '20px';

        this.control.left = (this.squareState.x * 100) / this.camera.maxRight - 1 + '%';
        this.control.top = (this.squareState.y * 100) / this.camera.maxBottom - 1 + '%';
    }
}
