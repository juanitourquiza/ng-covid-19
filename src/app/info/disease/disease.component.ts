import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-disease",
  templateUrl: "./disease.component.html",
  styleUrls: ["./disease.component.scss"]
})
export class DiseaseComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle(
      "Coronavirus COVID-19 : informations, symptômes, conseils"
    );
    const tags = [
      { name: "description", content: "Casos COVID19" },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      {
        name: "og:url",
        content: "https://casoscovid19.com/infos/maladie-coronavirus"
      },
      { name: "og:title", content: "Casos COVID19" },
      { name: "og:description", content: "Casos COVID19" },
      {
        name: "og:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Casos COVID19" },
      { name: "twitter:description", content: "Casos COVID19" },
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
