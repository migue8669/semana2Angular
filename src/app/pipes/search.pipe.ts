import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'clientFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let result = (val.name.toLowerCase().indexOf(args.toLowerCase()) !== -1) || 
                   (val.age.toString().includes(args))                         ||
                   (val.email.toLowerCase().indexOf(args.toLowerCase()) !== -1);        
      return result;
    })

  }

}