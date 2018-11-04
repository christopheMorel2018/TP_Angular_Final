import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  title: string ='Mes Articles';

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {

    this.postsSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.getPosts();
    this.postService.emitPosts();
  }

  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }

}
