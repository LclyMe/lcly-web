"use server";

import webpush from "web-push";
import { createClient } from "@/lib/supabase/server";

webpush.setVapidDetails(
  "mailto:notifications@lcly.me", // Replace with your email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// Define the type that web-push expects
type WebPushSubscription = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export async function subscribeUser(sub: PushSubscription) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  // Convert browser's PushSubscription to WebPushSubscription format
  const webPushSub: WebPushSubscription = {
    endpoint: sub.endpoint,
    keys: {
      p256dh: Buffer.from(sub.getKey("p256dh")!).toString("base64"),
      auth: Buffer.from(sub.getKey("auth")!).toString("base64"),
    },
  };

  // Store in database
  const { error } = await supabase
    .from("push_subscriptions")
    .upsert({
      user_id: user.id,
      endpoint: webPushSub.endpoint,
      p256dh: webPushSub.keys.p256dh,
      auth: webPushSub.keys.auth,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to store push subscription:", error);
    throw error;
  }

  return { success: true };
}

export async function unsubscribeUser() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  // Remove from database
  const { error } = await supabase
    .from("push_subscriptions")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to remove push subscription:", error);
    throw error;
  }

  return { success: true };
}

export async function sendNotification(message: string) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  // Get subscription from database
  const { data: subscriptionData, error: subError } = await supabase
    .from("push_subscriptions")
    .select()
    .eq("user_id", user.id)
    .single();

  if (subError || !subscriptionData) {
    throw new Error("No subscription found");
  }

  // Convert database format back to WebPushSubscription
  const subscription: WebPushSubscription = {
    endpoint: subscriptionData.endpoint,
    keys: {
      p256dh: subscriptionData.p256dh,
      auth: subscriptionData.auth,
    },
  };

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Lcly Notification",
        body: message,
        icon: "/images/app-icons/web-app-manifest-192x192.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
