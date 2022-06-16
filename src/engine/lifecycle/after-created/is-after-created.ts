import {AfterCreated} from './after-created';

export function isAfterCreated(object: any): object is AfterCreated {
    return 'gameAfterCreated' in object;
}
