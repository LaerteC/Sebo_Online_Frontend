export default class User {
    id: number
    email: string
    firstName: string
    lastName: string
    avatarImageUrl: string

    constructor (id: number, email: string, firstName: string, lastName: string, avatarImageUrl?: string) {
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.avatarImageUrl = (avatarImageUrl ? avatarImageUrl : 'https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png') ?? 'https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png'
    }
}