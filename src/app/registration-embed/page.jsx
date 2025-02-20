"use client";
import { EmbedWrapper } from "@/components/embed-wrapper";
import { useSearchParams } from "next/navigation";

import { useRef } from "react";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const mainRef = useRef(null);
  const searchParams = useSearchParams();
  const reservationId = searchParams.get("reservationId") || searchParams.get("id") || "6f4b405bacec7461fbce747e3c921a06";
  return (
    <main
      className="flex h-screen flex-col items-center justify-between"
      ref={mainRef}
    >
      <EmbedWrapper>
        <iframe
          src={`https://gueststay.in/${reservationId}?embed=1&isMobile=yes`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allow="geolocation; camera; fullscreen;"
        ></iframe>
      </EmbedWrapper>
    </main>
  );
}
