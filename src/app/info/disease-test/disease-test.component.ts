import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-disease-test',
  templateUrl: './disease-test.component.html',
  styleUrls: ['./disease-test.component.scss']
})
export class DiseaseTestComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.title.setTitle('Faites un test de symptômes du Coronavirus COVID-19');
    const tags = [
      { name: 'description', content: 'Faites un test pour savoir si vous avez les symptômes et la maladie du Coronavirus COVID-19' },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:url', content: 'https://www.cascoronavirus.fr/infos/maladie-test-coronavirus' },
      { name: 'og:title', content: 'Faites un test de symptômes du Coronavirus COVID-19' },
      { name: 'og:description', content: 'Faites un test pour savoir si vous avez les symptômes et la maladie du Coronavirus COVID-19' },
      { name: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Faites un test de symptômes du Coronavirus COVID-19' },
      { name: 'twitter:description', content: 'Faites un test pour savoir si vous avez les symptômes et la maladie du Coronavirus COVID-19' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}
