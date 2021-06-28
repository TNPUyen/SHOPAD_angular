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
  name!: string;

  page:number = 1;

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
    this.itemListFilter = this.itemList

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
    // this.itemListFilter = this.itemList
    // this.itemListFilter = []
    if(this.name == ""){
      this.ngOnInit();
    }else{
      
      console.log('vô')
      this.itemListFilter = this.itemListFilter?.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      });
      this.items?.subscribe(data => {data = this.itemListFilter, console.log(data)}) ;
    console.log(this.itemListFilter)

    }
  }
}
