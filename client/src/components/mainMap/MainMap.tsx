"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useActions } from "@/hooks/useActions";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import Map, { Marker, ViewStateChangeEvent, useMap } from "react-map-gl";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const MainMap = () => {
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const { viewState, mapStyle } = useAppSelector((s) => s.map);
  const { user } = useAppSelector((s) => s.user);
  const { setViewState } = useActions();
  const loadingRef = useRef<HTMLDivElement>(null);

  const onMapMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  return (
    <>
      <CSSTransition
        nodeRef={loadingRef}
        in={isLoadingScreen}
        timeout={1700}
        classNames="loading-hide"
        unmountOnExit
      >
        <LoadingScreen ref={loadingRef} />
      </CSSTransition>

      <Map
        id="map"
        reuseMaps
        {...viewState}
        onMove={onMapMove}
        mapStyle={mapStyle}
        //   onClick={handleMapClick}
        onLoad={() => setIsLoadingScreen(false)}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      ></Map>
    </>
  );
};

export default MainMap;
