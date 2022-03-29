import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/control';
import {sceneManager} from 'engine';
import {selectScience} from '../../../../../logic/store/global-resource/global-resource.selectors';

export class ScienceControl extends Control {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('science', 'Science: 0');
        this.text.left = '50%';
        this.text.top = '10px';
        this.text.resizeToFit = true;
        this.text.color = 'white';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        sceneManager().currentBabylonScene.registerBeforeRender(() => {
            this.text.text = 'Science: ' + selectScience();
        });
        
        return this.text;
    }
}
