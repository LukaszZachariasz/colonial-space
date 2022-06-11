import * as GUI from 'babylonjs-gui';
import {PlanetAnalysisContainer} from './planet-analysis/planet-analysis.container';
import {PlanetAttributesContainer} from './planet-attributes/planet-attributes.container';
import {PlanetBuildingContainer} from './planet-building/planet-building.container';
import {PlanetState} from '../../../../../logic/store/territory/planet/planet.state';
import {StackPanel} from '../../../../../../engine/gui-manager/gui-elements/stack-panel';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

export class TerritoryPlanetStackPanel extends StackPanel {
    public planetAttributesContainer: PlanetAttributesContainer;
    public planetAnalysisContainer: PlanetAnalysisContainer;
    public planetBuildingContainer: PlanetBuildingContainer;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('planetStackPanel');
    }

    public onCreate(): void {
        super.onCreate();
        this.planetAttributesContainer = new PlanetAttributesContainer(this.planetState);

        if (!this.planetState.data.isAnalysed) {
            this.planetAnalysisContainer = new PlanetAnalysisContainer(this.planetState);
        }
        if (this.planetState.data.isColonized) {
            this.planetBuildingContainer = new PlanetBuildingContainer(this.planetState);
        }
    }

    public onBuild(): void {
        this.addControlToStackPanel(this.planetAttributesContainer);

        if (this.planetAnalysisContainer) {
            this.addControlToStackPanel(this.planetAnalysisContainer);
        }
        if (this.planetBuildingContainer) {
            this.addControlToStackPanel(this.planetBuildingContainer);
        }
    }

    public onApplyStyles(): void {
        this.control.width = '100%';
        this.control.height = '65%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    }

    public render(): GUI.Container {
        return this.control;
    }
}
