import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-coronavirus-stats',
  templateUrl: './coronavirus-stats.component.html',
  styleUrls: ['./coronavirus-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusStatsComponent {

  @Input() mainStats;
  @Input() data;
  @Input() selectedCountry;

  @Output() readonly updateMapEvent: EventEmitter<string> = new EventEmitter<string>(true);

  updateMap(type: string): void {
    this.updateMapEvent.emit(type);
  }
}
