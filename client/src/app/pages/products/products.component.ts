import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductClass } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { UpdateFormComponent } from './components/update-form/update-form.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  itemCollection: AngularFirestoreCollection<ProductClass> | undefined;
  items: Observable<any> | undefined;
  itemList: ProductClass[] | undefined;
  itemListFilter: ProductClass[] | undefined;

  totalProduct: any;
  modalContent!: BsModalRef;
  proname: any;

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
  
  open(item:any,){
    //khởi tạo biến để truyền vào ngx-bootstrap modal
    const initialState = {item: item}
    this.modalContent = this.modalService.show(UpdateFormComponent, {initialState});
    this.modalContent.content.closeBtnName = 'Close'; 
  }

  search(){
    if(this.proname == ""){
      this.ngOnInit();
      console.log("51: ",this.items)

    }else{
    console.log("54: ",this.itemList)
    this.itemListFilter = this.itemList

      this.itemListFilter = this.itemListFilter?.filter(res => {
        return res.name?.toLocaleLowerCase().match(this.proname.toLocaleLowerCase())
      });
      console.log("58: ",this.itemListFilter)
      this.items?.subscribe(data => {data = this.itemListFilter, console.log(data)}) ;
    }
  }
}
