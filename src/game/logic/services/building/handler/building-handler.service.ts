import {ScoutShipBuildingHandlerService} from './units/scout-ship-building-handler.service';
import {SunlightAmplifierBuildingHandlerService} from './common/sunlight-amplifier-building-handler.service';
import {WaterFilterBuildingHandlerService} from './common/water-filter-building-handler.service';

export class BuildingHandlerService {
    public scoutShipHandlerService: ScoutShipBuildingHandlerService = new ScoutShipBuildingHandlerService();
    
    public sunlightAmplifierHandlerService: SunlightAmplifierBuildingHandlerService = new SunlightAmplifierBuildingHandlerService();
    public waterFilterHandlerService: WaterFilterBuildingHandlerService = new WaterFilterBuildingHandlerService();
}
