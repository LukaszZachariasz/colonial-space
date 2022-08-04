import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {FromAboveCamera} from '../../../../camera/from-above-camera';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconGuiElement} from '../../../shared/icon/icon.gui-element';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {sceneManager} from 'engine';
import {selectTerritoryById} from '../../../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class MinimapTerritoryGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('minimapTerritory');
    public territoryState: TerritoryState = selectTerritoryById(this.squareState.territoryId);

    @AppendGuiControl() public icon: IconGuiElement = new IconGuiElement(this.territoryState.icon);

    private camera: FromAboveCamera = sceneManager().currentCamera as FromAboveCamera;

    constructor(private squareState: SquareState) {
    }

    public gameAfterCreated(): void {
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