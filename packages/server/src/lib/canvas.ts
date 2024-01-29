import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'node:fs';

export type T_Canvas = string[][];

export class Canvas {
  private static instance: Canvas;

  private _canvas!: T_Canvas;

  constructor() {
    this.canvas = JSON.parse(
      readFileSync(
        fileURLToPath(new URL('canvas.json', import.meta.url))
      ).toString()
    );
  }

  public static getInstance(): Canvas {
    if (!Canvas.instance) {
      Canvas.instance = new Canvas();
    }

    return Canvas.instance;
  }

  get canvas(): T_Canvas {
    return this._canvas;
  }

  set canvas(canvas: T_Canvas) {
    this._canvas = canvas;
    this.save_canvas(); // backup to the file
  }

  set_pixel(x: number, y: number, color: string): void {
    if (this._canvas === undefined) {
      throw new Error('Canvas not initialized');
    }

    if (x < 0 || x >= this._canvas[0].length) {
      throw new Error('x is out of bounds');
    }

    if (y < 0 || y >= this._canvas.length) {
      throw new Error('y is out of bounds');
    }

    this._canvas[x][y] = color;
    this.save_canvas(); // backup to the file
  }

  private save_canvas(): void {
    if (this._canvas === undefined) {
      throw new Error('Canvas not initialized');
    }

    writeFileSync(
      fileURLToPath(new URL('canvas.json', import.meta.url)),
      JSON.stringify(this._canvas)
    )
  }
}
