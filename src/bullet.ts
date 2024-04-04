import { MoveAbleObject } from "./MoveAbleObject";
import { MoveEngine } from "./MoveEngine";
import { Direction, Point } from "./types";

export class Bullet extends MoveAbleObject {
  private _isPlayerBullet: boolean;
  private _isBulletDie : boolean = false;

  constructor(isPlayer: boolean) {
    super("tank-bullet");
    this.speed = 200;
    this.imageObject.setImageVisibility();
    this.imageObject.visible =false;
    this.moveEngine = new MoveEngine(false, false);
    this.isPlayerBullet = isPlayer;
  }

  get isPlayerBullet() {
    return this._isPlayerBullet;
  }

  get isBulletDie() {
    return this._isBulletDie;
  }
  
  set isPlayerBullet(isPlayer: boolean) {
    this._isPlayerBullet = isPlayer;
  }

  set isBulletDie(isBulletDie) {
    this._isBulletDie = isBulletDie;
  }

  public triggerFire(position: Point, direction: Direction) {
    this.imageObject.visible = true;
    this.setBulletPosition(position, direction);
    this.moveEngine.direction = direction;
  }

  private setBulletPosition(position: Point, direction: Direction) {
    if (direction === Direction.DOWN) {
      this.imageObject.position = {x : position.x + 25, y : position.y + 75};
    }
    if (direction === Direction.UP) {
      this.imageObject.position = {x : position.x + 25, y : position.y - 25};
    }
    if (direction === Direction.RIGHT) {
      this.imageObject.position = {x : position.x + 75, y : position.y + 25};
    }
    if (direction === Direction.LEFT) {
      this.imageObject.position = {x : position.x - 25, y : position.y + 25};
    }
  }

  public removeBullet() {
    this.imageObject.visible = false; 
  }

  public update(dt: number) {
    this._move(dt, true);
    
    if (
      this.imageObject.position?.x < 1 ||
      this.imageObject.position?.x > 499 ||
      this.imageObject.position?.y < 1 ||
      this.imageObject.position?.y > 499
    ) {
      this.removeBullet();
      this.isBulletDie = true;
    }
  }
}
