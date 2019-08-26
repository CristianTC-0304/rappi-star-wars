import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../core/http/films.service';
import { CharacterService } from '../core/http/character.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  dataFilms: any[];

  constructor(
    private filmsService : FilmsService,
    private characterService : CharacterService
  ) { }

  ngOnInit() {
    this.getDataFilms()
  }

  async getDataFilms() {
      await this.filmsService.getAllFilms().subscribe(async (result : any) => {
          const urlImage = [
            "assets/img/Star-Wars-New-Hope-IV-Poster_c217085b.webp",
            "assets/img/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg",
            "assets/img/Star-Wars-Phantom-Menace-I-Poster_f5832812.webp",
            "assets/img/Star-Wars-Revenge-Sith-III-Poster_646108ce.webp",
            "assets/img/Star-Wars-Return-Jedi-VI-Poster_a10501d2.jpeg",
            "assets/img/Star-Wars-Empire-Strikes-Back-V-Poster_878f7fce.jpeg",
            "assets/img/avco_payoff_1-sht_v7_lg_32e68793.webp"
          ]
            let count = 0
          this.dataFilms = await result.results.map((data)=>{
              data.img = urlImage[count]
              data.id = data.url.split('/')[5];
              count++;
              return data;
            })
        });   
  }
}
