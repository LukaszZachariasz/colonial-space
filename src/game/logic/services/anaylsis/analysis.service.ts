import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {AnalysisShipState} from '../../store/unit/analysis-ship/analysis-ship.state';
import {HasTourEffects} from '../tour/tour-effect/has-tour-effects';
import {Observable, Subscriber} from 'rxjs';
import {TourEffectPriorityEnum} from '../tour/tour-effect/tour-effect-priority.enum';
import {UnitState} from '../../store/unit/unit.state';
import {UnitType} from '../../store/unit/unit-type';
import {analysePlanet} from '../../store/territory/territory.slice';
import {reduceAnalysis} from '../../store/unit/unit.slice';
import {selectSquareByUnitId} from '../../store/map/square/square.selectors';
import {selectUnitsByType} from '../../store/unit/unit.selectors';
import {store} from '../../store/store';

@HasTourEffects()
export class AnalysisService {
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
                }
            });

            subscriber.next();
            subscriber.complete();
        });
    }
}
