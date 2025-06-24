import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { MemeToGenerate } from '../../libs/api-interface/src/lib/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private http: HttpClient) { }

  getMemes(searchText=''): Observable<{ name: string; url: string }[]> {
    const backend$ = this.http.get<string[]>(`http://localhost:3333/api/meme?q=${searchText}`);
    const imgflip$ = this.http.get<any>('https://api.imgflip.com/get_memes');

    return forkJoin([backend$, imgflip$]).pipe(
      map(([backendMemes, imgflipResponse]) => {
        const imgflipMemes = imgflipResponse.data.memes;

        return backendMemes.map(name => {
          const normalized = name.toLowerCase().replace(/_/g, ' ');
          const match = imgflipMemes.find((m: any) =>
            m.name.toLowerCase() === normalized
          );

          return {
            name,
            url: match?.url || ''
          };
        });
      })
    );
  }

  createMeme(params: MemeToGenerate): Observable<{ url: string }> {
    return this.http.post<{ url: string}>(`http://localhost:3333/api/meme`, params)
  }
}
