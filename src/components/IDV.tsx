import { useEffect, useRef } from "react";
import type { AutohostClient } from "@/types/autohost-sdk";

export interface IDVProps {
  /** Callback invoked when IDV is complete */
  onSubmit: () => void;
  /** The initialized Autohost SDK client instance */
  client: AutohostClient;
  /** The reservation ID to use in the IDV process */
  reservationId: string;
  /** Primary color for the component's styles */
  primaryColor?: string;
  /** Allow retaking the selfie without restarting IDV */
  allowSelfieRetryInPlace?: boolean;
  /** Show a "What to Expect" intro screen before IDV */
  includeWhatToExpect?: boolean;
  /** Locale for the IDV component */
  locale?: string;
}

/**
 * IDV (Identity Document Verification) component.
 *
 * Mounts the SDK's IDV widget which guides the guest through capturing a
 * photo of their government-issued ID and a live selfie for face-match
 * verification.
 */
export function IDV({ onSubmit, client, reservationId, ...rest }: IDVProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (client) {
      client
        ?.component("IDV", {
          callbacks: {
            onIDVComplete: onSubmit,
          },
          reservationId: reservationId,

          // The primary color to use.
          primaryColor: rest.primaryColor ?? "rgb(15, 23, 42)",

          // Allow the user to retry the selfie without starting the IDV process again
          allowSelfieRetryInPlace: rest.allowSelfieRetryInPlace ?? true,

          // Show what the user can expect from the IDV process
          includeWhatToExpect: rest.includeWhatToExpect ?? false,

          // Set the locale manually
          locale: rest.locale ?? "en-US",
        })
        .mount("#target");
    }
  }, [client, reservationId, targetRef]);

  return (
    <div className="mx-auto max-w-md space-y-6 py-12 px-4 sm:px-6">
      <div id="target" ref={targetRef} />
    </div>
  );
}
