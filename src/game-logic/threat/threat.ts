import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {ThreatTypeEnum} from './threat-type.enum';
import {TourEffectPriorityEnum} from '../tour/tour-effect/tour-effect-priority.enum';
import {gameplayState} from '../../core/game-platform';

export abstract class Threat<T = {}> {
    public static fromTourFieldName = 'fromTour';
    public static toTourFieldName = 'toTour';

    public name: string;
    public type: ThreatTypeEnum;

    public abstract start(): void;

    public abstract stop(): void;

    protected constructor(public data: T,
                          public fromTour: number,
                          public toTour: number,
                          public visibleFromTour: number,
                          public unknownUntilTour: number) {
    }

    @AddTourEffect({
        name: 'remove',
        priority: TourEffectPriorityEnum.REMOVE_THREAT_PRIORITY,
        fromTourFieldName: Threat.toTourFieldName,
        toTourFieldName: Threat.toTourFieldName
    })
    public remove(): void {
        gameplayState().galaxy.galaxyOrigin.threats = gameplayState().galaxy.galaxyOrigin.threats.filter((el: Threat) => el !== this);
    }
}
