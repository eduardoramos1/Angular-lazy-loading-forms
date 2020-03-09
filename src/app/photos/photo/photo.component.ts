import { Component, Input } from "@angular/core";

const cloud = "http://localhost:3000/imgs/";

@Component({
	selector: "ap-photo",
	templateUrl: "photo.component.html"
})
export class PhotoComponent {
	private _url = "";

	@Input() description = "";

	// Em angular eu posso aplicar uma inbounding property para um set, e então aplicar algum tipo de lógica nele.
	@Input() set url(url: string) {
		// se a url começar com "data", _url recebe concatenação de cloud + url, fazendo assim carregar a imagem corretament
		if (!url.startsWith("data")) {
			this._url = cloud + url;
		} else {
			this._url = url;
		}
	}

	get url() {
		return this._url;
	}
}
