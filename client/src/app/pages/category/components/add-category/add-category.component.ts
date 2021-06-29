import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryClass } from 'src/app/models/category.model';
import { ApiCategoriesService } from 'src/app/services/api-categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public modalContent!: BsModalRef;
  public eventAlert: EventEmitter<any> = new EventEmitter();

  addItemForm : any;
  alert:boolean = false;

  constructor(private formBuilder: FormBuilder, public bsModalRef: BsModalRef, private categoryService: ApiCategoriesService) { }

  ngOnInit(): void {
    this.addItemForm = this.formBuilder.group({
      id:['', Validators.required],
      name:['', Validators.required],
    })
  }

  async onSubmit(){
    if(this.addItemForm.invalid){
      return;
    }

    let message = await this.categoryService.createCategory(this.addItemForm.controls['id'].value, this.addItemForm.controls['name'].value);
    this.alert = true;
    let emit = {
      alert: this.alert,
      message: message
    }
    this.eventAlert.emit(emit)
    this.bsModalRef.hide();
  }

}
