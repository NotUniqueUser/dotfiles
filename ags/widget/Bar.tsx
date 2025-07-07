import { App, Astal, Gdk } from "astal/gtk4";

import ActiveWindow from "./ActiveWindow";
import TimeButton from "./Time";
import Tray from "./Tray";
import { END, LEFT, RIGHT, TOP } from "./utils/base";
import Playback from "./Playback";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      visible
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
      child={
        <centerbox
          hexpand
          cssName="centerbox"
          startWidget=<Tray />
          centerWidget=<ActiveWindow />
          endWidget=<box halign={END}>{[<Playback />, <TimeButton />]}</box>
        />
      }
    />
  );
}
