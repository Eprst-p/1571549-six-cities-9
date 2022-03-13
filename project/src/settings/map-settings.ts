import {Icon} from 'leaflet';

export enum MapVariants  {
  MainMap = 'MAIN_MAP',
  RoomMap = 'ROOM_MAP',
};

export enum MapHeights {
  MainMap = '794px',
  RoomMap = '579px',
};

const defaultPin = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [25, 35],
  iconAnchor: [20, 35]
});

const chosenPin = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [25, 35],
  iconAnchor: [20, 35]
});

export {defaultPin, chosenPin};