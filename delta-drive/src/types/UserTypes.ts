export type UserRegistration = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdayDate: Date;
};

export type LoginType = {
  email: string;
  password: string;
};

export type CurrentUser = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  isDeleted: boolean;
  isVerified: boolean;
  roleId: number;
  verificationToken: string;
} | null;
