import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../core/http/films.service';
import { CharacterService } from '../core/http/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})
export class CharacterComponent implements OnInit {
  pagination: number;
  id: string;
  valid: boolean = false;
  buscar: string = "";
  characters: any = [];
  allCharacters: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private filmsService: FilmsService,
    private characterService: CharacterService,
  ) {

    typeof this.activatedRoute.snapshot.params['idFilm'] == 'undefined' ?
      this.valid = true : this.id = this.activatedRoute.snapshot.params['idFilm'];

  }

  ngOnInit() {
    this.validateRoute();
  }


  validateRoute() {
    if (this.valid) {
      const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      this.getAllCharacter(ids)

    } else {
      this.getIdFilm(this.id)
    }
  }

  getIdFilm(id) {
    this.filmsService.getIdFilm(id).subscribe(async (result: any) => {
      let allCharacter = []
      await this.characterService.getIdCharacter(result.characters).subscribe(async response => {
        await allCharacter.push(response)
      })
      await this.filmsService.getAllFilms().subscribe(async (result: any) => {
        for (let character of allCharacter) {
          character['dataFilms'] = []
          await character.films.forEach(async element => {
            let idFilmCharacter = element.split('/')[5]
            await result.results.filter(async data => {
              let id = data.url.split('/')[5]
              id === idFilmCharacter ? character['dataFilms'].push(data) : null;
            })
          });
        }
      })
      this.characters = allCharacter;
      this.pagination = this.characters.length;
    })
  }

  async getAllCharacter(ids) {
    await this.filmsService.getAllFilms().subscribe(async (result: any) => {
      await this.characterService.getAllCharacter(ids).subscribe(async (characters: any) => {
        await characters.results.forEach(character => {
          character['dataFilms'] = []
          character.films.forEach(id => {
            result.results.filter(res => {
              let url = res.url.split('/')[5]
              id.split('/')[5] === url ? character['dataFilms'].push(res) : null
            })
          })
          this.characters.push(character)
        });
      })
      this.pagination = this.characters.length
    })
  }
}
