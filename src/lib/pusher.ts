import PusherServer from "pusher";
import PusherClient from "pusher-js";

declare global {
  // These ensure the variables are defined on the global object
  // eslint-disable-next-line no-var
  var pusherServer: PusherServer | undefined;
  // eslint-disable-next-line no-var
  var pusherClient: PusherClient | undefined;
}

if (!global.pusherServer) {
  global.pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: "eu",
    useTLS: true,
  });
}

if (!global.pusherClient) {
  global.pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: "eu",
  });
}

export const pusherServer = global.pusherServer;
export const pusherClient = global.pusherClient;
