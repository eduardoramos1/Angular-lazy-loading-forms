import { Component, Input, OnInit } from '@angular/core';
import { PhotoComment } from '../../photo/photo-comment';
import { Observable } from 'rxjs';
import { PhotoService } from '../../photo/photo.service';

@Component({
	templateUrl: './photo-comments.component.html',
	selector: 'ap-photo-comments'
})
export class PhotoCommentsComponent implements OnInit {
	@Input() photoId: number;

	comments$: Observable<PhotoComment[]>;

	constructor(private photoService: PhotoService) {}

	ngOnInit() {
		this.comments$ = this.photoService.getComments(this.photoId);
	}
}
