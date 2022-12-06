import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {ControlEvent} from '@colonial-space/core/module/scene/gui/gui-component/events/control-event';
import {ControlEventListener} from '@colonial-space/core/module/scene/gui/gui-component/events/control-event-listener';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {IconGuiComponent} from '../../../gui/shared/icon/icon.gui-component';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Subject} from 'rxjs';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TextGuiComponent} from '../../../../../shared/gui/text/text.gui-component';

@GuiComponent()
export class TerritorySignTitleContainer implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('territorySignTitle');
    public clicked$ = new Subject<void>();

    @AppendGuiControl() public text: TextGuiComponent = new TextGuiComponent(this.territoryState.name);
    @AppendGuiControl() public icon: IconGuiComponent = new IconGuiComponent(this.territoryState.icon);

    private readonly WIDTH = 10;
    private readonly HEIGHT = 2;
    private readonly GUI_SIZE = 512;
    private readonly TEXT_PADDING = 100;

    constructor(private territoryState: TerritoryState) {
    }

    public gameOnInit(): void {
        this.control.widthInPixels = this.GUI_SIZE * this.WIDTH;
        this.control.heightInPixels = this.GUI_SIZE * this.HEIGHT;
        this.control.background = 'rgba(0, 0, 0, 0.2)';

        this.text.control.fontSize = this.GUI_SIZE + 'px';
        this.text.control.left = (this.GUI_SIZE * this.HEIGHT) + this.TEXT_PADDING + 'px';
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.widthInPixels = (this.GUI_SIZE * this.WIDTH) - (this.GUI_SIZE * this.HEIGHT) - this.TEXT_PADDING;

        this.icon.control.widthInPixels = this.GUI_SIZE * this.HEIGHT;
        this.icon.control.heightInPixels = this.GUI_SIZE * this.HEIGHT;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_DOWN)
    public pointerDown(): void {
        this.clicked$.next();
    }
}



