import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductClass } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';
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
  modalContent: any;


  constructor(private fireStore: AngularFirestore, private productService: ProductService, 
    // private modalService: NgbModal
    ) { 
    this.itemCollection = this.fireStore.collection<ProductClass>('items');
    // set document id => idField: idDoc
    this.items = this.itemCollection.valueChanges({ idField: 'idDoc' });
    
    this.items.subscribe(data=> {this.totalProduct = data.length, this.itemList = data, console.log(this.itemList)});
  }

  ngOnInit(): void {
  }

  delete(item: any){
    this.productService.delete(item);
  }
  
  open(content:any, tableRow:any){
    this.modalContent = tableRow;
    // this.modalService.open(content);
  }

}
