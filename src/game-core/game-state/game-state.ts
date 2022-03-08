import {Resource} from '../resource/resource';
import {Tour} from '../tour/tour';

export class GameState {
    public tour: Tour = new Tour();
    public resource: Resource = new Resource();
}