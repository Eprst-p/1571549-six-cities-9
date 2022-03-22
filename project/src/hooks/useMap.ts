/* eslint-disable no-console */
import {useEffect, useState, MutableRefObject} from 'react';
import {offerType, offerTypes} from '../types/offer-types';
import {Map, Marker, LayerGroup} from 'leaflet';
import {City} from '../types/city';
import {defaultPin, chosenPin} from '../settings/map-settings';
import {MapVariant} from '../settings/map-settings';
import leaflet from 'leaflet';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  chosenOffer: offerType | undefined,
  offers: offerTypes,
  variant: MapVariant,
): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const city: City | undefined = offers[0].city;

  const createMap = () => {
    let centralLocation:City | offerType | undefined;
    switch (variant) {
      case MapVariant.MainMap:
        centralLocation = city;
        break;
      case MapVariant.RoomMap:
        centralLocation = chosenOffer;
        break;
    }
    if (mapRef.current !== null && centralLocation!==undefined) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: centralLocation.location.latitude,
          lng: centralLocation.location.longitude,
        },
        zoom: centralLocation.location.zoom,
      });
      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);
      setMap(instance);
    };
  };

  const moveMapToCity = (newCity: City | undefined, viewedMap: Map) :void => {
    if (newCity) {
      viewedMap.flyTo({lat: newCity.location.latitude, lng: newCity.location.longitude}, newCity.location.zoom);
    }
  };

  const setMarkers = (viewedMap: Map):LayerGroup => {
    const groupMarkers = new LayerGroup();
    switch (variant) {
      case MapVariant.MainMap:
        offers.forEach((offer) => {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          });
          marker
            .setIcon(
              chosenOffer !== undefined  && offer.id === chosenOffer.id
                ? chosenPin
                : defaultPin
            )
            .addTo(groupMarkers)
        });
        break;
      case MapVariant.RoomMap:
        offers.forEach((offer) => {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          });
          marker
            .setIcon(defaultPin)
            .addTo(groupMarkers)
        });
        if (chosenOffer) {
          const  orangeMarker = new Marker({
            lat: chosenOffer.location.latitude,
            lng: chosenOffer.location.longitude
          });
          orangeMarker
            .setIcon(chosenPin)
            .addTo(groupMarkers)
        }
        break;
    }
    groupMarkers.addTo(viewedMap);
    return groupMarkers;
  };

  useEffect(() => {
    let groupMarkers: LayerGroup;
    if (map === null) {
      createMap();
    }
    if (map) {
      if (variant===MapVariant.MainMap) {
        moveMapToCity(city, map);
      }
      groupMarkers = setMarkers(map);
    }
    return () => {
        map?.removeLayer(groupMarkers);
    };
  }, [map, offers, variant]);

  return map;
};

export default useMap;
