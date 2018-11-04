import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() postTitle: string;
  @Input() postContent: string;
  @Input() postLoveIts: number;
  @Input() postIndex: number;

  // Choix de passer un string en postDate afin de la sauvegarder sur firebase.
  // En effet, pour enregistrer une date dans firebase, il faut qu'elle soit : de format string ou de format number.
  @Input() postDate: string;
  
  post: Post;

  constructor(private postService: PostService) { 
  }

  ngOnInit() {
    
  }

  onPlus() {
   
    this.postLoveIts = this.postLoveIts + 1;
    this.postService.saveLove(this.postLoveIts, this.postIndex);
  }

  onMoins() {
    this.postLoveIts = this.postLoveIts - 1;
    this.postService.saveLove(this.postLoveIts, this.postIndex);
  }

  onDelete(id: number) {
  
     this.post= new Post();
     this.postService.getPostById(id).then(
       (post: Post) => {
         this.post = post
       }
     );
     this.postService.deletePost(this.post);
  }

}
