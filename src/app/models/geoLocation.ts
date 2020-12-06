export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  options: Option;
}

export interface Option {
  allowTextOverlay: boolean;
  background: string;
  fontColor: string;
}
