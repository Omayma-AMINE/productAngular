export interface Product{
  id : number,
  name : string,
  price : number,
  checked : boolean
}
export interface PageProduct{
  products : Product[],
  page : number,
  size : number,
  totalPages : number,
}
