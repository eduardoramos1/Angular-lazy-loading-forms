import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PhotoListComponent } from "./photos/photo-list/photo-list.component";
import { PhotoFormComponent } from "./photos/photo-form/photo-form.component";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import { PhotoListResolver } from "./photos/photo-list/photo-list.resolver";
import { RequiresAuthenticationGuard } from "./core/auth/requires-authentication.guard";
import { PhotoDetailsComponent } from "./photos/photos-details/photo-details.component";

// A ideia do canActivate é permitir usar uma guarda de rota, se ele não passar nas condições do guard a rota não é ativada
const routes: Routes = [
	// verifica se a rota é exatamente a definida, se for redireciona para home
	{
		path: "",
		pathMatch: "full",
		redirectTo: "home"
	},
	{
		path: "home",
		// carrega o modulo para ser usado no lazy loading
		loadChildren: "./home/home.module#HomeModule"
	},
	{
		path: "user/:userName",
		component: PhotoListComponent,
		resolve: {
			photos: PhotoListResolver
		}
	},
	{
		path: "p/add",
		component: PhotoFormComponent,
		canActivate: [RequiresAuthenticationGuard]
	},
	{
		path: "p/:photoId",
		component: PhotoDetailsComponent
	},
	{
		path: "**",
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
