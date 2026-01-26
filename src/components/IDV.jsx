import { useEffect, useRef } from "react";

/**
 *
 * @typedef {Object} IDVProps
 * @property {string} client - The client to use in the IDV process.
 * @property {string} reservationId - The reservation ID to use in the IDV process.
 * @property {Function} onSubmit - The callback to call when the IDV process is complete.
 * @property {string} reservationId - The reservation ID to use in the IDV process.
 * @property {string} primaryColor - The primary color to use in the default styles.
 * @property {boolean} allowSelfieRetryInPlace - Whether to allow the user to retry the selfie without starting the IDV process again.
 * @property {boolean} includeWhatToExpect - Whether to show what the user can expect from the IDV process.
 */

/**
 * The IDV component.
 * @param {Function} onSubmit - The callback to call when the IDV process is complete.
 * @param {Client} client - The client to use in the IDV process.
 * @param {string} reservationId - The reservation ID to use in the IDV process.
 * @returns {JSX.Element}
 */
export function IDV({ onSubmit, client, reservationId, ...rest }) {
  const targetRef = useRef(null);
  useEffect(() => {
    if (client) {
      console.log("mounting", client);

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
