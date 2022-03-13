import * as BABYLON from 'babylonjs';
import {SectorState} from './sector-state/sector-state';

export class PlanetState {
    public name: string;
    public temperature: number;
    public size: number;
    public textureUrl: string;
    public position: BABYLON.Vector3;
    public sectors: SectorState[] = [];
}
