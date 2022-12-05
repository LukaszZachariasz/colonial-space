import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GameStatsGuiElement} from '../game-stats.gui-element';
import {GameStatsIndicator} from '../game-stats-indicator';
import {GuiColors} from '../../shared/palette/colors';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {ProgressGuiElement} from '../../shared/progress/progress.gui-element';
import {ScienceHintGuiElement} from './science-hint.gui-element';

@GuiElement()
export class ScienceIndicatorGuiElement implements GuiControl<GUI.Container>, GameStatsIndicator, AfterCreated {
    public static readonly ScienceColor = GuiColors.Neutral;

    public control = new GUI.Container('awarenessIndicator');

    @AppendGuiControl() public progress: ProgressGuiElement = new ProgressGuiElement(true);
    @AppendGuiControl() public scienceHint: ScienceHintGuiElement = new ScienceHintGuiElement();

    public gameAfterCreated(): void {
        this.control.width = GameStatsGuiElement.indicatorMaxWidth;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.control.height = '50%';

        this.progress.setHeight('30px');
        this.progress.control.paddingRight = ScienceHintGuiElement.size;

        this.progress.setColor(ScienceIndicatorGuiElement.ScienceColor);
    }

    public setProgress(progress: number): void {
        this.progress.setProgress(progress);
    }
}
