/**
 * Guest Portal Iframe Embed Demo
 *
 * The simplest Autohost integration approach — embed the hosted Guest Portal
 * in an iframe pointing to `gueststay.in/{reservationId}`.
 *
 * Query parameters:
 *   - `embed=1`      — tells the portal to render in embedded mode (no header/footer)
 *   - `isMobile=yes` — forces the mobile-friendly layout inside the iframe
 *
 * The `allow` attribute grants the iframe access to:
 *   - `geolocation` — used by the address autocomplete field
 *   - `camera`      — used by the IDV selfie capture step
 *   - `fullscreen`  — allows document viewing in fullscreen
 */
"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { EmbedWrapper } from "@/components/embed-wrapper";
import { ReservationIdInput } from "@/components/ReservationIdInput";
import { useSearchParams } from "next/navigation";

function RegistrationEmbedContent() {
  const mainRef = useRef<HTMLElement>(null);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const urlReservationId = searchParams.get("reservationId") || searchParams.get("id");

  useEffect(() => {
    if (urlReservationId) {
      setReservationId(urlReservationId);
    }
  }, [urlReservationId]);

  const handleReservationSubmit = ({ reservationId }: { reservationId: string }) => {
    setReservationId(reservationId);
  };

  if (!reservationId) {
    return (
      <ReservationIdInput
        onSubmit={handleReservationSubmit}
        title="Enter Reservation ID for Embedded Registration"
      />
    );
  }

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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationEmbedContent />
    </Suspense>
  );
}
