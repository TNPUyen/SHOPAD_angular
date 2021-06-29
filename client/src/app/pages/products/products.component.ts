import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductClass } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { AddFormComponent } from './components/add-form/add-form.component';
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
  sortIcon: string = 'bi bi-caret-down-fill'

  page:number = 1;
  itemPerPage:number = 6;

  constructor(private fireStore: AngularFirestore, public productService: ProductService, 
    private modalService: BsModalService
    ) { 
    
    console.log(this.itemList)
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
    this.modalContent.content.closeBtnName = 'Close'; 
  }

  openAdd(){
    //khởi tạo biến để truyền vào ngx-bootstrap modal
    this.modalContent = this.modalService.show(AddFormComponent);
    this.modalContent.content.closeBtnName = 'Close'; 
  }

  // filter by product name
  search(){
    if(this.name == ""){
      this.ngOnInit();
    }else{
      this.itemList = this.itemList?.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      });
    }
  }

}
