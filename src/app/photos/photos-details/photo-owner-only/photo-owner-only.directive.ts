import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { Photo } from '../../photo/photo';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
	selector: '[photoOwnerOnly]'
})
export class PhotoOwnerDirective implements OnInit {
	@Input() ownedPhoto: Photo;

	constructor(private element: ElementRef<any>, private renderer: Renderer, private userService: UserService) {}

	ngOnInit() {
		this.userService.getUser().subscribe((user) => {
			console.log(this.ownedPhoto);
			if (user.id === null || user.id !== this.ownedPhoto.userId) {
				this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
			}
		});
	}
}
