import {GlobalResourceState} from '../../../store/global-resource/global-resource.state';

export class GlobalResourceGenerator {
    public generate(): GlobalResourceState {
        return {
            scienceIncome: 0.5,
            awarenessIncome: 0,
            fuelIncome: 1
        };
    }
}
