import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {AnalysisShipState} from '../store/unit/analysis-ship/analysis-ship.state';
import {HasTourEffects} from '../tour/tour-effect/has-tour-effects';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Observable, Subject, Subscriber} from 'rxjs';
import {PlanetState} from '../store/territory/planet/planet.state';
import {TerritoryState} from '../store/territory/territory.state';
import {TourEffectPriorityEnum} from '../tour/tour-effect/tour-effect-priority.enum';
import {UnitService} from '../unit/unit.service';
import {UnitState} from '../store/unit/unit.state';
import {UnitType} from '../store/unit/unit-type';
import {analysePlanet} from '../store/territory/territory.slice';
import {reduceAnalysis, startAnalyse, stopAnalyse} from '../store/unit/unit.slice';
import {selectSquareByUnitId} from '../store/map/square/square.selectors';
import {selectTerritoryById} from '../store/territory/territory.selectors';
import {selectUnitById, selectUnitsByType} from '../store/unit/unit.selectors';
import {store} from '../store/store';

@HasTourEffects()
@Injectable()
export class AnalysisService {
    @Inject(UnitService) private unitService: UnitService;
    
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
                    el = selectUnitById(el.id);

                    if (el.data.analysisLeft === 0) {
                        this.unitService.removeUnit(el.id);
                    }
                }
            });

            subscriber.next();
            subscriber.complete();
        });
    }
}
