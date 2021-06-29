import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductClass } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  public modalContent: BsModalRef | undefined;
  addItemForm : any;
  img: string = '/assets/icons/image.png';


  constructor(private formBuilder: FormBuilder, public bsModalRef: BsModalRef, private productService: ProductService) { }

  ngOnInit(): void {
    this.addItemForm = this.formBuilder.group({
      id:['', Validators.required],
      name:['', Validators.required],
      category:['', Validators.required],
      quantity:['', Validators.required],
      price:['', Validators.required],
      description:['',],
    })
  }

  async onSubmit(){
    if(this.addItemForm.invalid){
      return;
    }
    let newProduct = new ProductClass();
    newProduct.id = this.addItemForm.controls['id'].value;
    newProduct.name = this.addItemForm.controls['name'].value;
    newProduct.category = this.addItemForm.controls['category'].value;
    newProduct.quantity = this.addItemForm.controls['quantity'].value;
    newProduct.unitPrice = this.addItemForm.controls['price'].value;

    await this.productService.add(newProduct);
    this.bsModalRef.hide();

  }

}
