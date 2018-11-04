import { Injectable } from '@angular/core';
import * as firebase from 'firebase' ;
import { Post } from '../models/post';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[]=[];
  postSubject = new Subject<Post[]>();

  constructor() {
    this.getPosts();
   }

  emitPosts(){
    this.postSubject.next(this.posts);
  }

  savePosts(){
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts(){
    firebase.database().ref('/posts')
    .on('value',(data) => {
      this.posts = data.val ? data.val() : [];
      this.emitPosts();
    });
  }

  getPostById(id: number){
    return new Promise(
      (resolve,reject) => {
        firebase.database().ref('/posts/'+id)
        .once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        )
      }
    );
  }

  createNewPost(newPost: Post){
    if (!this.posts){
      this.posts=[]
    };
    console.log("Dans service : "+ JSON.stringify(newPost));
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();

  }

  deletePost(post: Post){

    const indexToRemove = this.posts.findIndex(
      (p) => {
        if (p === post){
          return true;
        }
      }
    );
    if (confirm('Etes-vous sûr de vouloir supprimer cet article ?')){
    this.posts.splice(indexToRemove,1);
    this.savePosts();
    this.emitPosts();
    } else {
      this.getPosts();
    }
  }

  saveLove(loveIt: number, idPost: number){
    this.posts[idPost].loveIts = loveIt;
    this.savePosts();
    this.emitPosts();
  }

  DateToString(date: Date){

    var dateString: string;

    const minutes = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    var minutesString;
    var hourString;
    var dayString;
    var monthString;

    if (day < 10){
      dayString='0'+day;
    }else{
      dayString=''+day;
    }
      
    if (month < 10){
      monthString='0'+month;
    }else{
      monthString=''+month;
    }

    if (hour < 10){
      hourString='0'+hour;
    }else{
      hourString=''+hour;
    }

    if (minutes < 10){
      minutesString='0'+minutes;
    }else{
      minutesString=''+minutes;
    }
 
    dateString = dayString+'/'+monthString+'/'+year+' à '+hourString+':'+minutesString;
    
    return dateString;

  }

  StringToDate(dateString: string){

    // Non utilisée
    return new Date(dateString);
  }
}
