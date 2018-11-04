import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private postService: PostService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.postForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        content: ['', Validators.required]
      }
    );
  }

  onSubmit(){
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;

    var post = new Post();
    post.title=title;
    post.content=content;
    post.loveIts=0;

    var date = new Date();
    post.dateFirebase = this.postService.DateToString(date);
    
    this.postService.createNewPost(post);
    this.router.navigate(['/posts']);
  }

}
