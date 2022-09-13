import {AnalysisShipBuildingHandlerService} from './units/analysis-ship/analysis-ship-building-handler.service';
import {ColonialShipBuildingHandlerService} from './units/colonial-ship/colonial-ship-building-handler.service';
import {ScoutShipBuildingHandlerService} from './units/scout-ship/scout-ship-building-handler.service';
import {SunlightAmplifierBuildingHandlerService} from './common/sunlight-amplifier-building-handler.service';
import {WaterFilterBuildingHandlerService} from './common/water-filter-building-handler.service';

export class BuildingHandlerService {
    public analysisShipBuildingHandlerService: AnalysisShipBuildingHandlerService = new AnalysisShipBuildingHandlerService();
    public colonialShipBuildingHandlerService: ColonialShipBuildingHandlerService = new ColonialShipBuildingHandlerService();
    public scoutShipHandlerService: ScoutShipBuildingHandlerService = new ScoutShipBuildingHandlerService();

    public sunlightAmplifierHandlerService: SunlightAmplifierBuildingHandlerService = new SunlightAmplifierBuildingHandlerService();
    public waterFilterHandlerService: WaterFilterBuildingHandlerService = new WaterFilterBuildingHandlerService();
}
