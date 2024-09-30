import { useEffect, useRef } from "react";

export function IDV({ onSubmit, client }) {
  const targetRef = useRef(null);
  useEffect(() => {
    if (client) {
      console.log("mounting", client);

      client
        ?.component("IDV", {
          primaryColor: "rgb(15, 23, 42)",
          callbacks: {
            onIDVComplete: onSubmit,
          },
          reservationId: "AZAWxgU8N-hdmQreBzbE",
        })
        .mount("#target");
    }
  }, [client && targetRef]);

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div id="target" ref={targetRef} />
    </div>
  );
}
