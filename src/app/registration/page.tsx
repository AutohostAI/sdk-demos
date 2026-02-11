/**
 * Guest Portal SDK Demo — Registration Page
 *
 * Multi-step wizard that demonstrates the Autohost SDK's guest-facing
 * verification components:
 *
 *   ReservationIdInput — collect a reservation ID (shown while reservationId is null)
 *   WelcomeStep (step 0) — branded welcome screen with process overview
 *   RegistrationForm (step 1) — collect personal info and save via the SDK
 *   UsageAgreement (step 2) — display and sign an electronic usage agreement
 *   IDV (step 3) — identity document verification (selfie + ID photo)
 *   Done (step 4) — confirmation screen
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
import type { AutohostClient } from "@/types/autohost-sdk";
import type { IDVSettings } from "@/components/ReservationIdInput";
import { BrandThemeProvider } from "@/context/BrandThemeContext";
import { BrandedRegistrationLayout } from "@/components/demo/BrandedRegistrationLayout";
import { WelcomeStep } from "@/components/demo/WelcomeStep";
import { ThemeSelector } from "@/components/demo/ThemeSelector";

function RegistrationContent() {
  const [step, setStep] = useState(0);
  const [client, setClient] = useState<AutohostClient>();
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [idvSettings, setIdvSettings] = useState<IDVSettings | null>(null);
  const searchParams = useSearchParams();
  const urlReservationId =
    searchParams.get("reservationId") || searchParams.get("id");

  const mainRef = useRef<HTMLElement>(null);

  /** Scroll to top when the wizard step changes. */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  /** Scroll to top when the SDK client is ready (first step visible). */
  useEffect(() => {
    if (client) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [client]);

  useEffect(() => {
    if (urlReservationId) {
      setReservationId(urlReservationId);
    }
  }, [urlReservationId]);

  async function init(id: string) {
    // Wait for the SDK script (loaded in layout.tsx) to attach to `window`
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

  function nextStep() {
    setStep((step) => step + 1);
  }

  /**
   * Marks the verification as complete via `AutohostSDK.save` and advances
   * to the Done screen. Call this after the final verification step.
   */
  function finish() {
    window.AutohostSDK.save({
      step: "Finish",
      complete: true,
    })
      .then()
      .catch(console.error);
    setStep((step) => step + 1);
  }

  const handleReservationSubmit = ({ reservationId, idvSettings }: { reservationId: string; idvSettings: IDVSettings }) => {
    setReservationId(reservationId);
    setIdvSettings(idvSettings);
    // We don't increment the step here because we need to wait for the client to be initialized
  };

  /** Compute user-visible step for the progress indicator. */
  const layoutStep = !reservationId ? 0 : !client ? 0 : Math.min(step + 1, 4);

  function renderCurrentStep() {
    switch (step) {
      case 0:
        return <WelcomeStep onContinue={nextStep} />;
      case 1:
        return <RegistrationForm onSubmit={nextStep} client={client!} />;
      case 2:
        return (
          <UsageAgreement
            client={client!}
            reservationId={reservationId!}
            // The ElectronicSignature callback passes signing metadata (date, IP, geo, etc.)
            // but this demo simply advances to the next step.
            onSubmit={() => nextStep()}
          />
        );
      case 3:
        return (
          <IDV
            client={client!}
            reservationId={reservationId!}
            onSubmit={finish}
            {...idvSettings}
          />
        );
      default:
        return <Done reservationId={reservationId!} />;
    }
  }

  return (
    <BrandThemeProvider>
      <BrandedRegistrationLayout currentStep={layoutStep} totalSteps={5}>
        <main
          className="flex flex-1 flex-col items-center"
          ref={mainRef}
        >
          {!reservationId ? (
            <div className="w-full">
              <ReservationIdInput onSubmit={handleReservationSubmit} />
              <ThemeSelector />
            </div>
          ) : !client ? (
            <div className="flex justify-center items-center flex-1">
              Initializing...
            </div>
          ) : (
            renderCurrentStep()
          )}
        </main>
      </BrandedRegistrationLayout>
    </BrandThemeProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationContent />
    </Suspense>
  );
}
