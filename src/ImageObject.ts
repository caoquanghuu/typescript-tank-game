import { Direction, Point } from "./types";

export class ImageObject {
    private _image : HTMLDivElement;
    private _position : Point = {x : 0, y: 0};


    get image() {
        return this._image;
    }

    set image(image : HTMLDivElement) {
        this._image = image;
    }

    get position() : Point {
        return this._position;
    }

    set position(position : Point) {
        this._position = position;
        this._image.style.top = `${position.y}px`;
        this._image.style.left = `${position.x}px`;
    }

    public setAbsolutePosition() {
        this._image.style.position = 'absolute';
    }

    public setImageVisibility() {
        this._image.style.visibility = 'auto';
    }

    set visible(visible: boolean) {
        this._image.style.display = visible ? "inherit" : "none";
    }

    get visible() {
        return this._image.style.display !== "none";
      }


    public rotateImage(direction : Direction) {
        switch (direction) {
            case Direction.UP:
              this._image.style.transform = "rotate(0deg)";
              break;
            case Direction.DOWN:
              this._image.style.transform = "rotate(180deg)";
              break;
            case Direction.LEFT:
              this._image.style.transform = "rotate(270deg)";
              break;
            case Direction.RIGHT:
              this._image.style.transform = "rotate(90deg)";
              break;
            default:
        }
    }

    
}