import * as GUI from 'babylonjs-gui';
import {PlanetAnalysisContainer} from './planet-analysis/planet-analysis.container';
import {PlanetAttributesContainer} from './planet-attributes/planet-attributes.container';
import {PlanetBuildingContainer} from './planet-building/planet-building.container';
import {PlanetState} from '../../../../../logic/store/territory/planet/planet.state';
import {StackPanel} from '../../../../../../engine/gui-manager/gui-elements/stack-panel';
import {Subscription, filter, tap} from 'rxjs';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {logic} from '../../../../../game';

export class TerritoryPlanetStackPanel extends StackPanel {
    public planetAttributesContainer: PlanetAttributesContainer;
    public planetAnalysisContainer: PlanetAnalysisContainer;
    public planetBuildingContainer: PlanetBuildingContainer;

    private planetAnalysedSubscription: Subscription;

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

    public onRegisterListeners(): void {
        this.planetAnalysedSubscription = logic().analysisService.analyzedPlanetCompleted$.pipe(
            filter((id: string) => this.planetState.id === id),
            tap(() => this.planetAnalysisContainer.control.dispose())
        ).subscribe();
    }

    public onApplyStyles(): void {
        this.control.width = '100%';
        this.control.height = '65%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    }

    public onDestroy(): void {
        this.planetAnalysedSubscription?.unsubscribe();
    }
}
