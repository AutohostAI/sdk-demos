import { useEffect, useRef } from "react";

/**
 * @typedef {Object} IDVProps
 * @property {Object}   client                  - The initialized Autohost SDK client instance.
 * @property {string}   reservationId           - The reservation ID to use in the IDV process.
 * @property {Function} onSubmit                - Callback invoked when IDV is complete.
 * @property {string}   [primaryColor]          - Primary color for the component's styles.
 * @property {boolean}  [allowSelfieRetryInPlace] - Allow retaking the selfie without restarting IDV.
 * @property {boolean}  [includeWhatToExpect]   - Show a "What to Expect" intro screen before IDV.
 */

/**
 * IDV (Identity Document Verification) component.
 *
 * Mounts the SDK's IDV widget which guides the guest through capturing a
 * photo of their government-issued ID and a live selfie for face-match
 * verification.
 *
 * @param {IDVProps} props
 * @returns {JSX.Element}
 */
export function IDV({ onSubmit, client, reservationId, ...rest }) {
  const targetRef = useRef(null);
  useEffect(() => {
    if (client) {
      client
        ?.component("IDV", {
          callbacks: {
            onIDVComplete: onSubmit,
          },
          reservationId: reservationId,

          /**
           * IDV configurations
           */

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
