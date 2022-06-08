import * as GUI from 'babylonjs-gui';
import {PlanetAnalysisContainer} from './planet-analysis/planet-analysis.container';
import {PlanetAttributesContainer} from './planet-attributes/planet-attributes.container';
import {PlanetBuildingContainer} from './planet-building/planet-building.container';
import {PlanetState} from '../../../../../logic/store/territory/planet/planet.state';
import {StackPanel} from '../../../../../../engine/gui-manager/stack-panel';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

export class TerritoryPlanetStackPanel extends StackPanel {
    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }

    public render(): GUI.Container {
        this.stackPanel = new GUI.StackPanel('planetStackPanel');
        this.stackPanel.width = '100%';
        this.stackPanel.height = '65%';
        this.stackPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.stackPanel.addControl(new PlanetAttributesContainer(this.planetState).render());

        if (!this.planetState.data.isAnalysed) {
            this.stackPanel.addControl(new PlanetAnalysisContainer(this.planetState).render());
        }

        if (this.planetState.data.isColonized) {
            this.stackPanel.addControl(new PlanetBuildingContainer(this.planetState).render());
        }

        return this.stackPanel;
    }
}
