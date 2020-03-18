export interface DetailedStat {
  cases?: number;
  todayCases?: number;
  recovered?: number;
  deaths?: number;
  todayDeaths?: number;
  country?: string;
}

export interface MainStat {
  confirmed?: Pair;
  recovered?: Pair;
  deaths?: Pair;
}

export interface Pair {
  value?: string;
  detail?: string;
}
