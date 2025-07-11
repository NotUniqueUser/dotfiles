import { bind, Variable } from "astal";
import { Gdk } from "astal/gtk4";
import AstalHyprland from "gi://AstalHyprland";

const hypr = AstalHyprland.get_default();
const workspaces = bind(hypr, "workspaces");

export default function Workspace(gdkmonitor: Gdk.Monitor) {
  return (
    <box>
      {workspaces.as((ws) => {
        return ws
          .filter((w) => w.monitor.name === gdkmonitor.connector)
          .sort((a, b) => a.id - b.id)
          .map((w) => <label label={w.id.toString()} />);
      })}
    </box>
  );
}
