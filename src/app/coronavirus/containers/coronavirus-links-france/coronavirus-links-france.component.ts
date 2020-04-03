import {
  FRANCE_REGIONS,
  FRANCE_DEPS
} from "@coronavirus/constants/france.constants";
import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-coronavirus-links-france",
  templateUrl: "./coronavirus-links-france.component.html",
  styleUrls: ["./coronavirus-links-france.component.css"]
})
export class CoronavirusLinksFranceComponent implements OnInit {
  regions: any[] = FRANCE_REGIONS;
  departments: any[] = FRANCE_DEPS;

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.initMetaTag();
  }

  private initMetaTag(): void {
    this.title.setTitle("Casos Coronavirus");
    const tags = [
      { name: "description", content: "Casos Coronavirus" },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      {
        name: "og:url",
        content: "https://casoscovid19.com/stats/liens/france"
      },
      { name: "og:title", content: "Casos Coronavirus" },
      { name: "og:description", content: "Casos Coronavirus" },
      {
        name: "og:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:title",
        content:
          "Cas de Coronavirus : suivez les cas du COVID-19 en France et dans le monde"
      },
      { name: "twitter:description", content: "Casos Coronavirus" },
      {
        name: "twitter:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:site", content: "@juanitourquiza" }
    ];
    tags.forEach(tag => {
      this.meta.updateTag(tag);
    });
  }
}
