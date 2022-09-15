import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {ButtonGuiElement} from '../../shared/button/button.gui-element';
import {DialogService} from '../../../../game-logic/dialog/dialog.service';
import {GuiControl} from '../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../core/gui-manager/gui-elements/gui-element';
import {Injector} from '@colonial-space/core/injector/injector';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextGuiElement} from '../../shared/text/text.gui-element';

// TODO: create something more generic?
@GuiElement()
export class WelcomeGuiElement implements GuiControl<GUI.StackPanel>, OnInit {
    public control: GUI.StackPanel = new GUI.StackPanel('welcome');

    @AppendGuiControl() public title: TextGuiElement = new TextGuiElement('Welcome', {uppercase: true});
    @AppendGuiControl() public body: TextGuiElement = new TextGuiElement('Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium amet architecto assumenda, at consequuntur culpa debitis dolore, eaque enim et illo in incidunt ipsum magnam minima natus odio officiis praesentium quae, quibusdam quo quod sapiente temporibus vero. Blanditiis debitis error ex excepturi in incidunt maxime necessitatibus quo quod suscipit.');
    @AppendGuiControl() public close: ButtonGuiElement = new ButtonGuiElement('Ok', () => {
        Injector.inject(DialogService).close$.next();
    });

    public gameOnInit(): void {
        this.title.control.setPaddingInPixels(10, 10, 10, 10);

        this.body.control.setPaddingInPixels(10, 10, 10, 10);
        this.body.control.textWrapping = true;

        this.close.control.setPaddingInPixels(10, 10, 10, 10);
    }
}