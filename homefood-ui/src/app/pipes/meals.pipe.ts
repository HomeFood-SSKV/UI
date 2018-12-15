import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meals',
  pure:false
})
export class MealsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let checkData = false;
    if(!value) {
      return value;
    }  
    return value.filter(val => {
        checkData = false;
        if(val.categoryId == args.currentCategory){
          for(var j in args.currentDate.foodId){
            if(args.currentDate.foodId[j] == val.foodId) {
              checkData = true;
              val.discountPrice = 70;
            }
          }
        }
        return (checkData)?val:null;

    });
    
  }

}
