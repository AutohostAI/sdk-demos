import { useEffect, useRef } from "react";
import type { AutohostClient, SignatureSubmissionData } from "@/types/autohost-sdk";

export interface UsageAgreementProps {
  onSubmit: (data: SignatureSubmissionData) => void;
  client: AutohostClient;
  reservationId: string;
}

/**
 * UsageAgreement component
 *
 * Mounts the SDK's ElectronicSignature component, which renders a
 * property-specific usage agreement document with signature capture.
 * The guest reads the agreement, signs (draw or type), and submits.
 */
export function UsageAgreement({ onSubmit, client, reservationId }: UsageAgreementProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (client) {
      client
        ?.component("ElectronicSignature", {
          reservationId: reservationId,
          primaryColor: "rgb(15, 23, 42)",
          signatureModes: ["draw", "type"],
          emailSignedCopy: false,
          showTermsCheckbox: true,
          callbacks: {
            onSubmit: (data) => onSubmit(data),
            onError: (error) => {
              console.error("Error signing usage agreement", error);
            },
            onScrollToBottom: () => {
              // Called when the guest scrolls to the bottom of the agreement document.
            },
          },
        })
        .mount("#esignature");
    }
  }, [client, reservationId, targetRef]);

  return (
    <div className="max-w-xl h-screen mx-auto flex flex-col px-4 sm:px-6">
      <div id="esignature" ref={targetRef} className="flex-1 overflow-hidden" />
    </div>
  );
}
