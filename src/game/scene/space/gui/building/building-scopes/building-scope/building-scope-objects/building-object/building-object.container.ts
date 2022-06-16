import {AfterCreated} from '../../../../../../../../../engine/lifecycle/after-created/after-created';
import {BuildingObjectArtControl} from './building-object-art/building-object-art.control';
import {BuildingObjectNameContainer} from './building-object-name/building-object-name.container';
import {BuildingObjectProductionContainer} from './building-object-production/building-object-production.container';
import {BuildingObjectSelectControl} from './building-object-select/building-object-select.control';
import {
    BuildingObjectState
} from '../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiContainer} from '../../../../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingObjectContainer extends GuiContainer implements AfterCreated {
    public buildingObjectNameContainer: BuildingObjectNameContainer;
    public buildingObjectProductionContainer: BuildingObjectProductionContainer;
    public buildingObjectArtControl: BuildingObjectArtControl;
    public buildingObjectSelectControl: BuildingObjectSelectControl;

    constructor(private object: BuildingObjectState) {
        super('object');
    }

    public gameAfterCreated(): void {
        this.control.width = '200px';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.3)';

        this.buildingObjectNameContainer = new BuildingObjectNameContainer(this.object);
        this.buildingObjectProductionContainer = new BuildingObjectProductionContainer(this.object);
        this.buildingObjectArtControl = new BuildingObjectArtControl(this.object);
        this.buildingObjectSelectControl = new BuildingObjectSelectControl(this.object);

        this.addControlToContainer(this.buildingObjectNameContainer);
        this.addControlToContainer(this.buildingObjectProductionContainer);
        this.addControlToContainer(this.buildingObjectArtControl);
        this.addControlToContainer(this.buildingObjectSelectControl);
    }
}
