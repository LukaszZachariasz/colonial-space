import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {BuildingScopeContainer} from './building-scope/building-scope.container';
import {BuildingScopeState} from '../../../../../logic/store/building/building-scope/building-scope.state';
import {BuildingState} from '../../../../../logic/store/building/building.state';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingScopesStackPanel implements GuiControl<GUI.StackPanel>, AfterCreated {
    public control: GUI.StackPanel = new GUI.StackPanel('sectorsStackPanel');
    
    public buildingScopeContainers: BuildingScopeContainer[] = [];

    constructor(private buildingState: BuildingState) {
    }

    public gameAfterCreated(): void {
        this.buildingState.scopes.forEach((scope: BuildingScopeState) => {
            this.buildingScopeContainers.push(new BuildingScopeContainer(scope));
        });
        this.buildingScopeContainers.forEach((buildingScopeContainer: BuildingScopeContainer) => this.control.addControl(buildingScopeContainer.control));
    }
}
