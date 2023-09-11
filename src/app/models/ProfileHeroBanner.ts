export interface IProfileHeroBanner {
    avatarImageUrl: string,
    backgroundImageUrl: string,
    firstName: string,
    lastName: string,
    currentCity: string,
    currentCountry: string
}




export class ProfileHeroBanner implements IProfileHeroBanner {
    avatarImageUrl: string
    backgroundImageUrl: string
    firstName: string
    lastName: string
    currentCity: string
    currentCountry: string

    constructor(personHero?: IProfileHeroBanner) {
        this.avatarImageUrl = (personHero?.avatarImageUrl ? personHero?.avatarImageUrl : 'https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png') ?? 'https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png'
        this.backgroundImageUrl = personHero?.backgroundImageUrl ?? '';
        this.firstName = personHero?.firstName ?? ''
        this.lastName = personHero?.lastName ?? ''
        this.currentCity = personHero?.currentCity ?? ''
        this.currentCountry = personHero?.currentCountry ?? ''
    }
}
