import {BuildingScopeContainer} from './building-scope/building-scope.container';
import {BuildingScopeState} from '../../../../../logic/store/building/building-scope/building-scope.state';
import {BuildingState} from '../../../../../logic/store/building/building.state';
import {StackPanel} from '../../../../../../engine/gui-manager/gui-elements/stack-panel';

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
    }

    public onBuild(): void {
        this.buildingScopeContainers.forEach((buildingScopeContainer: BuildingScopeContainer) => this.addControlToStackPanel(buildingScopeContainer));
    }
}
