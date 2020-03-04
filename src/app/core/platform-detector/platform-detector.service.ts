import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

// serviço para detectar qual plataforma o cliente está usando

@Injectable({ providedIn: "root" })
export class PlatformDetectorService {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  checkPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
