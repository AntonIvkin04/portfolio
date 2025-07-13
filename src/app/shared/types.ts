export type Language = 'de' | 'en';

export type formValue = 'checkbox' | 'email' | 'name'

export type navigation = {
    name:string,
    lang:{
        de:string,
        en:string
    }
}

export type elementHeight = {
    section:string,
    height:number,
}