import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {AnalysisShipState} from '../../store/unit/analysis-ship/analysis-ship.state';
import {HasTourEffects} from '../tour/tour-effect/has-tour-effects';
import {Observable, Subject, Subscriber} from 'rxjs';
import {PlanetState} from '../../store/territory/planet/planet.state';
import {TerritoryState} from '../../store/territory/territory.state';
import {TourEffectPriorityEnum} from '../tour/tour-effect/tour-effect-priority.enum';
import {UnitState} from '../../store/unit/unit.state';
import {UnitType} from '../../store/unit/unit-type';
import {analysePlanet} from '../../store/territory/territory.slice';
import {logic} from '../../../game';
import {reduceAnalysis, startAnalyse, stopAnalyse} from '../../store/unit/unit.slice';
import {selectSquareByUnitId} from '../../store/map/square/square.selectors';
import {selectTerritoryById} from '../../store/territory/territory.selectors';
import {selectUnitsByType} from '../../store/unit/unit.selectors';
import {store} from '../../store/store';

@HasTourEffects()
export class AnalysisService {
    public analyzedPlanetCompleted$: Subject<string> = new Subject<string>();

    public startAnalysis(analyseShip: UnitState<AnalysisShipState>): void {
        store.dispatch(startAnalyse(analyseShip));
    }

    public stopAnalysis(analyseShip: UnitState<AnalysisShipState>): void {
        store.dispatch(stopAnalyse(analyseShip));
    }

    @AddTourEffect({
        name: 'start analysis processes',
        priority: TourEffectPriorityEnum.START_ANALYSIS_PROCESS
    })
    private startAnalysisProcesses(): Observable<any>{
        return new Observable((subscriber: Subscriber<any>) => {
            selectUnitsByType(UnitType.ANALYSIS).forEach((el: UnitState<AnalysisShipState>) => {
                if (el.data.isAnalysing) {
                    const power = Math.min(el.data.analysisPower, el.data.analysisLeft);
                    store.dispatch(reduceAnalysis(el));
                    if (el.data.analysisLeft === 0) {
                        logic().unitService.removeUnit(el.id);
                    }

                    const square = selectSquareByUnitId(el.id);
                    store.dispatch(analysePlanet({
                        territoryId: square.territoryId,
                        power: power
                    }));

                    const territory: TerritoryState<PlanetState> = selectTerritoryById(square.territoryId);
                    if (territory.data.isAnalysed) {
                        this.stopAnalysis(el);
                        this.analyzedPlanetCompleted$.next(territory.id);
                    }
                }
            });

            subscriber.next();
            subscriber.complete();
        });
    }
}
