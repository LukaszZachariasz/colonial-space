import * as GUI from 'babylonjs-gui';
import {BuildingScopeState} from '../../../../../../../logic/store/building/building-scope/building-scope.state';
import {Container} from '../../../../../../../../engine/gui-manager/container';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';

export class PlanetFacilitiesContainer extends Container {
    public name: TextControl = new TextControl('Facilities', {uppercase: true});

    constructor(private buildingScopeState: BuildingScopeState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('planetFacilities');
        this.container.background = 'rgba(255, 255, 255, 0.1)';
        this.container.left = '5%';
        this.container.horizontalAlignment = GUI.Container.HORIZONTAL_ALIGNMENT_LEFT;
        this.container.width = '40%';
        this.container.height = '100%';

        this.container.addControl(this.name.render());
        this.name.textBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.container.onPointerDownObservable.add(() => {
            logic().selectedBuildingScopeService.select(this.buildingScopeState.id);
        });

        return this.container;
    }
}
