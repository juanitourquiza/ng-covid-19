import { Component, OnInit } from "@angular/core";
import { COUNTRIES } from "@coronavirus/constants/countries.constants";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-coronavirus-links",
  templateUrl: "./coronavirus-links.component.html",
  styleUrls: ["./coronavirus-links.component.scss"]
})
export class CoronavirusLinksComponent implements OnInit {
  countries: any[] = COUNTRIES;
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
      { name: "og:url", content: "https://casoscovid19.com/" },
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
