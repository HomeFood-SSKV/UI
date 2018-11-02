export class FieldModel {
}

export class Register {
    id ?: number;
    fullName: string;
    phoneNumber: number;
    emailId: string;
    password: string;
  }

  export class Login {
    loginId: string;
    password: string;
  }
  export class DeliveryAddress {
    fullName: string;
    areaName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    phoneNumber: number;
    addressType: number;
  }