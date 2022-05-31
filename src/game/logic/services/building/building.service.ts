import {Subject} from 'rxjs';
import {selectBuilding} from '../../store/building/building.slice';
import {selectBuildingByBuildingObjectId} from '../../store/building/building.selector';
import {store} from '../../store/store';

export class BuildingService {
    public startBuildingObject$: Subject<string> = new Subject<string>();
    
    public startBuilding(buildingObjectId: string): void {
        store.dispatch(selectBuilding({
            buildingId: selectBuildingByBuildingObjectId(buildingObjectId).id,
            objectId: buildingObjectId
        }));
        
        this.startBuildingObject$.next(buildingObjectId);
    }

    public stopBuilding(buildingObjectId: string): void {
        store.dispatch(selectBuilding({
            buildingId: selectBuildingByBuildingObjectId(buildingObjectId).id,
            objectId: null
        }));

        this.startBuildingObject$.next(null);
    }
}