import {ButtonControl} from '../../shared/button/button.control';
import {StackPanel} from '../../../../../../engine/gui-manager/gui-elements/stack-panel';
import {TextControl} from '../../shared/text/text.control';
import {logic} from '../../../../../game';

// TODO: create something more generic?
export class WelcomeStackPanel extends StackPanel {
    public title: TextControl;
    public body: TextControl;
    public close: ButtonControl;

    constructor() {
        super('welcome');
    }

    public onCreate(): void {
        super.onCreate();
        this.title = new TextControl('Welcome', {uppercase: true});
        this.body = new TextControl('Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium amet architecto assumenda, at consequuntur culpa debitis dolore, eaque enim et illo in incidunt ipsum magnam minima natus odio officiis praesentium quae, quibusdam quo quod sapiente temporibus vero. Blanditiis debitis error ex excepturi in incidunt maxime necessitatibus quo quod suscipit.');
        this.close = new ButtonControl('Ok', () => {
            logic().dialogService.close$.next();
        });
    }

    public onBuild(): void {
        this.addControlToStackPanel(this.title);
        this.addControlToStackPanel(this.body);
        this.addControlToStackPanel(this.close);
    }

    public onApplyStyles(): void {
        this.title.control.setPaddingInPixels(10, 10, 10, 10);

        this.body.control.setPaddingInPixels(10, 10, 10, 10);
        this.body.control.textWrapping = true;

        this.close.control.setPaddingInPixels(10, 10, 10, 10);
    }
}
