"use client";
import { EmbedWrapper } from "@/components/embed-wrapper";
import { usePathname } from "next/navigation";

import { useRef } from "react";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const mainRef = useRef(null);
  const pathname = usePathname();
  return (
    <main
      className="flex h-screen flex-col items-center justify-between"
      ref={mainRef}
    >
      <EmbedWrapper>
        <iframe
          src="https://gueststay.in/AZHstVwtN-hdmQreB_bq?embed=1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allow="geolocation; camera; fullscreen;"
        ></iframe>
      </EmbedWrapper>
    </main>
  );
}
