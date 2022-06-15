import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {AnalysisShipState} from '../../../../../../logic/store/unit/analysis-ship/analysis-ship.state';
import {ButtonControl} from '../../../shared/button/button.control';
import {Container} from '../../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {OnDestroy} from '../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../../../engine/lifecycle/on-ready/on-ready';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {Subscription, tap} from 'rxjs';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {UnitType} from '../../../../../../logic/store/unit/unit-type';
import {logic} from '../../../../../../game';
import {selectUnitByTerritoryId} from '../../../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class PlanetAnalysisContainer extends Container implements OnReady, OnDestroy {
    public startAnalysisButton: ButtonControl;
    public stopAnalysisButton: ButtonControl;

    private analysisShip: UnitState<AnalysisShipState>;
    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('analysis');
    }

    public onCreate(): void {
        super.onCreate();
        this.control.height = '200px';
        this.control.width = '100%';
        this.control.paddingTop = '20px';

        this.startAnalysisButton = new ButtonControl('Start analysis', () => {
            logic().analysisService.startAnalysis(this.analysisShip);
            this.setAnalysisStatus();
        });
        this.startAnalysisButton.control.isVisible = false;
        this.addControlToContainer(this.startAnalysisButton);

        this.stopAnalysisButton = new ButtonControl('Stop analysis', () => {
            logic().analysisService.stopAnalysis(this.analysisShip);
            this.setAnalysisStatus();
        });
        this.stopAnalysisButton.control.isVisible = false;
        this.addControlToContainer(this.stopAnalysisButton);
    }

    public gameOnReady(): void {
        this.subscription = logic().tourService.completeTour$.pipe(
            tap(() => this.setAnalysisStatus())
        ).subscribe();

        this.setAnalysisStatus();
    }

    public gameOnDestroy(): void {
        this.subscription?.unsubscribe();
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
}
