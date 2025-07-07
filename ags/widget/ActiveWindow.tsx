import { bind, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";

const hypr = Hyprland.get_default();

const client = bind(hypr, "focusedClient");
const clientTitle = Variable(client.get()?.title);
const clientName = Variable(client.get()?.class);

// The default implementation of AstalHyprland is shit and doesn't update immediately
hypr.connect("event", (_, e, arg) => {
  if (e === "windowtitlev2") {
    const index = arg.indexOf(",");
    const id = arg.slice(0, index);
    const title = arg.slice(index + 1);

    if (id === client.get().address) {
      clientTitle.set(title);
    }
  } else if (e === "activewindow") {
    const index = arg.indexOf(",");
    const class_ = arg.slice(0, index);
    const title = arg.slice(index + 1);

    clientName.set(class_);
    clientTitle.set(title);
  }
});

function shortenTitle(title: string): string {
  title = title ?? "";
  if (title.length > 50) {
    title = title.slice(0, 50) + "...";
  }
  return title;
}

export default function ActiveWindow() {
  return (
    <box cssName="activeWindow">
      <label
        label={clientName().as((c) => "" + c + " ")}
        cssClasses={["activeClass"]}
      />
      <label
        label={clientTitle().as(shortenTitle)}
        cssClasses={["activeTitle"]}
      />
    </box>
  );
}
