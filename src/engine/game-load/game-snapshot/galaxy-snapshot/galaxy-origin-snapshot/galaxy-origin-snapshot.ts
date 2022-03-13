import {ThreatSnapshot} from './threat-snapshot/threat-snapshot';

export class GalaxyOriginSnapshot {
    public name: string;
    public threats: ThreatSnapshot<any>[] = [];
}
