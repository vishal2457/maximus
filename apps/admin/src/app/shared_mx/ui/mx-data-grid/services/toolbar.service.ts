import { Injectable, QueryList } from "@angular/core";
import { BehaviorSubject, shareReplay } from "rxjs";
import { GbGridToolbarComponent } from "../components/toolbar/mx-toolbar";

@Injectable()
export class ToolbarService {
  private _options =
    new BehaviorSubject<QueryList<GbGridToolbarComponent> | null>(null);

  options$ = this._options.asObservable().pipe(shareReplay());

  updateToolbar(incoming: QueryList<GbGridToolbarComponent>) {
    this._options.next(incoming);
  }
}
