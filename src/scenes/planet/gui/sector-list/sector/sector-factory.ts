import {EmptySectorGuiObject} from './empty-sector/empty-sector.gui-object';
import {GuiObject} from '../../../../../gui-objects/gui-object';
import {IndustrialSectorGuiObject} from './industrial-sector/industrial-sector.gui-object';
import {ScienceSectorGuiObject} from './science-sector/science-sector.gui-object';
import {
    SectorTypeEnum
} from '../../../../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/sector-state/sector-type.enum';
import {WaterSectorGuiObject} from './water-sector/water-sector.gui-object';

export class SectorFactory {
    public create(type: SectorTypeEnum): GuiObject {
        switch (type) {
            case SectorTypeEnum.EMPTY:
                return new EmptySectorGuiObject();
            case SectorTypeEnum.WATER:
                return new WaterSectorGuiObject();
            case SectorTypeEnum.SCIENCE:
                return new ScienceSectorGuiObject();
            case SectorTypeEnum.INDUSTRIAL:
                return new IndustrialSectorGuiObject();
        }
    }
}