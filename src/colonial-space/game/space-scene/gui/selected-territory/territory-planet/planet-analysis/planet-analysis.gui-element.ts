import * as GUI from 'babylonjs-gui';
import {AnalysisService} from '../../../../../game-logic/anaylsis/analysis.service';
import {AnalysisShipState} from '../../../../../game-logic/store/unit/analysis-ship/analysis-ship.state';
import {AppendGuiControl} from '../../../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {ButtonGuiElement} from '../../../shared/button/button.gui-element';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiControl} from '../../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {Injector} from '@colonial-space/core/injector/injector';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../game-logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {TourService} from '../../../../../game-logic/tour/tour.service';
import {UnitState} from '../../../../../game-logic/store/unit/unit.state';
import {UnitType} from '../../../../../game-logic/store/unit/unit-type';
import {selectUnitByTerritoryId} from '../../../../../game-logic/store/unit/unit.selectors';

@GuiElement()
export class PlanetAnalysisGuiElement implements GuiControl<GUI.Container>, OnInit, OnReady, OnDestroy {
    public control: GUI.Container = new GUI.Container('analysis');

    @AppendGuiControl() public startAnalysisButton: ButtonGuiElement = new ButtonGuiElement('Start analysis', () => {
        Injector.inject(AnalysisService).startAnalysis(this.analysisShip);
        this.setAnalysisStatus();
    });
    @AppendGuiControl() public stopAnalysisButton: ButtonGuiElement = new ButtonGuiElement('Stop analysis', () => {
        Injector.inject(AnalysisService).stopAnalysis(this.analysisShip);
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

    public gameOnReady(): void {
        this.subscription = merge(
            of(EMPTY),
            Injector.inject(TourService).completeTour$
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
