import { App } from "astal/gtk4";
import { exec, Variable } from "astal";

import { END, lerp } from "./utils/base";
import { flavors } from "@catppuccin/palette";

const colors = flavors.mocha.colors;
let pollCalibrate = 1000;
const dateTime = Variable("01/01/01 10:10:10").poll(
  pollCalibrate,
  "date '+%x %X %N'",
);

// Make border interpolate color and calibrate
// Subscribe for calibration
dateTime.subscribe((t) => {
  const ms = Number(t.slice(18, 21));
  dateTime.stopPoll();
  // If calibration is within 10ms, return to 1s polling
  pollCalibrate = 1000 - ms;
  setTimeout(() => {
    dateTime.poll(pollCalibrate, `date '+%x %X %N'`);
  }, pollCalibrate);
});

// Subscribe for color interpolation
dateTime.subscribe((t) => {
  const hour = Number(t.slice(9, 11));
  const minute = Number(t.slice(12, 14));
  const second = Number(t.slice(15, 17));

  const seconds = hour * 3600 + minute * 60 + second;
  const t_lerp = 0.5 * (1 - Math.cos((2 * Math.PI * seconds) / 86400));

  // TOOD maybe move to utils
  const g = Math.round(lerp(colors.yellow.rgb.g, colors.blue.rgb.g, t_lerp));
  const b = Math.round(lerp(colors.yellow.rgb.b, colors.blue.rgb.b, t_lerp));
  const r = Math.round(lerp(colors.yellow.rgb.r, colors.blue.rgb.r, t_lerp));

  const rgb = `${r},${g},${b}`;

  App.apply_css(`
     .colored-time {
       color: rgb(${rgb});
     }

     .button-border {
       border: 2px solid rgba(${rgb}, 0.8);
     }`);
});

function styledTime(time: String) {
  const ret = [...time].map((char) =>
    char === "0" ? (
      <label label={char} cssClasses={["colored-time"]} />
    ) : (
      <label label={char} cssClasses={["regular-time"]} />
    ),
  );
  return ret;
}

function seperateTime(timeDate: String) {
  const date = timeDate.slice(0, 8);
  const time = timeDate.slice(9, 17);

  return (
    <box halign={END}>
      <box>
        {[
          <label label={"󰥔"} cssClasses={["colored-time", "time-icon"]} />,
          ...styledTime(time),
        ]}
      </box>
      <box>
        {[
          <label label={" 󰃭"} cssClasses={["colored-time", "time-icon"]} />,
          ...styledTime(date),
        ]}
      </box>
    </box>
  );
}

export default function MenuButton() {
  return (
    <menubutton
      cssName="time"
      widthRequest={100}
      hexpand
      halign={END}
      cssClasses={["button-border"]}
      child={dateTime().as(seperateTime)}
      tooltip_text={exec("cal -n 2")}
    />
  );
}
