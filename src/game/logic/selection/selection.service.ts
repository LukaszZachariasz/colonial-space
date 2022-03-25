import {BehaviorSubject} from 'rxjs';
import {Selectable} from './selectable';
import {SelectionGuiService} from './gui/selection-gui.service';

export class SelectionService {
    public selection$: BehaviorSubject<Selectable> = new BehaviorSubject<Selectable>(null);
    private selectionGuiService: SelectionGuiService = new SelectionGuiService();

    constructor() {
        this.selectionGuiService.listen(this.selection$);
    }

    public select(model: Selectable): void {
        this.selection$.next(model);
    }

    public deselect(): void {
        this.selection$.next(null);
    }
}
