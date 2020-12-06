export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  background: string;
  options?: Option;
}

interface Option {
  allowTextOverlay: boolean;
  background: string;
  fontColor: string;
}
