import { PositionMap } from "./Map";
import { MoveAbleObject } from "./MoveAbleObject";
import { Tank } from "./Tank";
import { Bullet } from "./bullet";
import { Point } from "./types";
import { getDistanceOfTwoPosition, getRandomArbitrary } from "./util";
const FPS = 60;

export class Game {
  private _tanks: Tank[] = [];

  private _player: Tank;

  private _enemies: Tank[] = [];

  private _playerHP: number = 5;

  private _playerScore: number = 0;

  private _scoreBar = <HTMLDivElement>document.getElementById("current-score");

  private _HPBar = <HTMLDivElement>document.getElementById("current-hp");

  constructor() {
    // Khoi tao update
    setInterval(this.update.bind(this, 1000 / FPS), 1000 / FPS);

    // khoi tao doi tuong
    this._player = new Tank(true);

    setInterval(this.spawnEnemy.bind(this), 20000);

    this._tanks.push(this._player);
  }

  private update(deltaTime: number) {
    this._tanks.forEach((tank) => tank.update(deltaTime));

    this.checkCollisionBetweenTanksAndBullets();
  }

  private getDistanceOfTwoObject(
    object1: MoveAbleObject,
    object2: MoveAbleObject
  ) {
    const pos1 = object1.imageObject.position;
    const pos2 = object2.imageObject.position;
    const distance: number = getDistanceOfTwoPosition(pos1, pos2);
    return distance;
  }

  // kiem tra va cham giua tanks va bullets
  private checkCollisionBetweenTanksAndBullets() {
    // const bullets = this._tanks
    //   .map((tank) => (tank.bullet.imageObject.visible ? tank.bullet : null))
    //   .filter((i) => i);

    const bullets: Bullet[] = [];
    this._tanks.forEach((tank) => {
      tank.bullet.forEach((bullet) => {
        if (bullet.imageObject.visible) {
          bullets.push(bullet);
        }
      });
    });

    this._tanks.forEach((tank) => {
      // tank._position
      const isCollision = bullets.some((bullet) => {
        if (tank.isPlayerTank && bullet.isPlayerBullet) {
          return false;
        }

        if (!tank.isPlayerTank && !bullet.isPlayerBullet) return false;

        const isCollision = this.checkCollision(bullet, tank, 50);
        if (isCollision) {
          bullet.removeBullet();
        }

        return isCollision;
      });

      if (isCollision) {
        this.tankDie(tank);
      }
    });
  }

  private checkCollision(
    a: MoveAbleObject,
    b: MoveAbleObject,
    collisionDistance: number
  ): boolean {
    const distance = this.getDistanceOfTwoObject(a, b);

    return distance <= collisionDistance;
  }

  private tankDie(tankDie: Tank) {
    const isEneTankDie = !tankDie.isPlayerTank;

    // update tank hp
    if (tankDie.isPlayerTank) {
      this._playerHP -= 1;
      this.updateHP();
    }
    //player tank die
    if (this._playerHP === 0) {
      const p = this._tanks.findIndex((tank) => tank === this._player);
      this._tanks.splice(p, 1);
    }
    // update score and remove AI tank
    if (isEneTankDie) {
      this._playerScore += 1;
      this.updateScore();

      // remove tank die position out of position map
      const P = PositionMap._positions.findIndex(
        (position) => position === tankDie.imageObject.position
      );
      PositionMap._positions.splice(P, 1);

      const a = this._tanks.findIndex((tank) => tank === tankDie);
      this._tanks.splice(a, 1);

      const b = this._enemies.findIndex((tank) => tank === tankDie);
      this._enemies.splice(b, 1);

      tankDie.imageObject.visible = false;
      tankDie.bullet.forEach((bullet) => (bullet.imageObject.visible = false));
      tankDie.tankStatus = false;
    }
  }

  private spawnEnemy() {
    const newEne = new Tank();
    let newPosition: Point;

    // random new position which it not same with orther tanks.
    for (let i = 0; i < 999; i++) {
      newPosition = {
        x: getRandomArbitrary(1, 499),
        y: getRandomArbitrary(1, 499),
      };

      const isPositionExistOnMap = PositionMap._positions.some((position) => {
        const distance = getDistanceOfTwoPosition(position, newPosition);
        if (distance <= 70) {
          return true;
        }
      });

      if (!isPositionExistOnMap) break;
    }
    newEne.imageObject.position = {
      x: newPosition.x,
      y: newPosition.y,
    };

    this._enemies.push(newEne);
    this._tanks.push(newEne);
  }

  private updateScore() {
    this._scoreBar.innerHTML = `${this._playerScore}`;
  }

  private updateHP() {
    this._HPBar.innerHTML = `${this._playerHP}`;
  }
}

window.onload = () => {
  new Game();
};
