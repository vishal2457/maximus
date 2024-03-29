import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./layout/main/main.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./features/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "app-users",
        loadChildren: () =>
          import("./features/app-users/app-users.module").then(
            (m) => m.AppUsersModule
          ),
      },
      // APPEND ANGULAR ROUTES
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
