import {ThreatTypeEnum} from '../../../../../../game-core/threat/threat-type.enum';

export class ThreatSnapshot<T = {}> {
    public name: string;
    public type: ThreatTypeEnum;

    public tourStart: number;
    public tourEnd: number;
    public visibleFromTour: number;
    public unknownUntilTour: number;

    public data: T;
}
