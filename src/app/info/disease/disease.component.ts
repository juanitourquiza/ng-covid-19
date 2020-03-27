import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.title.setTitle('Coronavirus COVID-19 : informations, symptômes, conseils');
    const tags = [
      { name: 'description', content: 'Retrouvez les informations du Coronavirus COVID-19 : symptômes, conseils, vaccins, confinement, transmission, maladie' },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:url', content: 'https://www.cascoronavirus.fr/infos/maladie-coronavirus' },
      { name: 'og:title', content: 'Coronavirus COVID-19 : informations, symptômes, conseils' },
      { name: 'og:description', content: 'Retrouvez les informations du Coronavirus COVID-19 : symptômes, conseils, vaccins, confinement, transmission, maladie' },
      { name: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Coronavirus COVID-19 : informations, symptômes, conseils' },
      { name: 'twitter:description', content: 'Retrouvez les informations du Coronavirus COVID-19 : symptômes, conseils, vaccins, confinement, transmission, maladie' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}
