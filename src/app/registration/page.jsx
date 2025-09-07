"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Done } from "@/components/Done";
import { IDV } from "@/components/IDV";
import { RegistrationForm } from "@/components/RegistrationForm";
import { ReservationIdInput } from "@/components/ReservationIdInput";
import { UsageAgreement } from "@/components/UsageAgreement";
import { useSearchParams } from "next/navigation";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RegistrationContent() {
  const [step, setStep] = useState(0);
  const [client, setClient] = useState();
  const [reservationId, setReservationId] = useState(null);
  const searchParams = useSearchParams();
  const urlReservationId =
    searchParams.get("reservationId") || searchParams.get("id");

  const mainRef = useRef(null);

  useEffect(() => {
    if (urlReservationId) {
      setReservationId(urlReservationId);
    }
  }, [urlReservationId]);

  async function init(id) {
    await sleep(500);
    window.AutohostSDK.init({
      sandbox: true,
      reservationId: id,
    })
      .then((client) => {
        // console.log({ client, reservation: client.reservation.get() });
        setClient(client);
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (window && reservationId) {
      init(reservationId);
    }
  }, [reservationId]);

  function nextStep(e) {
    e?.preventDefault?.();
    setStep((step) => step + 1);
  }
  function finish(e) {
    e?.preventDefault?.();
    window.AutohostSDK.save({
      step: "Finish",
      complete: true,
    })
      .then()
      .catch(console.error);
    setStep((step) => step + 1);
  }

  const handleReservationSubmit = ({ reservationId }) => {
    setReservationId(reservationId);
    // We don't increment the step here because we need to wait for the client to be initialized
  };

  function renderSteps() {
    if (!reservationId) {
      return <ReservationIdInput onSubmit={handleReservationSubmit} />;
    }

    if (!client) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          Initializing...
        </div>
      );
    }

    switch (step) {
      case 0:
        return <RegistrationForm onSubmit={nextStep} client={client} />;
      case 1:
        return (
          <UsageAgreement
            client={client}
            reservationId={reservationId}
            // Ignore the submit data for now
            onSubmit={() => nextStep()}
          />
        );
      case 2:
        return (
          <IDV
            client={client}
            reservationId={reservationId}
            onSubmit={finish}
          />
        );
      default:
        return <Done />;
    }
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between"
      ref={mainRef}
    >
      {renderSteps()}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationContent />
    </Suspense>
  );
}
