import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  public getProducts(page : number = 1, size : number = 4):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8089/products?_page=${page}&_limit=${size}`);
  }
  public getPageProducts(page : number = 1, size : number = 4):Observable<Array<Product>>{
    let index = page * size
    let totalPages = ~~this.http.get<Array<Product>>("http://localhost:8089/products")/size
    if(this.http.get<Array<Product>>("http://localhost:8089/products")%size)
      totalPages++
    this.http.get<Array<Product>>("http://localhost:8089/products").pipe(index, index+size)
    let pageProducts = this.http.get<Array<Product>>(`http://localhost:8089/products?_page=${index}&_limit=${size}`)
    return this.http.get<Array<Product>>(`http://localhost:8089/products?_page=${page}&_limit=${size}`);

  }
  public checkProduct(product: Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
      {checked:!product.checked})
  }
  public deleteProduct(product: Product){
    return this.http.delete<any>(`http://localhost:8089/products/${product.id}`)
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>("http://localhost:8089/products",
      product)
  }

  searchProducts(keyword :string ):Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}`)
  }
}
