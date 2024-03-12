import { GoodConfig } from "../goodConfig";
import { ProductType } from "./ProductType";

let config: GoodConfig = require("../../goodConfig");

export class Product {
  public title: string;
  public imageUrl: string;
  public basePrice: number;
  public taxRate: number = config.taxRate;
  public discountRate: number = config.discountRate;
  public productType: ProductType;

  constructor(
    title: string,
    imageUrl: string,
    basePrice: number,
    productType: ProductType
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.basePrice = basePrice;
    this.productType = productType;
  }

  public getPrice(): number {
    return this.basePrice * (1 - this.discountRate) * this.taxRate;
  }

  public getPriceWithoutTaxes(): number {
    return this.basePrice * (1 - this.discountRate);
  }
}
