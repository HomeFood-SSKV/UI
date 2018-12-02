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
    id: number;
    fullName: string;
    areaName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    Country: string;
    pinCode: string;
    phoneNumber: number;
    addressType: number;
  }