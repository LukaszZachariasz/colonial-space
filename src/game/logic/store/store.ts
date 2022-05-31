import {CurriedGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {buildingSlice} from './building/building.slice';
import {configureStore} from '@reduxjs/toolkit';
import {mapSlice} from './map/map.slice';
import {playerSlice} from './player/player.slice';
import {territorySlice} from './territory/territory.slice';
import {tourSlice} from './tour/tour.slice';
import {unitSlice} from './unit/unit.slice';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        map: mapSlice.reducer,
        player: playerSlice.reducer,
        tour: tourSlice.reducer,
        territory: territorySlice.reducer,
        building: buildingSlice.reducer,
        unit: unitSlice.reducer
    },
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

