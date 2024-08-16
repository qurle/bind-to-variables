// Imports
import { bindVariables } from './bindVariables'
// Variables
let notification: NotificationHandler
let working = false

figma.on("currentpagechange", cancel)

// Main + Elements Check
figma.on('run', async ({ parameters }: RunEvent) => {
  working = true
  await bindVariables()
  finish()
})

// Ending the work
function finish() {
  working = false
  // notify(confirmMsgs[Math.floor(Math.random() * confirmMsgs.length)])
  setTimeout(() => { console.log("Timeouted"), figma.closePlugin() }, 3000)
}

// Show new notification
function notify(text: string) {
  if (notification != null)
    notification.cancel()
  notification = figma.notify(text)
}

// Showing interruption notification
function cancel() {
  if (notification != null)
    notification.cancel()
  if (working) {
    notify("Plugin work have been interrupted")
  }
}