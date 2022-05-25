import * as GUI from 'babylonjs-gui';
import {ButtonControl} from '../../shared/button/button.control';
import {StackPanel} from '../../../../../../engine/gui-manager/stack-panel';
import {TextControl} from '../../shared/text/text.control';
import {logic} from '../../../../../game';

// TODO: create something more generic?
export class WelcomeStackPanel extends StackPanel {
    public title: TextControl;
    public body: TextControl;
    public close: ButtonControl;

    public render(): GUI.Control {
        this.stackPanel = new GUI.StackPanel('welcome');

        this.title = new TextControl('Welcome', {uppercase: true});
        this.title.textBlock.setPaddingInPixels(10, 10, 10, 10);
        this.stackPanel.addControl(this.title.render());

        this.body = new TextControl('Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium amet architecto assumenda, at consequuntur culpa debitis dolore, eaque enim et illo in incidunt ipsum magnam minima natus odio officiis praesentium quae, quibusdam quo quod sapiente temporibus vero. Blanditiis debitis error ex excepturi in incidunt maxime necessitatibus quo quod suscipit.');
        this.body.textBlock.setPaddingInPixels(10, 10, 10, 10);
        this.body.textBlock.textWrapping = true;
        this.stackPanel.addControl(this.body.render());
        
        this.close = new ButtonControl('Ok', () => {
            logic().dialogService.close$.next();
        });
        this.close.button.setPaddingInPixels(10, 10, 10, 10);
        this.stackPanel.addControl(this.close.render());

        return this.stackPanel;
    }
}
