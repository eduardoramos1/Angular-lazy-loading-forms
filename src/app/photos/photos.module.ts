import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { PhotoComponent } from "./photo/photo.component";
import { PhotoListComponent } from "./photo-list/photo-list.component";
import { PhotosComponent } from "./photo-list/photos/photos.component";
import { FilterByDescription } from "./photo-list/filter-by-description.pipe";
import { LoadButtonComponent } from "./photo-list/load-button/load-button.component";
import { CardModule } from "../shared/components/card/card.module";
import { SearchComponent } from "./photo-list/search/search.component";
import { DarkenOnHoverModule } from "../shared/directives/dark-on-hover/dark-on-hover.module";
import { PhotoFormModule } from "./photo-form/photo-form.module";
import { PhotoModule } from "./photo/photo.module";

@NgModule({
	declarations: [
		PhotoListComponent,
		PhotosComponent,
		FilterByDescription,
		LoadButtonComponent,
		SearchComponent
	],
	imports: [
		HttpClientModule,
		CommonModule,
		CardModule,
		DarkenOnHoverModule,
		PhotoFormModule,
		PhotoModule
	]
})
export class PhotosModule {}
