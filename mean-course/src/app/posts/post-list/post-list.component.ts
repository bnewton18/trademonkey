import { Component, Input, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import {Post} from './post.module';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit{
 posts: Post[]  = [];
 private postSub: Subscription;
  constructor(public postService: PostsService){ }

  ngOnInit(): void {
     this.postService.getPosts();
     this.postSub = this.postService.getPostsUpdatedListener()
       .subscribe((posts: Post[]) => {
         this.posts = posts;
       });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  onDelete(id: string): void {
    console.log('onDelete');
    this.postService.deletePost(id);
  }
}
