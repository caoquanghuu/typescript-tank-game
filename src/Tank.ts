import { MoveEngine } from "./MoveEngine";
import { Bullet } from "./bullet";
import { MoveAbleObject } from "./MoveAbleObject";
import { PositionMap } from "./Map";

export class Tank extends MoveAbleObject {
  private _bullet: Bullet[] = [];
  private _isPlayerTank: boolean;
  private _tankStatus: boolean = true; // alive = true, die = false.
  private _isCollisionWithOtherTanks: boolean = false;
  readonly _positionMap: PositionMap;

  constructor(isPlayer: boolean = false) {
    super(isPlayer ? "tank-1" : "tank-2");

    this._isPlayerTank = isPlayer;

    this._positionMap = new PositionMap();

    if (isPlayer) {
      this.moveEngine = new MoveEngine(true);

      document.addEventListener("keyup", this.onKeyUp.bind(this));
    } else {
      this.moveEngine = new MoveEngine(false, true);

      setInterval(() => {
        this.fireBullet(false);
      }, 7000);
    }
  }

  get bullet(): Bullet[] {
    return this._bullet;
  }

  get tankStatus() {
    return this._tankStatus;
  }

  get isPlayerTank() {
    return this._isPlayerTank;
  }

  get isCollisionWithOtherTanks() {
    return this._isCollisionWithOtherTanks;
  }

  set isPlayerTank(isPlayer: boolean) {
    this._isPlayerTank = isPlayer;
  }

  set tankStatus(status: boolean) {
    this._tankStatus = status;
  }

  set isCollisionWithOtherTanks(isCollision: boolean) {
    this._isCollisionWithOtherTanks = isCollision;
  }

  private onKeyUp(event: any) {
    if (event.keyCode === 32) {
      // Fire bullet.
      this.fireBullet(true);
    }
  }

  private fireBullet(isPlayerBullet: boolean) {
    if (this.tankStatus) {
      const direction = this.lastDirection;
      const newBullet = new Bullet(isPlayerBullet);
      newBullet.triggerFire(this.imageObject.position, direction);
      this._bullet.push(newBullet);
    }
  }

  private removeBulletOfTank() {
    const a = this._bullet.findIndex((bullet) => bullet.isBulletDie === true);
    if (a != -1) {
      this._bullet.splice(a, 1);
    }
  }

  public update(deltaTime: number) {
    // di chuyen
    this.moveEngine.update(deltaTime);
    this._move(deltaTime, false);
    this._bullet.forEach((bullet) => bullet.update(deltaTime));
    // tank status
    this.tankStatus;

    // check bullet
    this.removeBulletOfTank();

    PositionMap.setPositionMap(
      this.imageObject.position,
      this._positionMap.keyInStaticArrayPosition
    );
  }
}
