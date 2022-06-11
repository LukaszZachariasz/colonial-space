import {BuildingScopeNameContainer} from './building-scope-name/building-scope-name.container';
import {BuildingScopeObjectsContainer} from './building-scope-objects/building-scope-objects.container';
import {BuildingScopeState} from '../../../../../../logic/store/building/building-scope/building-scope.state';
import {Container} from '../../../../../../../engine/gui-manager/gui-elements/container';

export class BuildingScopeContainer extends Container {
    public buildingScopeNameContainer: BuildingScopeNameContainer;
    public buildingScopeObjectsContainer: BuildingScopeObjectsContainer;

    constructor(private scopeState: BuildingScopeState) {
        super('sector');
    }

    public onCreate(): void {
        super.onCreate();
        this.buildingScopeNameContainer = new BuildingScopeNameContainer(this.scopeState);
        this.buildingScopeObjectsContainer = new BuildingScopeObjectsContainer(this.scopeState);
    }

    public onBuild(): void {
        this.addControlToContainer(this.buildingScopeNameContainer);
        this.addControlToContainer(this.buildingScopeObjectsContainer);
    }

    public onApplyStyles(): void {
        this.control.width = '100%';
        this.control.height = '160px';
    }
}
