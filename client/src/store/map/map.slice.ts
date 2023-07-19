import {
  EnumMapCourtType,
  EnumMapStyle,
  IMapState,
  IViewState,
  TMapStylePayload,
} from "@/types/map.types";
import { createSlice } from "@reduxjs/toolkit";
import { ViewState } from "react-map-gl";

const initialState: IMapState = {
  theme: "light",
  viewState: {
    latitude: 49.98116900406845,
    longitude: 36.27474511029263,
    zoom: 9.802041876073677,
  },
  mapStyle: EnumMapStyle.LIGHT,
  courtsType: EnumMapCourtType.ALL,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (state.theme === "dark") {
        state.mapStyle = EnumMapStyle.DARK;
      } else if (state.theme === "light") {
        state.mapStyle = EnumMapStyle.LIGHT;
      }
    },
    setViewState: (state, { payload }: { payload: IViewState }) => {
      state.viewState = payload;
    },
    setMapStyle: (state, { payload }: { payload: TMapStylePayload }) => {
      switch (payload) {
        case "light":
          state.mapStyle = EnumMapStyle.LIGHT;
          break;
        case "dark":
          state.mapStyle = EnumMapStyle.DARK;
          break;
        case "satellite":
          state.mapStyle = EnumMapStyle.SATELlITE;
          break;
      }
    },
    setCourtsType: (state, { payload }: { payload: EnumMapCourtType }) => {
      state.courtsType = payload;
    },
  },
});

export const mapActions = mapSlice.actions;
