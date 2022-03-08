import {PostTourEffect} from './post-tour-effect';

export class Tour {
    public currentTour = 1;

    private postTourEffects: PostTourEffect[] = [];

    public nextTour(): void {
        this.postTourEffects.forEach((effect: PostTourEffect) => effect.effect());
        this.currentTour++;
    }

    public addPostTourEffect(effect: PostTourEffect): void {
        this.postTourEffects.push(effect);
    }
}