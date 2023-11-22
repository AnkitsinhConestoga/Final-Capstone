class UserModel {
  private static instance: UserModel;
  
  // Define your properties here
  public isChecked: boolean = false;
  public isVerified: boolean = false;
  public name: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phone: string = '';
  public gender: string = '';
  public countryCode: string = 'CA';
  public callingCode: string = '1';
  public userId: string = '';
  public loginProvider: string = '';
  public profileUrl: string = '';
  public streetName: string = '';
  public cityName: string = '';
  public postalCode: string = '';

  private constructor() {
    // Initialize your properties or perform other setup here
  }

  public static getInstance(): UserModel {
    if (!UserModel.instance) {
      UserModel.instance = new UserModel();
    }
    return UserModel.instance;
  }

  public updateIsChecked(newIsChecked: boolean): void {
    this.isChecked = newIsChecked;
  }

  public updateIsVerified(newIsVerified: boolean): void {
    this.isVerified = newIsVerified;
  }

  public updateName(newName: string): void {
    this.name = newName;
  }

  public updateFirstName(newFirstName: string): void {
    this.firstName = newFirstName;
  }

  public updateLastName(newLastName: string): void {
    this.lastName = newLastName;
  }

  public updateEmail(newEmail: string): void {
    this.email = newEmail;
  }

  public updatePhone(newPhone: string): void {
    this.phone = newPhone;
  }

  public updateGender(newGender: string): void {
    this.gender = newGender;
  }

  public updateCountryCode(newCountryCode: string): void {
    this.countryCode = newCountryCode;
  }

  public updateCallingCode(newCallingCode: string): void {
    this.callingCode = newCallingCode;
  }

  public updateUserId(newUserId: string): void {
    this.userId = newUserId;
  }

  public updateLoginProvider(newLoginProvider: string): void {
    this.loginProvider = newLoginProvider;
  }

  public updateProfileUrl(newProfileUrl: string): void {
    this.profileUrl = newProfileUrl;
    // You can trigger additional logic or re-renders here
  }

  public updateStreetName(newStreetName: string): void {
    this.streetName = newStreetName;
  }

  public updateCityName(newCityName: string): void {
    this.cityName = newCityName;
  }

  public updatePostalCode(newPostalCode: string): void {
    this.postalCode = newPostalCode;
  }
  public resetUser(): void {
    this.isChecked = false;
    this.isVerified = false;
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.gender = '';
    this.countryCode = 'CA';
    this.callingCode = '1';
    this.userId = '';
    this.loginProvider = '';
    this.profileUrl = '';
    this.streetName = '';
    this.cityName = '';
    this.postalCode = '';
    // You can add any additional initialization logic here
  }
}

export const USER = UserModel.getInstance();
export type USER = UserModel;
