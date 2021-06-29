import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {
  public modalContent!: BsModalRef;
  public eventAlert: EventEmitter<any> = new EventEmitter();

  editItemForm : any;
  img: string = '/assets/icons/image.png';
  item: any;
  
  message!:string;
  alert:boolean = false;

  public event: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef, private productService: ProductService) {
   
  }

  ngOnInit() {
    this.editItemForm = new FormGroup({
      id: new FormControl('', Validators.required,),
      name: new FormControl('', Validators.required,),
      category: new FormControl('', Validators.required,),
      quantity: new FormControl('', Validators.required,),
      price: new FormControl('', Validators.required,),
      description: new FormControl('',),
      image: new FormControl('',)
    })
    this.bindingData();
  }

  //binding data từ parent vô modal (data hiện tại của product)
  bindingData(){
    this.editItemForm.controls.id.setValue(this.item.id);
    this.editItemForm.controls.name.setValue(this.item.name);
    this.editItemForm.controls.category.setValue(this.item.category);
    this.editItemForm.controls.quantity.setValue(this.item.quantity);
    this.editItemForm.controls.price.setValue(this.item.price);
    this.editItemForm.controls.description.setValue(this.item.description);
    // this.editItemForm.controls.image.setValue();
  }

  async onSubmit(){
    let editData = {
      id: this.editItemForm.controls.id.value,
      name: this.editItemForm.controls.name.value,
      category: this.editItemForm.controls.category.value,
      quantity: this.editItemForm.controls.quantity.value,
      price: this.editItemForm.controls.price.value,
      description: this.editItemForm.controls.description.value,
      image: ''
    }
    let message = await this.productService.update(this.item.idDoc, editData);
    this.bsModalRef.hide();
    this.alert = true;
    let emit = {
      alert: this.alert,
      message: message
    }
    this.eventAlert.emit(emit);

    this.bsModalRef.hide();
  }

  // saveToList(form: any) {
  //   if(form.value){
  //     this.triggerEvent(form.value.name);
  //     this.bsModalRef.hide();
  //   }
  // }

  // triggerEvent(item: string) {
  //   this.event.emit({ data: item , res:200  });
  // }

}
