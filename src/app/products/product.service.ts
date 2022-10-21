import { Observable, catchError, throwError,tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json'

    constructor(private http: HttpClient){

    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log("All", JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            //red
            errorMessage = "An error occurred: " + err.error.message;
        } else {
            //backend
            errorMessage = "Server returned code " +err.status+ ", erro message is: " + err.message;
        }
        console.log(errorMessage);
        return throwError(() => errorMessage)
    }
}
