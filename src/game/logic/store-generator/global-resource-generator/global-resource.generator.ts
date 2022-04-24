import {GlobalResourceState} from '../../store/global-resource/global-resource.state';

export class GlobalResourceGenerator {
    public generate(): GlobalResourceState {
        return {
            science: 0.5,
            awareness: 0,
            fuel: 1
        };
    }
}
