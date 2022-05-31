import * as GUI from 'babylonjs-gui';
import {BuildingScopeNameContainer} from './building-scope-name/building-scope-name.container';
import {BuildingScopeObjectsContainer} from './building-scope-objects/building-scope-objects.container';
import {BuildingScopeState} from '../../../../../../logic/store/building/building-scope/building-scope.state';
import {Container} from '../../../../../../../engine/gui-manager/container';

export class BuildingScopeContainer extends Container {
    constructor(private scopeState: BuildingScopeState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('sector');
        this.container.width = '100%';
        this.container.height = '160px';
        this.container.addControl(new BuildingScopeNameContainer(this.scopeState).render());
        this.container.addControl(new BuildingScopeObjectsContainer(this.scopeState).render());
        return this.container;
    }
}
