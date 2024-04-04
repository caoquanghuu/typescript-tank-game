import { ImageObject } from "./ImageObject";
import { PositionMap } from "./Map";
import { MoveEngine } from "./MoveEngine";
import { Direction } from "./types";

export class MoveAbleObject {
  private _imageObject: ImageObject;

  private _speed: number;

  private _moveEngine: MoveEngine;

  private _lastDirection: Direction = Direction.STAND;

  constructor(id: string) {
    // id -> _image
    this._imageObject = new ImageObject();
    this._speed = 100;
    this._imageObject.image = document
      .getElementById(id)
      .cloneNode(true) as HTMLDivElement;
    document
      .getElementById("game-container")
      .appendChild(this._imageObject.image);
    this._imageObject.setAbsolutePosition();
  }

  set speed(speed: number) {
    this._speed = speed;
  }

  get moveEngine() {
    return this._moveEngine;
  }

  set moveEngine(moveEngine: MoveEngine) {
    this._moveEngine = moveEngine;
  }

  get lastDirection() {
    return this._lastDirection;
  }

  set lastDirection(direction: Direction) {
    this._lastDirection = direction;
  }

  get imageObject() {
    return this._imageObject;
  }

  public _move(deltaTime: number, isBullet: boolean) {
    if (!this._moveEngine) {
      return;
    }

    const direction = this._moveEngine.direction;
    if (direction === Direction.STAND) {
      return;
    }

    this.lastDirection = direction;

    let nextX;
    let nextY;

    switch (direction) {
      case Direction.UP:
        nextY = this._imageObject.position.y - (this._speed * deltaTime) / 1000;
        nextX = this._imageObject.position.x;
        break;
      case Direction.DOWN:
        nextY = this._imageObject.position.y + (this._speed * deltaTime) / 1000;
        nextX = this._imageObject.position.x;
        break;
      case Direction.LEFT:
        nextY = this._imageObject.position.y;
        nextX = this._imageObject.position.x - (this._speed * deltaTime) / 1000;
        break;
      case Direction.RIGHT:
        nextY = this._imageObject.position.y;
        nextX = this._imageObject.position.x + (this._speed * deltaTime) / 1000;
        break;
      default:
        break;
    }

    const nextPosition = { x: nextX, y: nextY };

    const fixedPosition = PositionMap.getMoveDistance(
      this._imageObject.position,
      nextPosition,
      isBullet
    );

    this._imageObject.position = { x: fixedPosition.x, y: fixedPosition.y };
    this._imageObject.rotateImage(this._moveEngine.direction);
  }
}
