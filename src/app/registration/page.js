"use client";
import { Done } from "@/components/Done";
import { IDV } from "@/components/IDV";
import { RegistrationForm } from "@/components/RegistrationForm";

import { useEffect, useRef, useState } from "react";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [client, setClient] = useState();

  const mainRef = useRef(null);
  async function init() {
    await sleep(500);
    console.log("hey");
    window.AutohostSDK.init({
      sandbox: true,
      reservationId: "AZDGXS7QN-hdmQreB56T",
    })
      .then((client) => {
        console.log({ client, reservation: client.reservation.get() });
        setClient(client);
      })
      .catch(console.error);
  }
  useEffect(() => {
    if (window) {
      console.log("try");
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
      {/* <RegistrationForm />
      <IDV /> */}
    </main>
  );
}
