import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetAnalysisContainer} from './planet-analysis/planet-analysis.container';
import {PlanetAttributesContainer} from './planet-attributes/planet-attributes.container';
import {PlanetBuildingContainer} from './planet-building/planet-building.container';
import {PlanetState} from '../../../../../logic/store/territory/planet/planet.state';
import {StackPanel} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/stack-panel/stack-panel';
import {Subscription, filter, tap} from 'rxjs';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {logic} from '../../../../../game';

@GuiElement()
export class TerritoryPlanetStackPanel extends StackPanel implements AfterCreated, OnReady, OnDestroy {
    public planetAttributesContainer: PlanetAttributesContainer;
    public planetAnalysisContainer: PlanetAnalysisContainer;
    public planetBuildingContainer: PlanetBuildingContainer;

    private planetAnalysedSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('planetStackPanel');
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '65%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.planetAttributesContainer = new PlanetAttributesContainer(this.planetState);
        this.addControlToStackPanel(this.planetAttributesContainer);

        if (!this.planetState.data.isAnalysed) {
            this.planetAnalysisContainer = new PlanetAnalysisContainer(this.planetState);
            this.addControlToStackPanel(this.planetAnalysisContainer);
        }
        if (this.planetState.data.isColonized) {
            this.planetBuildingContainer = new PlanetBuildingContainer(this.planetState);
            this.addControlToStackPanel(this.planetBuildingContainer);
        }
    }

    public gameOnReady(): void {
        this.planetAnalysedSubscription = logic().analysisService.analyzedPlanetCompleted$.pipe(
            filter((id: string) => this.planetState.id === id),
            tap(() => this.planetAnalysisContainer.control.dispose())
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.planetAnalysedSubscription?.unsubscribe();
    }
}
