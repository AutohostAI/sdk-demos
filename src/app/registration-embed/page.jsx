"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { EmbedWrapper } from "@/components/embed-wrapper";
import { ReservationIdInput } from "@/components/ReservationIdInput";
import { useSearchParams } from "next/navigation";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RegistrationEmbedContent() {
  const mainRef = useRef(null);
  const [reservationId, setReservationId] = useState(null);
  const searchParams = useSearchParams();
  const urlReservationId = searchParams.get("reservationId") || searchParams.get("id");
  
  useEffect(() => {
    if (urlReservationId) {
      setReservationId(urlReservationId);
    }
  }, [urlReservationId]);

  const handleReservationSubmit = ({ reservationId }) => {
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
