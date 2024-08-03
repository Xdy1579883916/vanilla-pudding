import {io} from 'socket.io-client'
import customParser from 'socket.io-msgpack-parser'
import {BackgroundToolService} from "@/lib/service/backgroundToolService.ts";
import {caller} from "@/lib/caller.ts";


export function socketIoRegister(tools: BackgroundToolService) {
  // admin: https://admin.socket.io/#/

  console.log('tools',tools)

  const socket = io('http://localhost:5311', {
    path: '/live',
    parser: customParser,
    transports: ['websocket'],
  });

  (self as any).ws = socket

  socket.on("rpc", async (detail: any, callback) => {
    const res = await caller(tools, detail)
    callback(res)
  })

  socket.on("rpc-response", async (detail: any) => {
    console.log('rpc-response', detail)
  })


  // test function in console:
  /* ws.emit('use-rpc', {
    callbackId: Date.now(),
    funName: "doRequest",
    args: [
      "GET",
      "https://www.alibaba.com/product-detail/2022-New-wholesale-sweet-love-roses_1600382993364.html",
    ]
  })*/
}
