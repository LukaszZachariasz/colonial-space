import {Resource} from '../resource/resource';
import {TourManager} from '../tour/tour-manager';

export class GameState {
    public tour: TourManager = new TourManager();
    public resource: Resource = new Resource();
}