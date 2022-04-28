import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../logic/store/territory/territory-type';
import {selectTerritoryById} from '../../../../logic/store/territory/territory.selectors';

export abstract class TerritoryModel {
    public state: TerritoryState;

    public abstract type: TerritoryType;

    protected constructor(public id: string) {
        this.state = selectTerritoryById(id);
    }
}
