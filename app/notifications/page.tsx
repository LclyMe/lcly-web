"use client";

import { useState, useEffect } from "react";
import { subscribeUser, unsubscribeUser, sendNotification } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeaderWithIcon } from "@/components/ui/page-header-with-icon";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Add proper type for window with MSStream
interface WindowWithMSStream extends Window {
  MSStream?: unknown;
}

// Define the type that web-push expects
type WebPushSubscription = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });
      setSubscription(sub);

      // Get the keys before sending to the server
      const p256dh = btoa(
        String.fromCharCode.apply(
          null,
          Array.from(new Uint8Array(sub.getKey("p256dh")!))
        )
      );
      const auth = btoa(
        String.fromCharCode.apply(
          null,
          Array.from(new Uint8Array(sub.getKey("auth")!))
        )
      );

      const webPushSub: WebPushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh,
          auth,
        },
      };

      await subscribeUser(webPushSub);
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error);
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
    } catch (error) {
      console.error("Failed to unsubscribe from push notifications:", error);
    }
  }

  async function sendTestNotification() {
    if (subscription) {
      try {
        await sendNotification(message);
        setMessage("");
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    }
  }

  if (!isSupported) {
    return (
      <p className="text-center p-4">
        Push notifications are not supported in this browser.
      </p>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <PageHeaderWithIcon icon={Bell} title="Notifications" />

      <h3 className="text-lg font-semibold">Push Notifications</h3>
      {subscription ? (
        <div className="space-y-4">
          <p>You are subscribed to push notifications.</p>
          <Button onClick={unsubscribeFromPush} variant="destructive">
            Unsubscribe
          </Button>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendTestNotification} disabled={!message}>
              Send Test
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p>You are not subscribed to push notifications.</p>
          <Button onClick={subscribeToPush}>Subscribe</Button>
        </div>
      )}
    </div>
  );
}

// function InstallPrompt() {
//   const [isIOS, setIsIOS] = useState(false);
//   const [isStandalone, setIsStandalone] = useState(false);

//   useEffect(() => {
//     setIsIOS(
//       /iPad|iPhone|iPod/.test(navigator.userAgent) &&
//         !(window as WindowWithMSStream).MSStream
//     );

//     setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
//   }, []);

//   if (isStandalone) {
//     return null;
//   }

//   return (
//     <div className="max-w-md mx-auto p-4 space-y-4">
//       <h3 className="text-lg font-semibold">Install App</h3>
//       {isIOS && (
//         <p>
//           To install this app on your iOS device, tap the share button
//           <span role="img" aria-label="share icon">
//             ⎋{" "}
//           </span>
//           and then "Add to Home Screen"
//           <span role="img" aria-label="plus icon">
//             ➕{" "}
//           </span>
//           .
//         </p>
//       )}
//     </div>
//   );
// }

export default function NotificationsPage() {
  return <PushNotificationManager />;
}
