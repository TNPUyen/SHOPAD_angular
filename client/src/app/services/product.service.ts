import { Injectable } from '@angular/core';
import { ProductClass } from '../models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private fireStore: AngularFirestore,) { }

  add(newProduct: ProductClass) {
    this.fireStore.collection('items').add({
      id: newProduct.id,
      image: '',
      name: newProduct.name,
      category: newProduct.category,
      quantity: newProduct.quantity,
      price: newProduct.unitPrice,
      status: true,
      priority: false,
    }).then((data) => {
      console.log(data)
      alert(`Add new Product successful ${data.id}`)
    });
  }

  update(itemIdoc:string, editData: any) {
    let status = true;
    if (editData.quantity == 0){
      status = false;
    }
    this.fireStore.collection('items').doc(itemIdoc).set({
      id: editData.id,
      image: '',
      name: editData.name,
      category: editData.category,
      quantity: editData.quantity,
      status: status,
      price: editData.price,
      priority: false,
    })
  }

  delete(item:any) {
    //idDoc: document id
    this.fireStore.collection('items').doc(item.idDoc).delete();
  }
}
