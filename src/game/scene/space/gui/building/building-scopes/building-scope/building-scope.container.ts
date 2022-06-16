import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {BuildingScopeNameContainer} from './building-scope-name/building-scope-name.container';
import {BuildingScopeObjectsContainer} from './building-scope-objects/building-scope-objects.container';
import {BuildingScopeState} from '../../../../../../logic/store/building/building-scope/building-scope.state';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingScopeContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('sector');

    @AppendControl() public buildingScopeNameContainer: BuildingScopeNameContainer = new BuildingScopeNameContainer(this.scopeState);
    @AppendControl() public buildingScopeObjectsContainer: BuildingScopeObjectsContainer = new BuildingScopeObjectsContainer(this.scopeState);

    constructor(private scopeState: BuildingScopeState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '160px';
    }
}
