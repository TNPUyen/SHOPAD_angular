import { Injectable } from '@angular/core';
import { ProductClass } from '../models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private fireStore: AngularFirestore) {}

  add(newProduct: ProductClass) {
    try {
      this.fireStore
        .collection('items')
        .add({
          id: newProduct.id,
          image: '',
          name: newProduct.name,
          category: newProduct.category,
          quantity: newProduct.quantity,
          price: newProduct.unitPrice,
          status: true,
          priority: false,
        })
        // .then((data) => {
        //   console.log(data);
        //   alert(`Add new Product successful ${data.get()}`);
        // });
      return `Update ${newProduct.name} successful`;
    } catch (error) {
      return `Update ${newProduct.name} failed`;
    }
  }

  update(itemIdoc: string, editData: any) {
    try {
      let status = true;
      let priority = false;
      if (editData.quantity == 0) {
        status = false;
      }
      if (editData.priority == true) {
        priority = true;
      }
      this.fireStore.collection('items').doc(itemIdoc).set({
        id: editData.id,
        image: '',
        name: editData.name,
        category: editData.category,
        quantity: editData.quantity,
        status: status,
        price: editData.price,
        priority: priority,
      });
      return `Update ${editData.name} successful`;
    } catch (error) {
      return `Update ${editData.name} failed`;
    }
  }

  delete(item: any) {
    //idDoc: document id
    try {
      this.fireStore.collection('items').doc(item.idDoc).delete();
      return `Delete ${item.name} successful`;
    } catch (error) {
      return `Delete ${item.name} failed`;
    }
  }
}
