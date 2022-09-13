import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetAnalysisGuiElement} from './planet-analysis/planet-analysis.gui-element';
import {PlanetAttributesGuiElement} from './planet-attributes/planet-attributes.gui-element';
import {PlanetBuildingGuiElement} from './planet-building/planet-building.gui-element';
import {PlanetColonizationGuiElement} from './planet-colonization/planet-colonization.gui-element';
import {PlanetState} from '../../../../../logic/store/territory/planet/planet.state';
import {Subscription, filter, tap} from 'rxjs';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {logic} from '../../../../../game';

@GuiElement()
export class TerritoryPlanetGuiElement implements GuiControl<GUI.StackPanel>, AfterCreated, OnReady, OnDestroy {
    public control: GUI.StackPanel = new GUI.StackPanel('planetStackPanel');

    @AppendGuiControl() public planetAttributes: PlanetAttributesGuiElement = new PlanetAttributesGuiElement(this.planetState);
    @AppendGuiControl() public planetAnalysis: PlanetAnalysisGuiElement;
    @AppendGuiControl() public planetColonization: PlanetColonizationGuiElement;
    @AppendGuiControl() public planetBuilding: PlanetBuildingGuiElement;

    private planetAnalysedSubscription: Subscription;
    private planetColonizedSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '65%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        if (!this.planetState.data.isAnalysed) {
            this.planetAnalysis = new PlanetAnalysisGuiElement(this.planetState);
        }
        if (this.planetState.data.isAnalysed && !this.planetState.data.isColonized) {
            this.planetColonization = new PlanetColonizationGuiElement(this.planetState);
        }
        if (this.planetState.data.isColonized) {
            this.planetBuilding = new PlanetBuildingGuiElement(this.planetState);
        }
    }

    public gameOnReady(): void {
        this.planetAnalysedSubscription = logic().analysisService.analyzedPlanetCompleted$.pipe(
            filter((id: string) => this.planetState.id === id),
            tap(() => this.planetAnalysis.control.dispose()),
            tap(() => this.planetColonization = new PlanetColonizationGuiElement(this.planetState)),
            tap(() => this.control.addControl(this.planetColonization.control)) // TODO: change detector
        ).subscribe();

        this.planetColonizedSubscription = logic().colonizationService.colonizedPlanetCompleted$.pipe(
            filter((id: string) => this.planetState.id === id),
            tap(() => this.planetColonization.control.dispose()),
            tap(() => this.planetBuilding = new PlanetBuildingGuiElement(this.planetState)),
            tap(() => this.control.addControl(this.planetBuilding.control)) // TODO: change detector
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.planetAnalysedSubscription?.unsubscribe();
        this.planetColonizedSubscription?.unsubscribe();
    }
}
