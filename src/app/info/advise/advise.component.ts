import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-advise",
  templateUrl: "./advise.component.html",
  styleUrls: ["./advise.component.scss"]
})
export class AdviseComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle("Coronavirus COVID-19 : conseils et informations");
    const tags = [
      { name: "description", content: "Consejos COVID-19" },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      { name: "og:url", content: "https://casoscovid19.com/infos/conseils" },
      { name: "og:title", content: "Consejos COVID-19" },
      { name: "og:description", content: "Consejos COVID-19" },
      {
        name: "og:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Consejos COVID-19" },
      { name: "twitter:description", content: "Consejos COVID-19" },
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
