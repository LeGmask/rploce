export class Canvas {
  ScalingFactor = 50; // 10px per cell

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.get_grid().then(() => {
      this.render();

    });
  }

  render_grid() {
    const grid_lines = this.grid.length;
    const grid_columns = this.grid[0].length;

    for (let i = 0; i < grid_lines; i++) {
      this.ctx.moveTo(0, i * this.ScalingFactor);
      this.ctx.lineTo(grid_columns * this.ScalingFactor, i * this.ScalingFactor);
    }
    for (let j = 0; j < grid_columns; j++) {
      this.ctx.moveTo(j * this.ScalingFactor, 0);
      this.ctx.lineTo(j * this.ScalingFactor, grid_lines * this.ScalingFactor);
    }
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }

  render() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        this.ctx.fillStyle = this.grid[i][j];
        this.ctx.fillRect(i * this.ScalingFactor, j * this.ScalingFactor, this.ScalingFactor, this.ScalingFactor);
      }
    }
    this.render_grid();
  }

  async get_grid() {
    const response = await fetch('http://localhost:3003/canvas');
    this.grid = await response.json();
  }

  async handleClick(e, color) {
    const x = Math.floor(e.clientX / this.ScalingFactor);
    const y = Math.floor(e.clientY / this.ScalingFactor);

    if (x >= this.grid.length || y >= this.grid[0].length) return; // out of bounds

    let response = await fetch('http://localhost:3003/canvas', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        x, y, color
      })
    });
    this.grid = await response.json();
    console.log(this.grid);
    this.render(); // flush canvas
  }
}