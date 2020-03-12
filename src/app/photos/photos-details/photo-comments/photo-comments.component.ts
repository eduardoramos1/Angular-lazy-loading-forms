import { Component, Input, OnInit } from '@angular/core';
import { PhotoComment } from '../../photo/photo-comment';
import { Observable } from 'rxjs';
import { PhotoService } from '../../photo/photo.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	templateUrl: './photo-comments.component.html',
	selector: 'ap-photo-comments'
})
export class PhotoCommentsComponent implements OnInit {
	@Input() photoId: number;
	commentForm: FormGroup;

	comments$: Observable<PhotoComment[]>;

	constructor(private photoService: PhotoService, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.comments$ = this.photoService.getComments(this.photoId);
		this.commentForm = this.formBuilder.group({
			comment: [ '', Validators.maxLength(300) ]
		});
	}
}
