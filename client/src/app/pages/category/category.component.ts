import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Category, CategoryClass } from 'src/app/models/category.model';
import { ApiCategoriesService } from 'src/app/services/api-categories.service';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  modalContent!: BsModalRef;

  categoryCollection!: AngularFirestoreCollection<Category>;
  categories!: Observable<any>;
  categoryList!: Category[];

  page:number = 1;
  itemPerPage:number = 6;

  alert:boolean = false;
  message!:string;
  isSuccess: boolean = false;
  constructor(private categoryService: ApiCategoriesService, private firestore: AngularFirestore , private modalService: BsModalService) { }

  ngOnInit(): void {
    // this.getData();
    this.categoryCollection = this.firestore.collection('categories');
    this.categories = this.categoryCollection.valueChanges({idField: 'idDoc'});
    this.categories.subscribe(data =>{this.categoryList = data});

    
  }

  // async getData(){
  //   this.categories = await this.categoryService.getAllCategories();
  // }

  openUpdate(category: any){
    const initialState = {category: category}
    this.modalContent = this.modalService.show(UpdateCategoryComponent, {initialState});
    this.modalContent.content.eventAlert.subscribe((data:any) => {
      this.alert = data['alert'];
      this.message = data['message'];
      this.settingAlert()
    });
  }

  openAdd(){
    this.modalContent = this.modalService.show(AddCategoryComponent);
    this.modalContent.content.eventAlert.subscribe((data:any) => {
      this.alert = data['alert'];
      this.message = data['message'];
      this.settingAlert();
    });
  }

  settingAlert(){
    if(this.message.includes('successful')){
      this.isSuccess = true;
      console.log(this.message.includes('successful'))
    }
    if(this.alert == true){
      setTimeout(() => {
        this.alert = false
      }, 1500);
    }
  }

  closeAlert(){
    this.alert = false;
  }

  async delete(category: any){
    this.message = await this.categoryService.deleteCategory(category);
    this.alert = true;
    console.log(this.message);
    this.settingAlert();
  }
}
