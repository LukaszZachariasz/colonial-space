import {store} from '../store';

export const selectCurrentTour = (): number => store.getState().tour.tour;
