import * as GUI from 'babylonjs-gui';
import {BuildingScopeContainer} from './building-scope/building-scope.container';
import {BuildingScopeState} from '../../../../../logic/store/building/building-scope/building-scope.state';
import {BuildingState} from '../../../../../logic/store/building/building.state';
import {StackPanel} from '../../../../../../engine/gui-manager/stack-panel';

export class BuildingScopesStackPanel extends StackPanel {
    constructor(private buildingState: BuildingState) {
        super();
    }

    public render(): GUI.Control {
        this.stackPanel = new GUI.StackPanel('sectorsStackPanel');
        this.buildingState.scopes.forEach((scope: BuildingScopeState) => {
            this.stackPanel.addControl(new BuildingScopeContainer(scope).render());
        });
        return this.stackPanel;
    }
}
