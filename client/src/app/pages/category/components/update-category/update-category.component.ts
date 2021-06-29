import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryClass } from 'src/app/models/category.model';
import { ApiCategoriesService } from 'src/app/services/api-categories.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  public modalContent!: BsModalRef;
  public eventAlert: EventEmitter<any> = new EventEmitter();

  editCategoryForm: any;
  category: any;
  message!:string;
  alert:boolean = false;

  constructor(public bsModalRef: BsModalRef, private categoryService: ApiCategoriesService) { }

  ngOnInit(): void {
    this.editCategoryForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });
    console.log(this.category.idDoc)
    this.bindingData();
  }

  bindingData(){
    this.editCategoryForm.controls.id.setValue(this.category.id);
    this.editCategoryForm.controls.name.setValue(this.category.name);
  }

  async onSubmit(){
    let data = new CategoryClass(
      this.editCategoryForm.controls.id.value,
      this.editCategoryForm.controls.name.value
    )
    let message = await this.categoryService.updateCategory(data, this.category);
    this.bsModalRef.hide();
    this.alert = true;
    let emit = {
      alert: this.alert,
      message: message
    }
    this.eventAlert.emit(emit);
    this.bsModalRef.hide();
  }

}
