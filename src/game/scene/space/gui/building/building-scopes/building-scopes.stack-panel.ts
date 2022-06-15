import {BuildingScopeContainer} from './building-scope/building-scope.container';
import {BuildingScopeState} from '../../../../../logic/store/building/building-scope/building-scope.state';
import {BuildingState} from '../../../../../logic/store/building/building.state';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {StackPanel} from '../../../../../../engine/gui-manager/gui-elements/elements/stack-panel/stack-panel';

@GuiElement()
export class BuildingScopesStackPanel extends StackPanel {
    public buildingScopeContainers: BuildingScopeContainer[] = [];

    constructor(private buildingState: BuildingState) {
        super('sectorsStackPanel');
    }

    public onCreate(): void {
        super.onCreate();
        this.buildingState.scopes.forEach((scope: BuildingScopeState) => {
            this.buildingScopeContainers.push(new BuildingScopeContainer(scope));
        });
        this.buildingScopeContainers.forEach((buildingScopeContainer: BuildingScopeContainer) => this.addControlToStackPanel(buildingScopeContainer));
    }
}
