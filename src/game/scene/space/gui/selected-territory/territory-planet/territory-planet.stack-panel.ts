import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetAnalysisContainer} from './planet-analysis/planet-analysis.container';
import {PlanetAttributesContainer} from './planet-attributes/planet-attributes.container';
import {PlanetBuildingContainer} from './planet-building/planet-building.container';
import {PlanetState} from '../../../../../logic/store/territory/planet/planet.state';
import {Subscription, filter, tap} from 'rxjs';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {logic} from '../../../../../game';

@GuiElement()
export class TerritoryPlanetStackPanel implements GuiControl<GUI.StackPanel>, AfterCreated, OnReady, OnDestroy {
    public control: GUI.StackPanel = new GUI.StackPanel('planetStackPanel');

    @AppendControl() public planetAttributesContainer: PlanetAttributesContainer = new PlanetAttributesContainer(this.planetState);
    @AppendControl() public planetAnalysisContainer: PlanetAnalysisContainer;
    @AppendControl() public planetBuildingContainer: PlanetBuildingContainer;

    private planetAnalysedSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '65%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        if (!this.planetState.data.isAnalysed) {
            this.planetAnalysisContainer = new PlanetAnalysisContainer(this.planetState);
        }
        if (this.planetState.data.isColonized) {
            this.planetBuildingContainer = new PlanetBuildingContainer(this.planetState);
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
