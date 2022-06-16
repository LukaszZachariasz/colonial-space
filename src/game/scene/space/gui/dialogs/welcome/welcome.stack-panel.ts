import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {ButtonControl} from '../../shared/button/button.control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {StackPanel} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/stack-panel/stack-panel';
import {TextControl} from '../../shared/text/text.control';
import {logic} from '../../../../../game';

// TODO: create something more generic?
@GuiElement()
export class WelcomeStackPanel extends StackPanel implements AfterCreated {
    public title: TextControl;
    public body: TextControl;
    public close: ButtonControl;

    constructor() {
        super('welcome');
    }

    public gameAfterCreated(): void {
        this.title = new TextControl('Welcome', {uppercase: true});
        this.title.control.setPaddingInPixels(10, 10, 10, 10);
        this.addControlToStackPanel(this.title);

        this.body = new TextControl('Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium amet architecto assumenda, at consequuntur culpa debitis dolore, eaque enim et illo in incidunt ipsum magnam minima natus odio officiis praesentium quae, quibusdam quo quod sapiente temporibus vero. Blanditiis debitis error ex excepturi in incidunt maxime necessitatibus quo quod suscipit.');
        this.body.control.setPaddingInPixels(10, 10, 10, 10);
        this.body.control.textWrapping = true;
        this.addControlToStackPanel(this.body);

        this.close = new ButtonControl('Ok', () => {
            logic().dialogService.close$.next();
        });
        this.close.control.setPaddingInPixels(10, 10, 10, 10);
        this.addControlToStackPanel(this.close);
    }
}
