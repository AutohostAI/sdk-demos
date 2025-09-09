import { useEffect, useRef } from "react";

/**
 * @typedef {Object} SubmitData
 * @property {string} signedDate
 * @property {boolean} copyRequested
 * @property {string} userIP
 * @property {string} userAgent
 * @property {Object} geoip
 * @property {string} geoip.ip
 * @property {string} geoip.city
 * @property {string} geoip.countryName
 * @property {string} geoip.countryCode
 * @property {string} geoip.regionName
 * @property {string} geoip.regionCode
 * @property {number} geoip.latitude
 * @property {number} geoip.longitude
 * @property {string} geoip.timezone
 */

/**
 * @typedef {Object} UsageAgreementProps
 * @property {Function} onSubmit
 * @property {Object} client
 * @property {string} reservationId
 * @returns {JSX.Element}
 */

/**
 * UsageAgreement component
 * @name UsageAgreement
 * @description UsageAgreement component
 * @param {UsageAgreementProps} params
 * @returns {JSX.Element}
 */
export function UsageAgreement({ onSubmit, client, reservationId }) {
  const targetRef = useRef(null);
  useEffect(() => {
    if (client) {
      console.log("mounting", client);

      client
        ?.component("ElectronicSignature", {
          /**
           * The primary verification ID to use in the e-signature process.
           *
           * @type {string}
           */
          reservationId: reservationId,
          /**
           * The primary color to use in the default styles.
           *
           * @type {string}
           */
          primaryColor: "rgb(15, 23, 42)",
          /**
           * Toggle to enable the draw and type modes.
           * We recommend only using the type mode.
           *
           * @type {("draw" | "type")[]}
           */
          signatureModes: ["draw", "type"],
          /**
           * Toggle to send the signed copy to the email address on the reservation
           *
           * @type {boolean}
           */
          emailSignedCopy: false,
          /**
           * Whether to show a checkbox for double opt-in to the usage terms.
           *
           * @type {boolean}
           */
          showTermsCheckbox: true,
          /**
           * Callbacks for the ElectronicSignature component.
           */
          callbacks: {
            /**
             * Handle the submission of the e-signature process
             * @param {SubmitData} data
             * @returns {void}
             */
            onSubmit: (data) => onSubmit(data),
            /**
             * Handle the error of the e-signature process
             * @param {string} error
             * @returns {void}
             */
            onError: (error) => {
              console.error("Error signing usage agreement", error);
            },
            /**
             * Handle the scroll to bottom event
             * @returns {void}
             */
            onScrollToBottom: () => {
              console.log("User scrolled to bottom of the document");
            },
          },
        })
        .mount("#esignature");
    }
  }, [client, reservationId, targetRef]);

  return (
    <div className="max-w-xl h-screen mx-auto flex flex-col">
      <div id="esignature" ref={targetRef} className="flex-1 overflow-hidden" />
    </div>
  );
}
