import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryClass } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriesService {
  categories!: Observable<any>;
  categoriesList!: any;

  constructor(private firestore: AngularFirestore, private httpClient: HttpClient) { }

  // async getAllCategories(){
    // let list: any ={};
  //   list = await this.httpClient.get(environment.endpoint + 'api/getAllCategories').toPromise();
  //   return list['categoriesList'];
  // }

  async createCategory(id:string, name:string){
    let message: any = {}
    let data = {
      id: id,
      name: name
    }
    message = await this.httpClient.post(environment.endpoint + 'api/createCategory', data).toPromise();
    return message['message'];
  }

  async updateCategory(category: CategoryClass, categoryItem: any){
    let data = {
      category: category,
      item: categoryItem
    }
    let message: any ={};
    message = await this.httpClient.put(environment.endpoint + 'api/updateCategory', data).toPromise();
    return message['message'];
  }

  async deleteCategory(category: any){
    let message: any ={};
    let data = {
      category: category
    }
    message = await this.httpClient.delete(environment.endpoint + 'api/deleteCategory', {body: data}).toPromise();
    return message['message'];
  }
}
