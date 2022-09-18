import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {ControlEvent} from '@colonial-space/core/scene-manager/gui/gui-elements/events/control-event';
import {ControlEventListener} from '@colonial-space/core/scene-manager/gui/gui-elements/events/control-event-listener';
import {GuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-element';
import {IconGuiElement} from '../../../gui/shared/icon/icon.gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Subject} from 'rxjs';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TextGuiElement} from '../../../gui/shared/text/text.gui-element';

@GuiElement()
export class TerritorySignTitleContainer implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('territorySignTitle');
    public clicked$ = new Subject<void>();

    @AppendGuiControl() public text: TextGuiElement = new TextGuiElement(this.territoryState.name);
    @AppendGuiControl() public icon: IconGuiElement = new IconGuiElement(this.territoryState.icon);

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


