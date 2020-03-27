import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gouv',
  templateUrl: './gouv.component.html',
  styleUrls: ['./gouv.component.scss']
})
export class GouvComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {
   }

  ngOnInit(): void {
    this.initMetaTag();
  }

  private initMetaTag(): void {
    this.title.setTitle('Infos et attestations Coronavirus COVID-19 du gouvernement');
    const tags = [
      { name: 'description', content: 'Retrouver les informations et les attestations de sortie du Gouvernement à cause du Coronavirus COVID-19' },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: 'https://www.cascoronavirus.fr/' },
      { name: 'og:url', content: 'https://www.cascoronavirus.fr/infos/gouvernement' },
      { name: 'og:title', content: 'Infos et attestations Coronavirus COVID-19 du gouvernement' },
      { name: 'og:description', content: 'Retrouver les informations et les attestations de sortie du Gouvernement à cause du Coronavirus COVID-19' },
      { name: 'og:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Infos et attestations Coronavirus COVID-19 du gouvernement' },
      { name: 'twitter:description', content: 'Retrouver les informations et les attestations de sortie du Gouvernement à cause du Coronavirus COVID-19' },
      { name: 'twitter:image', content: 'https://www.cascoronavirus.fr/assets/images/meta_og.png' },
      { name: 'twitter:site', content: '@SouryvathN' },
    ];
    tags.forEach((tag) => {
      this.meta.updateTag(tag);
    });
  }

}
