/**
 * Guest Portal SDK Demo — Registration Page
 *
 * Multi-step wizard that demonstrates the Autohost SDK's guest-facing
 * verification components:
 *
 *   ReservationIdInput — collect a reservation ID (shown while reservationId is null)
 *   RegistrationForm (step 0) — collect personal info and save via the SDK
 *   UsageAgreement (step 1) — display and sign an electronic usage agreement
 *   IDV (step 2) — identity document verification (selfie + ID photo)
 *   Done (default) — confirmation screen
 */
"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Done } from "@/components/Done";
import { IDV } from "@/components/IDV";
import { RegistrationForm } from "@/components/RegistrationForm";
import { ReservationIdInput } from "@/components/ReservationIdInput";
import { UsageAgreement } from "@/components/UsageAgreement";
import { useSearchParams } from "next/navigation";
import { sleep } from "@/lib/utils";

function RegistrationContent() {
  const [step, setStep] = useState(0);
  const [client, setClient] = useState();
  const [reservationId, setReservationId] = useState(null);
  const [idvSettings, setIdvSettings] = useState(null);
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
    // Wait for the SDK script (loaded in layout.jsx) to attach to `window`
    await sleep(500);
    window.AutohostSDK.init({
      // `sandbox: true` connects to the Autohost dev/testing environment
      sandbox: true,
      reservationId: id,
    })
      .then((client) => {
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

  /**
   * Marks the verification as complete via `AutohostSDK.save` and advances
   * to the Done screen. Call this after the final verification step.
   */
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

  const handleReservationSubmit = ({ reservationId, idvSettings }) => {
    setReservationId(reservationId);
    setIdvSettings(idvSettings);
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
            // The ElectronicSignature callback passes signing metadata (date, IP, geo, etc.)
            // but this demo simply advances to the next step.
            onSubmit={() => nextStep()}
          />
        );
      case 2:
        return (
          <IDV
            client={client}
            reservationId={reservationId}
            onSubmit={finish}
            {...idvSettings}
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
