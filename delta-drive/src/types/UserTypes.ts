import { ROLE_ENUM } from '@/enums/RoleEnum';

export type UserDetailsType = {
    firstName: string;
    lastName: string;
    address?: string;
    phoneNumber: string;
};

export type UserPersonalDataProps = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
};

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    points: number;
    role: ROLE_ENUM;
} | null;

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
