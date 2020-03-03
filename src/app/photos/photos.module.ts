import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { PhotoComponent } from "./photo/photo.component";
import { PhotoListComponent } from "./photo-list/photo-list.component";
import { PhotoFormComponent } from "./photo-form/photo-form.component";
import { PhotosComponent } from "./photo-list/photos/photos.component";
import { FilterByDescription } from "./photo-list/filter-by-description.pipe";
import { LoadButtonComponent } from "./photo-list/load-button/load-button.component";
import { CardModule } from "../shared/components/card/card.module";
import { SearchComponent } from "./photo-list/search/search.component";
import { DarkenOnHoverModule } from "../shared/directives/dark-on-hover/dark-on-hover.module";

@NgModule({
  declarations: [
    PhotoComponent,
    PhotoListComponent,
    PhotoFormComponent,
    PhotosComponent,
    FilterByDescription,
    LoadButtonComponent,
    SearchComponent
  ],
  imports: [HttpClientModule, CommonModule, CardModule, DarkenOnHoverModule]
})
export class PhotosModule {}
