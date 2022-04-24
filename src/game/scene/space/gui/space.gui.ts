import {CurrentTourContainer} from './current-tour/current-tour.container';
import {Gui} from '../../../../engine/gui-manager/gui';
import {MinimapContainer} from './minimap/minimap.container';
import {SelectedUnitContainer} from './selected-unit/selected-unit.container';
import {ToolbarContainer} from './toolbar/toolbar.container';
import {UnitModel} from '../model/unit/unit.model';
import {filter, tap} from 'rxjs';
import {guiManager} from 'engine';
import {logic} from '../../../game';

export class SpaceGui extends Gui {
    private selectedUnitContainer: SelectedUnitContainer;

    constructor() {
        super();
    }

    public render(): void {
        this.guiManager.render(new ToolbarContainer());
        this.guiManager.render(new CurrentTourContainer());
        this.guiManager.render(new MinimapContainer());

        logic().selectedUnitService.selectedUnit$.pipe(
            tap(() => this.selectedUnitContainer?.container.dispose()),
            filter((unitModel: UnitModel) => !!unitModel),
            tap(() => this.selectedUnitContainer = guiManager().render(new SelectedUnitContainer())),
        ).subscribe();
    }
}
