"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useActions } from "@/hooks/useActions";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import Map, { Marker, ViewStateChangeEvent, useMap } from "react-map-gl";
import LoadingScreen from "../loadingScreen/LoadingScreen";

// interface IMainMapProps {
//   setIsLoadingScreen: Dispatch<SetStateAction<boolean>>;
// }

const MainMap = () => {
  const { viewState, mapStyle } = useAppSelector((s) => s.map);
  const { user } = useAppSelector((s) => s.user);
  const { setViewState } = useActions();

  const onMapMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  return (
    <>
      <LoadingScreen />

      <Map
        id="map"
        reuseMaps
        {...viewState}
        onMove={onMapMove}
        mapStyle={mapStyle}
        //   onClick={handleMapClick}
        // onLoad={() => setIsLoadingScreen(false)}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      ></Map>
    </>
  );
};

export default MainMap;
