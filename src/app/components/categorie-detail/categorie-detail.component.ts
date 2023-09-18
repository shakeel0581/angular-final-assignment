import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categorie-detail',
  templateUrl: './categorie-detail.component.html',
  styleUrls: ['./categorie-detail.component.css'],
})
export class CategorieDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private spinner: NgxSpinnerService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.spinner.show();
    this.crudService.GetCategory(this.getId).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.updateForm.setValue({
          name: data.name,
        });
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
    this.updateForm = this.formBuilder.group({
      name: [''],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.imageUrl = null; // Clear the previous image
  }

  ngOnInit() {}
  onUpdate(): any {
    this.spinner.show();
    this.crudService.AddFile(this.selectedFile)?.subscribe(
      (res: any) => {
        this.updateForm.value.image = res.location;
        this.crudService
          .UpdateCategory(this.getId, this.updateForm.value)
          .subscribe(
            () => {
              this.spinner.hide();
              this.ngZone.run(() =>
                this.router.navigateByUrl('/category-list')
              );
            },
            (err) => {
              this.spinner.hide();
              console.log(err);
            }
          );
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    ) ?? this.spinner.hide();
  }
}
