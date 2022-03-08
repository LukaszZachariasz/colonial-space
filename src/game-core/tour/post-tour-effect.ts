import {TourEffect} from './tour-effect';

export class PostTourEffect {
    constructor(public priority: number,
                public effect: TourEffect) {
    }
}