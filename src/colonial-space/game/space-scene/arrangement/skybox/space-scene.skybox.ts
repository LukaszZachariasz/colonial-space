import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/module/scene/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SpaceSkyboxModel} from '../../../../shared/skybox/space-skybox.model';
import {selectMapSkybox} from '../../../game-logic/store/map/tour.selectors';

export class SpaceSceneSkybox implements OnInit {
    @Inject(ModelManager) private modelManager: ModelManager;

    public gameOnInit(): void {
        this.modelManager.create(SpaceSkyboxModel, selectMapSkybox());
    }
}
