import * as GUI from 'babylonjs-gui';
import {AnalysisShipState} from '../../../../../../logic/store/unit/analysis-ship/analysis-ship.state';
import {ButtonControl} from '../../../shared/button/button.control';
import {Container} from '../../../../../../../engine/gui-manager/container';
import {EMPTY, Subscription, merge, of, tap} from 'rxjs';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {UnitType} from '../../../../../../logic/store/unit/unit-type';
import {logic} from '../../../../../../game';
import {selectUnitByTerritoryId} from '../../../../../../logic/store/unit/unit.selectors';

export class PlanetAnalysisContainer extends Container {
    public startAnalysisButton: ButtonControl = new ButtonControl('Start analysis', () => {

        this.setAnalysisStatus();
    });
    public stopAnalysisButton: ButtonControl = new ButtonControl('Stop analysis', () => {

        this.setAnalysisStatus();
    });

    private analysisShip: UnitState<AnalysisShipState>;
    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }
    
    public render(): GUI.Control {
        this.container = new GUI.Container('analysis');
        this.container.height = '200px';
        this.container.width = '100%';
        this.container.paddingTop = '20px';

        this.container.addControl(this.startAnalysisButton.render());
        this.container.addControl(this.stopAnalysisButton.render());
        this.startAnalysisButton.button.isVisible = false;
        this.stopAnalysisButton.button.isVisible = false;

        this.subscription = merge(
            of(EMPTY),
            logic().tourService.completeTour$
        ).pipe(
            tap(() => this.analysisShip = selectUnitByTerritoryId(this.planetState.id)),
            tap(() => this.setAnalysisStatus())
        ).subscribe();

        this.container.onDisposeObservable.add(() => {
            this.subscription?.unsubscribe();
        });

        return this.container;
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
        this.startAnalysisButton.button.isVisible = true;
        this.stopAnalysisButton.button.isVisible = false;
        this.startAnalysisButton.button.isEnabled = true;
    }
    
    private showStopAnalysisButton(): void {
        this.startAnalysisButton.button.isVisible = false;
        this.stopAnalysisButton.button.isVisible = true;
    }
    
    private setDisableStatus(): void {
        this.showStartAnalysisButton();
        this.startAnalysisButton.button.isEnabled = false;
    }
}
