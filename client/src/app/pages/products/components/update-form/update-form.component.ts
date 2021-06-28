import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {
  editItemForm : any;
  img: string = '/assets/icons/image.png';
  @Input() itemData: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
