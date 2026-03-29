// import { io } from "socket.io-client"
// import API_URL from "../config"

// const socket = io(API_URL)

// export default socket

import { io } from "socket.io-client"
import API_URL from "../config"

const socket = io(API_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000
})

export default socket