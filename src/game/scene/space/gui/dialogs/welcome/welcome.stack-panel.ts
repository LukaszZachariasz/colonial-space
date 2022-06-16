import * as GUI from 'babylonjs-gui';
import {AppendControl} from '../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {ButtonControl} from '../../shared/button/button.control';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextControl} from '../../shared/text/text.control';
import {logic} from '../../../../../game';

// TODO: create something more generic?
@GuiElement()
export class WelcomeStackPanel implements GuiControl<GUI.StackPanel>, AfterCreated {
    public control: GUI.StackPanel = new GUI.StackPanel('welcome');

    @AppendControl() public title: TextControl = new TextControl('Welcome', {uppercase: true});
    @AppendControl() public body: TextControl = new TextControl('Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium amet architecto assumenda, at consequuntur culpa debitis dolore, eaque enim et illo in incidunt ipsum magnam minima natus odio officiis praesentium quae, quibusdam quo quod sapiente temporibus vero. Blanditiis debitis error ex excepturi in incidunt maxime necessitatibus quo quod suscipit.');
    @AppendControl() public close: ButtonControl = new ButtonControl('Ok', () => {
        logic().dialogService.close$.next();
    });

    public gameAfterCreated(): void {
        this.title.control.setPaddingInPixels(10, 10, 10, 10);

        this.body.control.setPaddingInPixels(10, 10, 10, 10);
        this.body.control.textWrapping = true;

        this.close.control.setPaddingInPixels(10, 10, 10, 10);
    }
}
