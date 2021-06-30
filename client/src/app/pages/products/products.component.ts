import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductClass } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  itemCollection!: AngularFirestoreCollection<ProductClass>;
  items!: Observable<any>;
  itemList!: ProductClass[];
  itemListFilter!: ProductClass[];
  

  totalProduct: any;
  modalContent!: BsModalRef;
  name!: string;
  category!: string;

  sortIcon: string = 'bi bi-caret-down-fill'

  page:number = 1;
  itemPerPage:number = 6;

  alert:boolean = false;
  message!:string;
  isSuccess: boolean = false;

  constructor(private fireStore: AngularFirestore, 
              public productService: ProductService, 
              private modalService: BsModalService,
              public userService: UserService,
              private router: Router) { 
  }

  ngOnInit(): void {
    this.itemCollection = this.fireStore.collection<ProductClass>('items');
    // set document id => idField: idDoc
    this.items = this.itemCollection.valueChanges({ idField: 'idDoc' });
    this.items.subscribe(data=> {this.totalProduct = data.length, this.itemList = data});
  }

  delete(item: any){
    this.productService.delete(item);
  }
  
  // open update form
  openUpdate(item:any,){
    //khởi tạo biến để truyền vào ngx-bootstrap modal
    const initialState = {item: item}
    this.modalContent = this.modalService.show(UpdateFormComponent, {initialState});
    this.modalContent.content.eventAlert.subscribe((data:any) => {
      this.alert = data['alert'];
      this.message = data['message'];
      this.settingAlert();
    });
  }

  openAdd(){
    //khởi tạo biến để truyền vào ngx-bootstrap modal
    this.modalContent = this.modalService.show(AddFormComponent);
    this.modalContent.content.eventAlert.subscribe((data:any) => {
      this.alert = data['alert'];
      this.message = data['message'];
      this.settingAlert();
    });
  }

  // filter by product name
  searchName(){
    if(this.name == ""){
      this.ngOnInit();
    }else{
      this.itemList = this.itemList?.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      });
    }
  }

  searchCategory(){
    if(this.category == ""){
      this.ngOnInit();
    }else{
      this.itemList = this.itemList?.filter(res => {
        return res.category.toLocaleLowerCase().match(this.category.toLocaleLowerCase())
      });
    }
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

  detail(item:any){
    this.router.navigate([`/admin/detail/${item.id}`])
  }

}
