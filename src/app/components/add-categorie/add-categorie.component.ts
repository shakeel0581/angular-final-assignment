import { Component,NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
    bookForm: FormGroup;
    constructor(
      public formBuilder: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private crudService: CrudService
    ) {
      this.bookForm = this.formBuilder.group({
        name: [''],
        "image": ["https://api.lorem.space/image/book?w=150&h=220"]
      });
    }
    ngOnInit() {}
    onSubmit(): any {
      console.log("this.bookForm.value",this.bookForm.value)
      this.crudService.AddCategory(this.bookForm.value).subscribe(
        (res: any) => {
          console.log('Data added successfully!' + res);
          this.ngZone.run(() => this.router.navigateByUrl('/category-list'));
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }