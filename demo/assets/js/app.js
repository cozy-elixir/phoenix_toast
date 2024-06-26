import "phoenix_html"
import { Socket } from "phoenix"
import { LiveSocket } from "phoenix_live_view"
import createPhoenixNotifHook from "../../../assets/phoenix_notif"

const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
const liveSocket = new LiveSocket("/live", Socket, {
  longPollFallbackMs: 2500,
  params: { _csrf_token: csrfToken },
  hooks: {
    PhoenixNotif: createPhoenixNotifHook({ maxShownNotifications: 5 }),
  },
})

// connect if there are any LiveViews on the page
liveSocket.connect()

window.addEventListener("phx:close-menu", (e) => {
  const menu = document.querySelector("aside#main-navigation")
  menu.classList.remove("max-md:block")

  const backdrop = document.querySelector("#backdrop")
  backdrop.classList.remove("max-md:block")
})

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket
