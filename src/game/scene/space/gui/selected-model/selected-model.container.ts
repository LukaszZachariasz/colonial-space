import * as GUI from 'babylonjs-gui';
import {Container} from '../container';
import {Selectable} from '../../../../logic/select-model-manager/selectable';
import {SelectedModelArtControl} from './selected-model-art/selected-model-art.control';
import {SelectedModelBackgroundContainer} from './selected-model-background/selected-model-background.container';
import {filter, tap} from 'rxjs';
import {logic} from '../../../../game';

export class SelectedModelContainer extends Container {
    public render(): GUI.Control {
        this.container = new GUI.Container('selectedModelContainer');
        this.container.width = '30%';
        this.container.height = '40%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.container.addControl(new SelectedModelBackgroundContainer().render());

        logic().selectModelManager.selected$.pipe(
            tap((model: Selectable) => this.container.isVisible = !!model),
            filter(() => this.container.isVisible),
            tap(() => this.container.addControl(new SelectedModelArtControl().render()))
        ).subscribe();

        return this.container;
    }
}
