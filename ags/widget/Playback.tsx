import { bind, Variable } from "astal";
import { App } from "astal/gtk4";
import AstalCava from "gi://AstalCava";
import Mpris from "gi://AstalMpris";

const mp = Mpris.get_default();
const players = bind(mp, "players");
const isPlaying = Variable(players.get().length > 0);

const blocks = [
  "\u2581",
  "\u2582",
  "\u2583",
  "\u2584",
  "\u2585",
  "\u2586",
  "\u2587",
  "\u2588",
];
const bars = Variable("");
const isHovering = Variable(false);

const currentPosition = Variable(0);
const isSeeking = Variable(false);

const cava = AstalCava.get_default();
cava?.set_framerate(200);
cava?.set_bars(20);
cava?.connect("notify::values", () => {
  let b = "";
  cava
    ?.get_values()
    .map((v) => (b += blocks[Math.min(Math.floor(v * 8), blocks.length - 1)]));
  bars.set(b);
});

players.subscribe((p) => {
  isPlaying.set(p.length > 0);
});

export default function Playback() {
  const currentPlayer = players.get()[0];
  const coverArt = bind(currentPlayer, "artUrl").as(
    (c) => `box.cover-art { background-image: url('${c}'); }`,
  );

  coverArt.subscribe((c) => {
    App.apply_css(c);
  });

  currentPlayer.connect("notify::position", () => {
    if (!isSeeking.get()) {
      currentPosition.set(currentPlayer.position);
    }
  });
  return (
    <menubutton
      cssClasses={["media-widget"]}
      child=<label cssClasses={["playback-icon"]} label={""} />
      // @ts-expect-error
      popover=<popover>
        <box
          visible={isPlaying()}
          onHoverEnter={() => {
            isHovering.set(true);
          }}
          onHoverLeave={() => {
            isHovering.set(false);
            cava?.set_bars(20);
          }}
          cssClasses={["media-player"]}
        >
          {[
            <box
              // This is so bad
              cssClasses={["cover-art"]}
              tooltipText={bind(currentPlayer, "album").as(
                (a) => a ?? "Unkown Album",
              )}
              setup={() => {
                App.apply_css(coverArt.get());
              }}
            />,

            <box vertical cssClasses={["playback-info"]}>
              {[
                <box vertical cssClasses={["playback-title"]}>
                  {[<label label={bind(bars)} cssClasses={["cava"]} />]}
                </box>,
                <slider
                  widthRequest={100}
                  max={bind(currentPlayer, "length")}
                  value={currentPosition()}
                  onNotifyValue={(s) => {
                    isSeeking.set(true);
                    currentPlayer.position = s.value;
                    setTimeout(() => {
                      isSeeking.set(false);
                    }, 100);
                  }}
                />,
              ]}
            </box>,
          ]}
        </box>
      </popover>
    />
  );
}
