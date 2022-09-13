import {Draft, PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TourState} from './tour.state';

export const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        tour: undefined
    } as TourState,
    reducers: {
        setTour: (state: Draft<TourState>, action: PayloadAction<TourState>) => {
            state.tour = action.payload.tour;
        },
        nextTour: (state: Draft<TourState>) => {
            state.tour++;
        }
    }
});

export const {setTour, nextTour} = tourSlice.actions;
