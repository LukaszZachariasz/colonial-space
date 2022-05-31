import * as GUI from 'babylonjs-gui';
import {BuildingScopeSectorState} from '../../../../../logic/store/building/building-scope/building-sector/building-scope-sector.state';
import {BuildingScopeState} from '../../../../../logic/store/building/building-scope/building-scope.state';
import {SectorContainer} from './sector/sector.container';
import {StackPanel} from '../../../../../../engine/gui-manager/stack-panel';

export class BuildingSectorsStackPanel extends StackPanel {
    constructor(private buildingScopeState: BuildingScopeState) {
        super();
    }

    public render(): GUI.Control {
        this.stackPanel = new GUI.StackPanel('sectorsStackPanel');
        this.buildingScopeState.sectors.forEach((sector: BuildingScopeSectorState) => {
            this.stackPanel.addControl(new SectorContainer(sector).render());
        });
        return this.stackPanel;
    }
}
