import * as GUI from 'babylonjs-gui';
import {ButtonControl} from '../../../shared/button/button.control';
import {Container} from '../../../../../../../engine/gui-manager/container';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';

export class PlanetAnalysisContainer extends Container {
    public buttonControl: ButtonControl;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }
    
    public render(): GUI.Control {
        this.container = new GUI.Container('analysis');
        this.container.height = '200px';
        this.container.width = '100%';
        this.container.paddingTop = '20px';

        this.buttonControl = new ButtonControl('Start analysis', () => {
        });

        this.container.addControl(this.buttonControl.render());

        return this.container;
    }
}
