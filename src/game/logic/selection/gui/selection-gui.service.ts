import {AfterInjection} from '../../../../core/life-cycle/after-injection';
import {Inject} from '../../../../core/injector/inject';
import {Selectable} from '../selectable';
import {SelectedModelContainer} from './selected-model/selected-model.container';
import {SelectionService} from '../selection.service';
import {Subscription, filter, tap} from 'rxjs';
import {guiManager} from 'engine';

export class SelectionGuiService implements AfterInjection {
    private selectedModelContainer: SelectedModelContainer;
    private subscription: Subscription;
    
    @Inject(SelectionService) private selectionService: SelectionService;

    public afterInjection(): void {
        this.subscription = this.selectionService.selection$.pipe(
            tap(() => this.selectedModelContainer?.container.dispose()),
            filter((selected$: Selectable) => !!selected$),
            tap(() => this.selectedModelContainer = guiManager().render(new SelectedModelContainer())),
        ).subscribe();
    }
}
