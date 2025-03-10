import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function ReservationIdInput({ onSubmit, title = "Enter Reservation ID", requireSDKKey = false }) {
  const [reservationId, setReservationId] = useState("");
  const [sdkKey, setSdkKey] = useState("");
  const [ready, setReady] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReady(true);
    onSubmit({ reservationId, sdkKey });
  };

  if (ready) {
    return null;
  }

  return (
    <div className="flex flex-1">
      <main className="flex-1 max-w-md mx-auto px-4 md:px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {requireSDKKey && (
              <div className="space-y-2">
                <Label htmlFor="sdk-key">SDK Key</Label>
                <Input
                  id="sdk-key"
                  required
                  value={sdkKey}
                  onChange={(e) => setSdkKey(e.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="reservation-id">Reservation ID</Label>
              <Input
                id="reservation-id"
                required
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={!reservationId || (requireSDKKey && !sdkKey)}
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}