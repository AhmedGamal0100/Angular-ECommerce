import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {

  transform(price: number, quantity: number = 1): unknown | null {
    return price * quantity;
  }

}
