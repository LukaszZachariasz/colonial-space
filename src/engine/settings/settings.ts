import {MouseSettings} from './mouse-settings/mouse-settings';

export class Settings {
    public mouseSettings = new MouseSettings();
}

const instance = new Settings();
export default instance;