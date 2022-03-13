import {useRef} from 'react';
import useRoomMap from '../../hooks/useRoomMap';
import {offerType, offerTypes} from '../../types/offer-types';
import {MapHeights} from '../../settings/map-settings';

type RoomMapProps = {
  chosenOffer: offerType | undefined;
  offers: offerTypes;
}

function RoomMap({chosenOffer, offers} : RoomMapProps): JSX.Element {

  const mapRef = useRef(null);
  useRoomMap(mapRef, chosenOffer, offers);

  return (
    <div
      style={{height: MapHeights.RoomMap}}
      ref={mapRef}
    />
  );
}

export default RoomMap;