import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms' ;
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-list/post-form/post-form.component';
import { HeaderComponent } from './components/header/header.component';
import { PostService } from './services/post.service';
import { PostListItemComponent } from './components/post-list/post-list-item/post-list-item.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'new', component: PostFormComponent },
  { path: '', component: PostListComponent },
  {path: '**', redirectTo: '/posts'},
  
];


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostFormComponent,
    HeaderComponent,
    PostListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
