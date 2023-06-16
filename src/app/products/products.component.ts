import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private ps:ProductService) {
  }
  ngOnInit(): void {
    this.getProducts()
  }
  public products : Array<Product> = [] ;
  public keyword : string =""
  handleCheckProduct(product: Product) {
    this.ps.checkProduct(product)
      .subscribe({
        next : updatedProduct => {
          product.checked = !product.checked
          //this.getProducts()
        }
      })
  }



  getProducts(){
    this.ps.getProducts(1, 3)
      .subscribe({
        next : data => {this.products=data} ,
        error : err => {console.log(err)}
      })

  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sure?"))
    this.ps.deleteProduct(product)
      .subscribe({
      next:value => {
        //this.getProducts()
        this.products=this.products.filter(p=>p.id!=product.id)
      }
      })
  }

  searchProducts(){
    this.ps.searchProducts(this.keyword)
      .subscribe({
        next : value => {this.products = value}
      })
  }


}
