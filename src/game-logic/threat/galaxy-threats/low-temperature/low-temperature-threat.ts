import {AddTourEffect} from '../../../tour/tour-effect/add-tour-effect';
import {HasTourEffects} from '../../../tour/tour-effect/has-tour-effects';
import {LowTemperatureData} from './low-temperature-data';
import {
    OrbitState
} from '../../../../engine/game-state/gameplay-state/galaxy-state/orbit-state/orbit-state';


import {Threat} from '../../threat';
import {ThreatTypeEnum} from '../../threat-type.enum';
import {TourEffectPriorityEnum} from '../../../tour/tour-effect/tour-effect-priority.enum';
import {gameplayState} from '../../../../core/game-platform';

@HasTourEffects()
export class LowTemperatureThreat extends Threat<LowTemperatureData> {
    public type = ThreatTypeEnum.LOW_TEMPERATURE_GALAXY_THREAT;

    constructor(public data: LowTemperatureData,
                public fromTour: number,
                public toTour: number,
                public visibleFromTour: number,
                public unknownUntilTour: number) {
        super(data, fromTour, toTour, visibleFromTour, unknownUntilTour);
    }

    @AddTourEffect({
        name: 'start',
        priority: TourEffectPriorityEnum.START_THREAT_PRIORITY,
        fromTourFieldName: Threat.fromTourFieldName,
        toTourFieldName: Threat.fromTourFieldName
    })
    public start(): void {
        gameplayState().galaxy.orbits.forEach((orbitState: OrbitState) => {
            orbitState.planet.temperature -= this.data.value;
        });
    }

    @AddTourEffect({
        name: 'stop',
        priority: TourEffectPriorityEnum.STOP_THREAT_PRIORITY,
        fromTourFieldName: Threat.toTourFieldName,
        toTourFieldName: Threat.toTourFieldName
    })
    public stop(): void {
        gameplayState().galaxy.orbits.forEach((orbitState: OrbitState) => {
            orbitState.planet.temperature += this.data.value;
        });
    }
}
