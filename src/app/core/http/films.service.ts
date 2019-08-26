import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { from, forkJoin, Observable } from 'rxjs';
import { mergeMap, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmsService { 

    constructor(private httpClient: HttpClient) { }


    getAllFilms() {
        return this.httpClient.get(environment.api_url + '/films')
    }

    getIdFilm(id: string) {
        return this.httpClient.get(environment.api_url + `/films/${id}/`)
    }

    getIdsFilms(urls: string[]) {
        console.log('ids fils', urls)
        return from(urls).pipe(
            concatMap(url => <Observable<any>> this.httpClient.get(url))
        )
    }
}