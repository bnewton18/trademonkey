import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {Post} from './post-list/post.module';

@Injectable({ // makes it findable for injection and will only create one
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient ) {
  }
  getPosts(): void {
    this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((mappedPosts) => {
        this.posts = mappedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdatedListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
     const post: Post = {id: null, title, content};
     this.httpClient.post<{message: string, newPostId: string }>('http://localhost:3000/api/posts', post)
       .subscribe((responseData) => {
         post.id = responseData.newPostId;
         this.posts.push(post);
         this.postsUpdated.next([...this.posts]);
       });
  }

  getPost(postId: string): Post {
    return {...this.posts.find((p) => p.id === postId)};
  }

  updatePost(postId: string, title: string, content: string): void {
    const post: Post = {id: postId, title: title, content: content};
    console.log('updatePost: ');
    this.httpClient.put('http://localhost:3000/api/posts/' + postId, post)
      .subscribe(response => console.log(response));
  }

  deletePost(postId: string): void {
    console.log('deletePost ' + postId);
    this.httpClient.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts] );
    });
  }
}
