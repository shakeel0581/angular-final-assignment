import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css'],
})
export class CategorieListComponent implements OnInit {
  Category: any = [];
  constructor(
    private crudService: CrudService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.crudService.GetCategorys().subscribe(
      (data: any) => {
        this.Category = data;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  ngOnInit() {}
  // delete(id: any, i: any) {
  //   if (window.confirm('Do you want to go ahead?')) {
  //     this.crudService.deleteBook(id).subscribe((data: any) => {
  //       this.Category.splice(i, 1);
  //     });
  //   }
  // }
}
