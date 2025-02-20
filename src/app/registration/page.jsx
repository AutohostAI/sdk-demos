"use client";
import { useEffect, useRef, useState } from "react";
import { Done } from "@/components/Done";
import { IDV } from "@/components/IDV";
import { RegistrationForm } from "@/components/RegistrationForm";
import { useSearchParams } from "next/navigation";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [client, setClient] = useState();
  const searchParams = useSearchParams();
  const reservationId = searchParams.get("reservationId") || searchParams.get("id") || "0bb42a7c9a407148e087ed8ee63c1e53";

  const mainRef = useRef(null);
  async function init() {
    await sleep(500);
    window.AutohostSDK.init({
      sandbox: true,
      reservationId: reservationId,
    })
      .then((client) => {
        console.log({ client, reservation: client.reservation.get() });
        setClient(client);
      })
      .catch(console.error);
  }
  useEffect(() => {
    if (window) {
      init();
    }
  }, []);

  function nextStep(e) {
    e?.preventDefault?.();
    setStep((step) => step + 1);
  }

  function renderSteps() {
    switch (step) {
      case 0:
        return <RegistrationForm onSubmit={nextStep} client={client} />;
      case 1:
        return <IDV onSubmit={nextStep} client={client} />;
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
