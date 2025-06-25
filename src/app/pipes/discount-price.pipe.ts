import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
  standalone: true
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discountPercentage?: number): number {
    if (discountPercentage && discountPercentage > 0) {
      return +(price * (1 - discountPercentage / 100)).toFixed(2);
    }
    return price;
  }
}

