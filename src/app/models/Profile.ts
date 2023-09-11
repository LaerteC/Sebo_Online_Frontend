import { first } from "rxjs"
import User from "./User"

export interface IChangePassword {
    oldPassword: string,
    newPassword: string
}

export interface IGeneralInformation {
    firstName: string
    lastName: string
    gender: string
    dob: string
    email: string
    phoneNumber: string
}

export interface IProfileLocation {
    currentCity: string
    currentCountry: string
    bornCity: string
    bornCountry: string
}

export interface IProfileEducation {
    schoolName: string
}

export interface IProfileWork {
    jobTitle: string
    companyName: string
    companyUrl: string
}

export interface IProfileMaritalStatus {
    maritalStatus: string
}

export interface IUser {
    id: number
    email: string
    firstName: string
    lastName: string
    avatarImageUrl: string
}

export interface IProfile {
    id: number
    backgroundImageUrl: string

    currentCity: string
    currentCountry: string

    bornCity: string
    bornCountry: string

    dob: string
    gender: string
    maritalStatus: string
    schoolName: string

    jobTitle: string
    companyName: string
    companyUrl: string
    
    phoneNumber: string

    subscriptionIds: number[];
    photoUrls: string[];
    owner: IUser
}

export class Profile implements IProfile {
    id: number
    backgroundImageUrl: string
    currentCity: string
    currentCountry: string
    bornCity: string
    bornCountry: string
    dob: string
    gender: string
    maritalStatus: string
    schoolName: string
    jobTitle: string
    companyName: string
    companyUrl: string
    phoneNumber: string
    subscriptionIds: number[];
    owner: IUser
    photoUrls: string[]


    constructor()
    constructor(profile?: IProfile) {
        this.id = profile?.id! && 0;
        this.backgroundImageUrl = profile?.backgroundImageUrl! && '';
        this.currentCity = profile?.currentCity! && ''
        this.currentCountry = profile?.currentCountry! && ''
        this.bornCity = profile?.bornCity! && ''
        this.bornCountry = profile?.bornCountry! && ''
        this.dob = profile?.dob! && ''
        this.gender = profile?.gender! && ''
        this.maritalStatus = profile?.maritalStatus! && ''
        this.schoolName = profile?.schoolName! && ''
        this.jobTitle = profile?.jobTitle! && ''
        this.companyName = profile?.companyName! && ''
        this.companyUrl = profile?.companyUrl! && ''
        this.phoneNumber = profile?.phoneNumber! && ''
        this.subscriptionIds = profile?.subscriptionIds! && []
        this.photoUrls = profile?.photoUrls! && []
        this.owner = profile?.owner! && {
            id: 0,
            email: '',
            firstName: '',
            lastName: '',
            avatarImageUrl: ''
        }
    }
    
}


