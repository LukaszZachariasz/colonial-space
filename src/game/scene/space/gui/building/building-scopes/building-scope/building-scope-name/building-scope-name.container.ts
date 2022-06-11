import * as GUI from 'babylonjs-gui';
import {BuildingScopeState} from '../../../../../../../logic/store/building/building-scope/building-scope.state';
import {Container} from '../../../../../../../../engine/gui-manager/container';
import {TextControl} from '../../../../shared/text/text.control';

export class BuildingScopeNameContainer extends Container {
    public text: TextControl = new TextControl(this.scopeState.name);

    constructor(private scopeState: BuildingScopeState) {
        super('sectorNameContainer');
    }

    public onCreate(): void {
        super.onCreate();
        this.text = new TextControl(this.scopeState.name);
    }

    public onBuild(): void {
        this.addControlToContainer(this.text);
    }

    public onApplyStyles(): void {
        this.control.width = '5%';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.4)';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.text.control.rotation = -Math.PI / 2;
    }
}
