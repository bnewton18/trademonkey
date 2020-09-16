import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../post-list/post.module';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;
  onSavePost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.post.id,
        form.value.title, form.value.content);
    }
    form.resetForm();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);
        console.log(this.post);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  constructor(public postService: PostsService,
              public activatedRoute: ActivatedRoute) {}
}
