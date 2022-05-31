import {ScoutShipHandlerService} from './units/scout-ship-handler.service';
import {SunlightAmplifierHandlerService} from './common/sunlight-amplifier-handler.service';
import {WaterFilterHandlerService} from './common/water-filter-handler.service';

export class BuildingHandlerService {
    public scoutShipHandlerService: ScoutShipHandlerService = new ScoutShipHandlerService();
    
    public sunlightAmplifierHandlerService: SunlightAmplifierHandlerService = new SunlightAmplifierHandlerService();
    public waterFilterHandlerService: WaterFilterHandlerService = new WaterFilterHandlerService();
}
