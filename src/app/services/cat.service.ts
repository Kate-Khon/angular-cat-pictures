import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export interface breedsData {
  name: string,
  id: string,
}

interface data {
  breeds: {
    0: {},
  },
  id: string,
  url: string,
  width: number,
  height: number,
}

@Injectable({
  providedIn: 'root'
})

export class CatService {
  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      "x-api-key" : "live_ty1ZfKWxW4uFlp7yQM1wZNPgWirXO8YaSsSG0MxNaRbAVUgeKOwUTVpGkBgEnXzi",
    })
  }

  getCatBreeds() {
    return this.http.get<breedsData>('https://api.thecatapi.com/v1/breeds');
  }

  getCatInfo(breedId: string, limit: number): Observable<data> {
    let breed = '';

    if (breedId) {
      breed += `&breed_ids=${breedId}`;
    }

    return this.http.get<data>(`https://api.thecatapi.com/v1/images/search?limit=${limit}${breed}`, { headers: this.httpOptions.headers });
  }
}
