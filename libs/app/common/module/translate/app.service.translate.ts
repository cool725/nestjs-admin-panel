import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class TranslateService {

    private readonly defaultTranslations:any = {
        "profiles" : "Kunden",
        "create" : "Erstellen",
        "search" : "Suchen",
    };

    private readonly loadedTranslations:any = {};

    translate(key:string):string | undefined{
        return this.loadedTranslations[key] || this.defaultTranslations[key]
    }

    setTranslations( section:string, values :any, lang?:string){
    }

    loadAndSetTranslations( section:string, lang?:string){
    }
}
