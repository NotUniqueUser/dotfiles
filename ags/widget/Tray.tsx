import AstalTray from "gi://AstalTray";
import { bind } from "astal";

const tray = AstalTray.get_default();

export default function Tray() {
  return (
    <box cssName="tray">
      {bind(tray, "items").as((items) =>
        items.map((item) => (
          <menubutton
            cssName="trayButton"
            setup={(self) => {
              self.insert_action_group("dbusmenu", item.action_group);
            }}
            tooltipMarkup={bind(item, "tooltipMarkup")}
            menuModel={bind(item, "menuModel")}
            child={
              <image css_classes={["tray-icon"]} gicon={bind(item, "gicon")} />
            }
          />
        )),
      )}
    </box>
  );
}
