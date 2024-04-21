import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  inject,
} from '@angular/core';
import { SubSink } from '@nx-gb/subsink';
import { ApiService } from '../services/api.service';
import { GbActionComponent } from '../ui/mx-data-grid/components/base-table/action';
import { GridColumnsComponent } from '../ui/mx-data-grid/components/base-table/columns';
import { MxGridToolbarComponent } from '../ui/mx-data-grid/components/toolbar/mx-toolbar';
import { MxDataGridModule } from '../ui/mx-data-grid/data-grid.module';
import { MxNotification } from '../ui/notification/notification.service';
import { MxFilterPillsComponent } from './filters/components/filter-pills';
import { GbGridFilterComponent } from './filters/components/grid-filter';
import { FilterService } from './filters/filter.service';
import { FilterData } from './filters/types';
import { safeStringify } from '../utils/safe-json';

@Component({
  selector: 'gb-grid-shell',
  standalone: true,
  imports: [
    MxDataGridModule,
    CommonModule,
    GridColumnsComponent,
    GbActionComponent,
    MxGridToolbarComponent,
    MxFilterPillsComponent,
  ],
  template: ` <mx-data-grid
    [data]="data"
    [loading]="loading"
    [collectionSize]="collectionSize"
    [gridTitle]="gridTitle"
    (sortChange)="handleSort($event)"
  >
    <!-- Toolbar -->
    <gb-toolbar
      *ngFor="let tool of toolbar"
      [icon]="tool.icon"
      [name]="tool.name"
      (handleClick)="tool.handleClick.emit($event)"
    />
    <ng-container *ngIf="filters?.length">
      <gb-toolbar
        icon="filter_alt"
        name="Filter"
        (handleClick)="openFilters()"
      />
      <!-- TODO : add a way to reset all grid options. -->
      <gb-toolbar
        icon="restart_alt"
        name="Reset grid"
        (handleClick)="filterService.clearFilterData()"
      />
    </ng-container>
    <!-- Toolbar -->

    <!-- Action -->
    <ng-container *ngIf="actions">
      <gb-action
        *ngFor="let action of actions"
        [icon]="action.icon"
        [tooltip]="action.tooltip"
        (handleClick)="action.handleClick && action.handleClick.emit($event)"
        [action]="action._action"
      />
    </ng-container>
    <!-- Action -->

    <!-- Columns -->
    <mx-column
      *ngFor="let column of columns"
      [title]="column.title"
      [field]="column.field"
      [sortable]="column.sortable"
      [visible]="column.visible"
      [alignment]="column.alignment"
    >
      <ng-container *ngIf="column.head">
        <ng-template #head let-item>
          <ng-container
            *ngTemplateOutlet="column.head; context: { $implicit: item }"
          ></ng-container>
        </ng-template>
      </ng-container>
      <ng-container *ngIf="column.cell">
        <ng-template #cell let-item>
          <ng-container
            *ngTemplateOutlet="
              column.cell;
              context: { $implicit: item, column }
            "
          ></ng-container>
        </ng-template>
      </ng-container>
    </mx-column>
    <!-- Columns -->

    <mx-filter-pills toolbarFooter />
  </mx-data-grid>`,
})
export class GbGridShellComponent implements OnDestroy, OnInit {
  constructor(private api: ApiService, private notif: MxNotification) {}

  overlay = inject(Overlay);
  filterService = inject(FilterService);

  @Input() apiURL = '';
  @Input() gridTitle = '';
  @Input() loadOnMount = true;

  @Output() protected actionEvents = new EventEmitter<any>();

  @ContentChildren(GridColumnsComponent)
  protected columns!: QueryList<GridColumnsComponent>;

  @ContentChildren(GbActionComponent) actions?: QueryList<GbActionComponent>;

  @ContentChildren(MxGridToolbarComponent)
  toolbar?: QueryList<MxGridToolbarComponent>;

  @ContentChildren(GbGridFilterComponent)
  filters?: QueryList<GbGridFilterComponent>;

  filterValues: FilterData[] = [];

  protected loading = false;
  protected collectionSize!: number;
  protected data: any[] = [];
  private subs = new SubSink();
  private requests = new SubSink();
  private gridEvents = { limit: 20, sort: null, page: 1 };
  private allowApiCall = ['limit', 'page', 'sort'];

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.requests.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.filterService.filterData$.subscribe((filterData) => {
      this.filterValues = filterData;
      this._getData();
    });
    this._getData();
  }

  captureGridEvents(events: { key: string; value: any }) {
    this.gridEvents = { ...this.gridEvents, [events.key]: events.value };
    if (this.allowApiCall.includes(events.key) && events.value) {
      this._getData();
    }
  }

  handleSort(sort: any) {
    this.gridEvents = { ...this.gridEvents, sort };
    this._getData();
  }

  openFilters() {
    if (!this.filters) {
      return;
    }
    this.filterService.updateFilters(this.filters);

    this.filterService.openFilterPanel();
  }

  private _getData() {
    if (!this.apiURL) {
      return console.error('Please provide a api url');
    }
    this.loading = true;
    this.requests.unsubscribe();
    this.requests.sink = this.api
      .getList<any>(this.apiURL, this.buildFilters())
      .subscribe({
        next: ({ data }) => {
          this.loading = false;
          this.collectionSize = data['count'];
          this.data = data.rows;
        },
      });
  }

  private buildFilters() {
    const { page, limit, sort } = this.gridEvents;
    return {
      page,
      limit,
      sort: safeStringify(sort || {}),
      filters: safeStringify(this.filterValues),
    };
  }
}
