import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, args: string): any {
    console.log('value',value, args);
    if (!args || args === " ") {
      return value;
  }
    return value.filter(item => item.color  == args[0]);    
  }

}
