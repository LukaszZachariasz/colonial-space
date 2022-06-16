import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {BuildingScopeNameGuiElement} from './building-scope-name/building-scope-name.gui-element';
import {BuildingScopeObjectsGuiElement} from './building-scope-objects/building-scope-objects.gui-element';
import {BuildingScopeState} from '../../../../../../logic/store/building/building-scope/building-scope.state';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingScopeGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('sector');

    @AppendGuiControl() public buildingScopeName: BuildingScopeNameGuiElement = new BuildingScopeNameGuiElement(this.scopeState);
    @AppendGuiControl() public buildingScopeObjects: BuildingScopeObjectsGuiElement = new BuildingScopeObjectsGuiElement(this.scopeState);

    constructor(private scopeState: BuildingScopeState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '160px';
    }
}
