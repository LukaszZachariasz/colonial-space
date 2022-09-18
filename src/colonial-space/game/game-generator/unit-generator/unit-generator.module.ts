import {AnalysisShipGeneratorService} from './analysis-ship-generator/analysis-ship-generator.service';
import {ColonialShipGeneratorService} from './colonial-ship-generator/colonial-ship-generator.service';
import {Module} from '@colonial-space/core/module/module.decorator';
import {ScoutShipGeneratorService} from './scout-ship-generator/scout-ship-generator.service';

@Module({
    providers: [
        AnalysisShipGeneratorService,
        ColonialShipGeneratorService,
        ScoutShipGeneratorService
    ]
})
export class UnitGeneratorModule {}
