import {CurrentTourContainer} from './current-tour/current-tour.container';
import {Gui} from '../../../../engine/gui-manager/gui';
import {MinimapContainer} from './minimap/minimap.container';
import {SelectedTerritoryContainer} from './selected-territory/selected-territory.container';
import {SelectedUnitContainer} from './selected-unit/selected-unit.container';
import {ToolbarContainer} from './toolbar/toolbar.container';
import {filter, tap} from 'rxjs';
import {guiManager} from 'engine';
import {logic} from '../../../game';

export class SpaceGui extends Gui {
    private selectedUnitContainer: SelectedUnitContainer;
    private selectedTerritoryContainer: SelectedTerritoryContainer;

    constructor() {
        super();
    }

    public render(): void {
        this.guiManager.render(new ToolbarContainer());
        this.guiManager.render(new CurrentTourContainer());
        this.guiManager.render(new MinimapContainer());

        logic().selectedUnitService.selectedUnitId$.pipe(
            tap(() => this.selectedUnitContainer?.container.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedUnitContainer = guiManager().render(new SelectedUnitContainer())),
        ).subscribe();

        logic().selectedTerritoryService.selectedTerritoryId$.pipe(
            tap(() => this.selectedTerritoryContainer?.container.dispose()),
            filter((id: string) => !!id),
            tap(() => this.selectedTerritoryContainer = guiManager().render(new SelectedTerritoryContainer()))
        ).subscribe();
    }
}
