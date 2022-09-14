import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AnalysisService} from '../../../../../../logic/services/anaylsis/analysis.service';
import {AnalysisShipState} from '../../../../../../logic/store/unit/analysis-ship/analysis-ship.state';
import {AppendGuiControl} from '../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {ButtonGuiElement} from '../../../shared/button/button.gui-element';
import {Container} from 'typedi';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {GuiControl} from '../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {TourService} from '../../../../../../logic/services/tour/tour.service';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {UnitType} from '../../../../../../logic/store/unit/unit-type';
import {selectUnitByTerritoryId} from '../../../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class PlanetAnalysisGuiElement implements GuiControl<GUI.Container>, OnInit, OnReady, OnDestroy {
    public control: GUI.Container = new GUI.Container('analysis');

    @AppendGuiControl() public startAnalysisButton: ButtonGuiElement = new ButtonGuiElement('Start analysis', () => {
        Container.get(AnalysisService).startAnalysis(this.analysisShip);
        this.setAnalysisStatus();
    });
    @AppendGuiControl() public stopAnalysisButton: ButtonGuiElement = new ButtonGuiElement('Stop analysis', () => {
        Container.get(AnalysisService).stopAnalysis(this.analysisShip);
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
            Container.get(TourService).completeTour$
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
