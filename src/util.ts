import { Point } from "./types";

export function getRandomArbitrary(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomEnumKey = (enumeration: any) => {
  const keys = Object.keys(enumeration).filter(
    (k) => !(Math.abs(Number.parseInt(k)) + 1)
  );
  const enumKey = keys[Math.floor(Math.random() * keys.length)];
  return enumeration[enumKey];
};

export function getDistanceOfTwoPosition(pos1: Point, pos2: Point) {
  const distance: number = Math.sqrt(
    Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
  );
  return distance;
}
