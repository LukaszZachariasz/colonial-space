import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {BuildingScopeState} from '../../../../../../game-logic/store/building/building-scope/building-scope.state';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextGuiComponent} from '../../../../shared/text/text.gui-component';

@GuiComponent()
export class BuildingScopeNameGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('sectorNameContainer');
    
    @AppendGuiControl() public text: TextGuiComponent = new TextGuiComponent(this.scopeState.name);

    constructor(private scopeState: BuildingScopeState) {
    }

    public gameOnInit(): void {
        this.control.width = '5%';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.4)';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.rotation = -Math.PI / 2;
    }
}
