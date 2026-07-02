/* Fake "fullscreen" that fills the browser window instead of the monitor.
The native Fullscreen API always targets the monitor, so we just pin YouTube's player to the viewport with CSS and toggle it with Alt+W.
*/

const style = document.createElement("style");
style.textContent = `
  /* Hide everything, then re-reveal the player subtree. z-index alone isn't
     enough because YouTube's masthead/sidebar/chat sit in their own stacking
     contexts (transforms, sticky), so it can't out-rank them; visibility can
     be overridden by descendants even when an ancestor sets it hidden. */
  html.ytwin-active body * {
    visibility: hidden !important;
  }
  html.ytwin-active #movie_player,
  html.ytwin-active #movie_player * {
    visibility: visible !important;
  }
  html.ytwin-active #movie_player {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 2147483647 !important;
    background: #000 !important;
  }
  html.ytwin-active { overflow: hidden !important; }
`;
document.documentElement.appendChild(style);

function toggle() {
  document.documentElement.classList.toggle("ytwin-active");
  // Nudge YouTube to recompute control/video layout for the new size.
  window.dispatchEvent(new Event("resize"));
}

window.addEventListener(
  "keydown",
  (e) => {
    if (e.altKey && !e.ctrlKey && !e.metaKey && e.code === "KeyW") {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    } else if (e.code === "Escape" && document.documentElement.classList.contains("ytwin-active")) {
      toggle();
    }
  },
  true // capture, so YouTube's own handlers don't eat the key first
);
