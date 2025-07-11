import { App } from "astal/gtk4";
import style from "./style.scss";
import Bar from "./widget/Bar";

App.start({
  css: style,
  main() {
    Bar(App.get_monitors()[0]);
    Bar(App.get_monitors()[1]);
  },
});
