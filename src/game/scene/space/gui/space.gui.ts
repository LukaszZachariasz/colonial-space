import {CurrentTourContainer} from './current-tour/current-tour.container';
import {Gui} from '../../../../engine/gui-manager/gui';
import {MinimapContainer} from './minimap/minimap.container';
import {Selectable} from '../../../logic/services/selection/selectable';
import {SelectedModelContainer} from './selected-model/selected-model.container';
import {ToolbarContainer} from './toolbar/toolbar.container';
import {filter, tap} from 'rxjs';
import {guiManager} from 'engine';
import {logic} from '../../../game';

export class SpaceGui extends Gui {
    private selectedModelContainer: SelectedModelContainer;

    constructor() {
        super();
    }

    public render(): void {
        this.guiManager.render(new ToolbarContainer());
        this.guiManager.render(new CurrentTourContainer());
        this.guiManager.render(new MinimapContainer());

        logic().selectionService.selection$.pipe(
            tap(() => this.selectedModelContainer?.container.dispose()),
            filter((selected: Selectable) => !!selected),
            tap(() => this.selectedModelContainer = guiManager().render(new SelectedModelContainer())),
        ).subscribe();
    }
}
