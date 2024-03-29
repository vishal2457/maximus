import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { Router } from "@angular/router";
import { SidebarService } from "src/app/shared/services/sidebar.service";
import { ThemeService } from "src/app/shared/services/theme.service";
import { APP_CONFIG } from "src/config";
import { environment } from "src/environments/environment.development";
import { SubSink } from "subsink";

@Component({
  selector: "gb-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  themeService = inject(ThemeService);
  theme$ = this.themeService.theme$;
  sidebarService = inject(SidebarService);
  router = inject(Router);

  sidebarOpen = true;
  PANEL_CONFIG = APP_CONFIG.panelConfig;

  private subs = new SubSink();

  ngOnInit(): void {
    this.subs.sink = this.sidebarService.sidebarOpen$.subscribe(
      (value) => (this.sidebarOpen = value)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  logout() {
    this.router.navigate(["/auth"]);
  }
}
