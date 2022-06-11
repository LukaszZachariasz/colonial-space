import {BuildingObjectArtControl} from './building-object-art/building-object-art.control';
import {BuildingObjectNameContainer} from './building-object-name/building-object-name.container';
import {BuildingObjectProductionContainer} from './building-object-production/building-object-production.container';
import {BuildingObjectSelectControl} from './building-object-select/building-object-select.control';
import {BuildingObjectState} from '../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Container} from '../../../../../../../../../engine/gui-manager/gui-elements/container';

export class BuildingObjectContainer extends Container {
    public buildingObjectNameContainer: BuildingObjectNameContainer;
    public buildingObjectProductionContainer: BuildingObjectProductionContainer;
    public buildingObjectArtControl: BuildingObjectArtControl;
    public buildingObjectSelectControl: BuildingObjectSelectControl;

    constructor(private object: BuildingObjectState) {
        super('object');
    }

    public onCreate(): void {
        super.onCreate();
        this.buildingObjectNameContainer = new BuildingObjectNameContainer(this.object);
        this.buildingObjectProductionContainer = new BuildingObjectProductionContainer(this.object);
        this.buildingObjectArtControl = new BuildingObjectArtControl(this.object);
        this.buildingObjectSelectControl = new BuildingObjectSelectControl(this.object);
    }

    public onBuild(): void {
        this.addControlToContainer(this.buildingObjectNameContainer);
        this.addControlToContainer(this.buildingObjectProductionContainer);
        this.addControlToContainer(this.buildingObjectArtControl);
        this.addControlToContainer(this.buildingObjectSelectControl);
    }

    public onApplyStyles(): void {
        this.control.width = '200px';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.3)';
    }
}
