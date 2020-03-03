import { NgModule } from "@angular/core";
import { DarkenOnHoverDirective } from "./dark-on-hover.directive";

@NgModule({
  declarations: [DarkenOnHoverDirective],
  exports: [DarkenOnHoverDirective]
})
export class DarkenOnHoverModule {}
