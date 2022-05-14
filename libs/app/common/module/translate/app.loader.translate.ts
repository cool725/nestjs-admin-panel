import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable()
export class TranslateLoader {
    static provideName = 'TranslateLoader';

    static useClass = TranslateLoader;

    constructor(private http:HttpClient) {}

    test() {
        console.log(this.http);;
        console.log(this.http.get(''));;
    }

    getTranslation(lang: string): Observable<any> {
        console.log(lang)
        return of({KEY: 'value'});
    }
}
