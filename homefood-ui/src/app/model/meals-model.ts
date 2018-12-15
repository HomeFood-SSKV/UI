export class MealsModel {
  availabilityMapping: AvailabilityMapping;
  data : Data;
  supportedCategory : SupportedCategory;
  supportedDates : SupportedDates;
  supportedType : SupportedType;
  supportedDiscount : SupportedDiscount;
  
}

export class SupportedCategory {
  categoryId : number;
  categoryName : string;
}

export class SupportedDates {
  dateId : number;
  date : number;
}

export class SupportedType {
  foodTypeId : number;
  foodType : string;
}

export class SupportedDiscount {
  discountId : number;
  discountName : string;
  discountPrice : number;
}

export class Data {
  foodId : number;
  foodName : string;
  foodDescription : string;
  foodTypeId : number;
  categoryId : number;
  price : Price;
  discount : number;
}

export class Price {
  priceId : number;
  actualPrice : number;
  gstPrice : number;
  discountedTotalprice : DiscountedTotalprice;
  price : number;
  discount : Array<any>;
}

export class DiscountedTotalprice {
  dateId : number;
  price : number;
}

export class AvailabilityMapping {
  dateId : number;
  foodId : Array<any>;
}