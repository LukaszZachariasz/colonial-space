import {AnalysisShipState} from '../../../../../../logic/store/unit/analysis-ship/analysis-ship.state';
import {ButtonControl} from '../../../shared/button/button.control';
import {Container} from '../../../../../../../engine/gui-manager/gui-elements/container';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {UnitType} from '../../../../../../logic/store/unit/unit-type';
import {logic} from '../../../../../../game';
import {selectUnitByTerritoryId} from '../../../../../../logic/store/unit/unit.selectors';

export class PlanetAnalysisContainer extends Container {
    public startAnalysisButton: ButtonControl;
    public stopAnalysisButton: ButtonControl;

    private analysisShip: UnitState<AnalysisShipState>;
    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('analysis');
    }

    public onCreate(): void {
        super.onCreate();

        this.startAnalysisButton = new ButtonControl('Start analysis', () => {
            this.setAnalysisStatus();
        });
        this.stopAnalysisButton = new ButtonControl('Stop analysis', () => {
            this.setAnalysisStatus();
        });
    }

    public onBuild(): void {
        this.addControlToContainer(this.startAnalysisButton);
        this.addControlToContainer(this.stopAnalysisButton);
    }

    public onRegisterListeners(): void {
        this.subscription = merge(
            of(EMPTY),
            logic().tourService.completeTour$
        ).pipe(
            tap(() => this.analysisShip = selectUnitByTerritoryId(this.planetState.id)),
            tap(() => this.setAnalysisStatus())
        ).subscribe();
    }

    public onApplyStyles(): void {
        this.control.height = '200px';
        this.control.width = '100%';
        this.control.paddingTop = '20px';

        this.startAnalysisButton.control.isVisible = false;
        this.stopAnalysisButton.control.isVisible = false;
    }

    public onDestroy(): void {
        this.subscription?.unsubscribe();
    }

    private setAnalysisStatus(): void {
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
