import * as GUI from 'babylonjs-gui';
import {StackPanel} from '../../../../../../engine/gui-manager/stack-panel';

export class BuildingSectorsStackPanel extends StackPanel {
    public render(): GUI.Control {
        this.stackPanel = new GUI.StackPanel('sectorsStackPanel');
        return this.stackPanel;
    }
}