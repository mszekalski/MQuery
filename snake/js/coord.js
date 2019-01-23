class Coord {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  plus(coordinates) {
    return new Coord(this.i + coordinates.i, this.j + coordinates.j);
  }

  equals(coordinates) {
    return this.i === coordinates.i && this.j === coordinates.j;
  }
}

export default Coord;
