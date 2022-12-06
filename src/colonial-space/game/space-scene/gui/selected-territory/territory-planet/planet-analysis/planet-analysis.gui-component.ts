import * as GUI from 'babylonjs-gui';
import {AnalysisService} from '../../../../../game-logic/anaylsis/analysis.service';
import {AnalysisShipState} from '../../../../../game-logic/store/unit/analysis-ship/analysis-ship.state';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {ButtonGuiComponent} from '../../../shared/button/button.gui-component';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {PlanetState} from '../../../../../game-logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {TourService} from '../../../../../game-logic/tour/tour.service';
import {UnitState} from '../../../../../game-logic/store/unit/unit.state';
import {UnitType} from '../../../../../game-logic/store/unit/unit-type';
import {selectUnitByTerritoryId} from '../../../../../game-logic/store/unit/unit.selectors';

@GuiComponent()
export class PlanetAnalysisGuiComponent implements GuiControl<GUI.Container>, OnInit, OnLoad, OnDestroy {
    @Inject(AnalysisService) private analysisService: AnalysisService;
    @Inject(TourService) private tourService: TourService;

    public control: GUI.Container = new GUI.Container('analysis');

    @AppendGuiControl() public startAnalysisButton: ButtonGuiComponent = new ButtonGuiComponent('Start analysis', () => {
        this.analysisService.startAnalysis(this.analysisShip);
        this.setAnalysisStatus();
    });
    @AppendGuiControl() public stopAnalysisButton: ButtonGuiComponent = new ButtonGuiComponent('Stop analysis', () => {
        this.analysisService.stopAnalysis(this.analysisShip);
        this.setAnalysisStatus();
    });

    private analysisShip: UnitState<AnalysisShipState>;
    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameOnInit(): void {
        this.control.height = '200px';
        this.control.width = '100%';
        this.control.paddingTop = '20px';

        this.startAnalysisButton.control.isVisible = false;
        this.stopAnalysisButton.control.isVisible = false;
    }

    public gameOnLoad(): void {
        this.subscription = merge(
            of(EMPTY),
            this.tourService.completeTour$
        ) .pipe(
            tap(() => this.setAnalysisStatus())
        ).subscribe();
    }

    private refreshData(): void {
        this.analysisShip = selectUnitByTerritoryId(this.planetState.id);
    }

    private setAnalysisStatus(): void {
        this.refreshData();

        if (!this.analysisShip || this.analysisShip.type !== UnitType.ANALYSIS) {
            this.setDisableStatus();
        } else if (this.analysisShip.data.isAnalysing) {
            this.showStopAnalysisButton();
        } else {
            this.showStartAnalysisButton();
        }
    }

    private showStartAnalysisButton(): void {
        this.startAnalysisButton.control.isVisible = true;
        this.stopAnalysisButton.control.isVisible = false;
        this.startAnalysisButton.control.isEnabled = true;
    }

    private showStopAnalysisButton(): void {
        this.startAnalysisButton.control.isVisible = false;
        this.stopAnalysisButton.control.isVisible = true;
    }

    private setDisableStatus(): void {
        this.showStartAnalysisButton();
        this.startAnalysisButton.control.isEnabled = false;
    }

    public gameOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
