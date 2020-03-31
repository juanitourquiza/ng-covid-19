import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-disease-test",
  templateUrl: "./disease-test.component.html",
  styleUrls: ["./disease-test.component.scss"]
})
export class DiseaseTestComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle("Test Sintomas COVID-19");
    const tags = [
      { name: "description", content: "Test Sintomas COVID-19" },
      { name: "og:type", content: "website" },
      { name: "og:site_name", content: "https://casoscovid19.com/" },
      {
        name: "og:url",
        content: "https://casoscovid19.com/infos/maladie-test-coronavirus"
      },
      { name: "og:title", content: "Test Sintomas COVID-19" },
      { name: "og:description", content: "Test Sintomas COVID-19" },
      {
        name: "og:image",
        content: "https://casoscovid19.com/assets/images/meta_og.png"
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Test Sintomas COVID-19" },
      { name: "twitter:description", content: "Test Sintomas COVID-19" },
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
