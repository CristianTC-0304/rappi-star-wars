import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../core/http/films.service';
import { CharacterService } from '../core/http/character.service';
import { resolve, async } from 'q';

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
        let count = 0;
        for(let character of allCharacter) {
          console.log(character, count)
          await character.films.forEach(element => {
            
            let x = element.split('/')[5]
            console.log(x)
          });
          count++;
        }

      })
      this.characters = allCharacter;
      this.pagination = this.characters.length;
      console.log('characters', this.characters)
    })
  }

  getAllCharacter(ids) {
    this.characterService.getAllCharacter(ids).subscribe((result: any) => {
      console.log('resultttt', result)
      let urls: string [];
      result.results.forEach(element => {
        urls = element.films 
        element['dataFilms'] = [];
      })
      this.filmsService.getIdsFilms(urls).subscribe(response => {
        result.results.forEach(attr => {
          attr['dataFilms'].push(response)
        })
      });
      console.log('response con filmsss', result)
    })
  }
}
