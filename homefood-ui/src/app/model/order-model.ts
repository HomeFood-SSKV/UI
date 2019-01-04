export class OrderRequestModel {
  foodDetails: Array<FoodDetails>;
  userId : number;
  deliveryDetailsId? : number;
}

export class FoodDetails {
  foodId : number;
  dateId : number;
  quantity : number;
}
