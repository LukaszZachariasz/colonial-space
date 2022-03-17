import {
    SectorBuildEnum
} from '../../../../../../game-state/gameplay-state/galaxy-state/orbit-state/planet-state/sector-state/sector-build.enum';
import {
    SectorTypeEnum
} from '../../../../../../game-state/gameplay-state/galaxy-state/orbit-state/planet-state/sector-state/sector-type.enum';

export class SectorSnapshot {
    public type: SectorTypeEnum;
    public build: SectorBuildEnum;
}
