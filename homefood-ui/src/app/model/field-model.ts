export class FieldModel {
}

export class Register {
    id ?: number;
    fullName: string;
    phoneNumber: number;
    emailId: string;
    password: string;
    confirmPassword: string;
  }

  export class Login {
    loginId: string;
    password: string;
  }
  export class DeliveryAddress {
    addressId: number;
    fullName: string;
    area: Area;
    deliveryPoint: DeliveryPoint;
    addressLine1: string;
    addressLine2?: string;
    location: Location;
    city: City;
    state?: string;
    Country?: string;
    pincode: string;
    phoneNumber: number;
    addressType: AddressType;
  }
  export class AddressType {
    addressTypeId: string;
    addressTypeName: string;
  }
  export class DeliveryPoint {
    deliveryPointId: number;
    deliveryPointName: string;
  }
  export class Area {
    areaId: number;
    areaName: string;
  }
  export class Location {
    locationId: number;
    locationName: string;
  }
  export class City {
    cityId: number;
    cityName: string;
  }