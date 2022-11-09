import { Component, OnInit } from '@angular/core';
import { CatService, breedsData } from './services/cat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Cat Pictures';
  catList: string[] = ['All'];
  catIdList: string[] = [''];
  breed: string = '';
  limit: number = 10;

  constructor(private catService: CatService) {
  }

  ngOnInit(): void {
    this.catService.getCatBreeds().subscribe((cats) => {
      Object.values(cats).map((cat: breedsData) => {
        const { name, id } = cat;
        
        this.catList.push(name);
        this.catIdList.push(id);
      });
    })
  }
}
