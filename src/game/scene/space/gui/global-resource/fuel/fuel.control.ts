import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {sceneManager} from 'engine';
import {selectFuel} from '../../../../../logic/store/global-resource/global-resource.selectors';

export class FuelControl extends Control {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('fuel', 'Fuel: 0');
        this.text.left = '30%';
        this.text.top = '10px';
        this.text.resizeToFit = true;
        this.text.color = 'white';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        sceneManager().currentBabylonScene.registerBeforeRender(() => {
            this.text.text = 'Fuel: ' + selectFuel();
        });
        
        return this.text;
    }
}
