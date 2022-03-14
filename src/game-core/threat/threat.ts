import {AddTourEffect} from '../tour/tour-effect/add-tour-effect';
import {ThreatTypeEnum} from './threat-type.enum';
import {gameplayState} from '../../core/game-platform';

export abstract class Threat<T = {}> {
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
        priority: 9999,
        fromTourFieldName: 'toTour',
        toTourFieldName: 'toTour'
    })
    public remove(): void {
        gameplayState().galaxy.galaxyOrigin.threats = gameplayState().galaxy.galaxyOrigin.threats.filter((el: Threat) => el !== this);
    }
}
