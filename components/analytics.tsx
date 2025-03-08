"use client";

import * as Fathom from "fathom-client";
import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_FATHOM_SITE_ID) return;
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
      includedDomains: [
        "lcly.me",
        "www.lcly.me",
        "lcly.space",
        "www.lcly.space",
        "lcly.org",
        "www.lcly.org",
      ],
    });

    const onRouteChange = () => Fathom.trackPageview();

    window.addEventListener("routeChange", onRouteChange);
    return () => window.removeEventListener("routeChange", onRouteChange);
  }, []);

  return null;
  // return <VercelAnalytics />
}

export default Analytics;
