import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-gouv",
  templateUrl: "./gouv.component.html",
  styleUrls: ["./gouv.component.scss"]
})
export class GouvComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.initMetaTag();
  }

  private initMetaTag(): void {
    this.title.setTitle("Información de Gobierno");
    const tags = [
      {
        name: "description",
        content: "Casos COVID19"
      },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      {
        name: "og:url",
        content: "https://casoscovid19.com/infos/gouvernement"
      },
      {
        name: "og:title",
        content: "Información de Gobierno"
      },
      {
        name: "og:description",
        content: "Información de Gobierno"
      },
      {
        name: "og:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:title",
        content: "Información de Gobierno"
      },
      {
        name: "twitter:description",
        content: "Información de Gobierno"
      },
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
