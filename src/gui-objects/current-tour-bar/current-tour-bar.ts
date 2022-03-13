import * as GUI from 'babylonjs-gui';
import {CurrentTourLabel} from './current-tour-label/current-tour-label';
import {GuiContainer} from '../gui-container';
import {NextTourButton} from './next-tour-button/next-tour-button';
import gameState from '../../game-core/game-state/game-state';

export class CurrentTourBar extends GuiContainer {
    public render(): GUI.Control {
        this.container = new GUI.Container('currentTourBar');
        this.container.width = '200px';
        this.container.height = '150px';
        this.container.top = '-60px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.container.addControl(new NextTourButton(gameState.tourManager).render());
        this.container.addControl(new CurrentTourLabel(gameState.gameplayState).render());

        return this.container;
    }
}
