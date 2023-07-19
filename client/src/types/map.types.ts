export interface IMapState {
  theme: "light" | "dark";
  viewState: IViewState;
  mapStyle: EnumMapStyle;
  courtsType: EnumMapCourtType;
}

export interface IViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type TMapStylePayload = "light" | "dark" | "satellite";

export enum EnumMapCourtType {
  ALL = "all",
  BASKETBALL = "basketball",
  FOOTBALL = "football",
}

export enum EnumMapStyle {
  LIGHT = "mapbox://styles/mapbox/outdoors-v12",
  DARK = "mapbox://styles/mapbox/dark-v11",
  SATELlITE = "mapbox://styles/mapbox/satellite-streets-v12",
}
