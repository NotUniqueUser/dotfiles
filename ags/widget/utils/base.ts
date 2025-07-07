import { Astal, Gtk } from "astal/gtk4";

const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor;
const { END, START, FILL, CENTER } = Gtk.Align;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export {
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
  END,
  START,
  FILL,
  CENTER,
  lerp,
};
