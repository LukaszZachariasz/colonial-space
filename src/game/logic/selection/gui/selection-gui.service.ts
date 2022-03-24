import {BehaviorSubject, Subscription, filter, tap} from 'rxjs';
import {Selectable} from '../selectable';
import {SelectedModelContainer} from './selected-model/selected-model.container';
import {guiManager} from 'engine';

export class SelectionGuiService {
    private selectedModelContainer: SelectedModelContainer;
    private subscription: Subscription;
    
    public listen(selection$: BehaviorSubject<Selectable>): void {
        this.subscription = selection$.pipe(
            tap(() => this.selectedModelContainer?.container.dispose()),
            filter((selected$: Selectable) => !!selected$),
            tap(() => this.selectedModelContainer = guiManager().render(new SelectedModelContainer())),
        ).subscribe();
    }
}