import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {AwarenessIndicatorGuiElement} from './awareness-indicator/awareness-indicator.gui-element';
import {GameStatsIndicator} from './game-stats-indicator';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {ScienceIndicatorGuiElement} from './science-indicator/science-indicator.gui-element';

@GuiElement()
export class GameStatsGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public static totalHeight = '200px';
    public static totalWidth = '50%';
    public static indicatorMaxWidth = '45%';

    public control: GUI.Container = new GUI.Container('GameStats');
    
    @AppendGuiControl() public awarenessIndicator: GameStatsIndicator = new AwarenessIndicatorGuiElement();
    @AppendGuiControl() public scienceIndicator: GameStatsIndicator = new ScienceIndicatorGuiElement();

    public gameAfterCreated(): void {
        this.control.alpha = 0.7;
        this.control.width = GameStatsGuiElement.totalWidth;
        this.control.height = GameStatsGuiElement.totalHeight;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.control.isPointerBlocker = true;

        this.awarenessIndicator.setProgress(20);
        this.scienceIndicator.setProgress(77);
    }
}
