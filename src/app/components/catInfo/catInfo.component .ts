import { Component, Input } from "@angular/core";
import { CatService } from "src/app/services/cat.service";

@Component({
  selector: 'app-catInfo',
  templateUrl: './catInfo.component.html',
  styleUrls: ['./catInfo.component.scss'],
})

export class CatInfoComponent {
  @Input() breed: string = '';
  @Input() limit: number = 5;
  loading = true;
  catPics: string[] = [];
  name: string = '';
  link: string = '';
  description: string = 'According to the Material design spec button text has to be capitalized, however we have opted not to capitalize buttons automatically via text-transform: uppercase, because it can cause issues in certain locales. It is also worth noting that using ALL CAPS in the text itself causes issues for screen-readers, which will read the text character-by-character. We leave the decision of how to approach this to the consuming app.';


  constructor(private catService: CatService) {
  }

  ngOnChanges(): void {
    this.catPics = [];
    this.loading = true;

    this.catService.getCatInfo(this.breed, this.limit).subscribe((catsData) => {
      Object.values(catsData).map(catData => {
        this.catPics.push(catData.url);

        if (catData.breeds[0]) {
          const { name, description, cfa_url } = catData.breeds[0];

          this.name = name;
          this.description = description;
          this.link = cfa_url;
        }
      })

      this.loading = false;
    })
  }
}
