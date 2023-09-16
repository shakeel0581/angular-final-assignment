import { Injectable } from '@angular/core';
import { Category } from './Category';
import { Product } from './Product';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // Node/Express API
  REST_API: string = 'https://api.escuelajs.co/api/v1';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}
  // Add
  AddCategory(data: Category): Observable<any> {
    let API_URL = `${this.REST_API}/categories`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  // Get all objects
  GetCategorys() {
    return this.httpClient.get(`${this.REST_API}/categories`);
  }
  // Get single object
  GetCategory(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/categories/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Update
  UpdateCategory(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/categories/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  AddProduct(data: Product): Observable<any> {
    let API_URL = `${this.REST_API}/products`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  // Get all objects
  GetProducts() {
    return this.httpClient.get(`${this.REST_API}/products`);
  }
  // Get single object
  GetProduct(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/products/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Update
  UpdateProduct(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/products/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}