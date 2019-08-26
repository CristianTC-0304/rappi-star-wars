import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { from, forkJoin, Observable } from 'rxjs';
import { mergeMap, concatMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllCharacter(idPages: string): any {
        console.log('idPages', idPages)
        return from(idPages).pipe(
            concatMap(idPage => <Observable<any>> this.httpClient.get(environment.api_url + `/people/?page=${idPage}`))
        )
    }

    getIdCharacter(urls: string): any {
        console.log('urls', urls)
        return from(urls).pipe(
            mergeMap(url => <Observable<any>> this.httpClient.get(url))
        )
    }
}