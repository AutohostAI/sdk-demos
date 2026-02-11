/**
 * RegistrationForm — Guest Personal Information
 *
 * Collects first name, last name, email, phone, and address from the guest,
 * then saves the data to Autohost via `client.verification.save()`.
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { AutohostClient } from "@/types/autohost-sdk";

export interface RegistrationFormProps {
  onSubmit: () => void;
  client: AutohostClient;
}

export function RegistrationForm({ onSubmit, client }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="mx-auto max-w-md space-y-6 py-12 px-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl sm:px-6">
      <div className="space-y-2">
        <h1 className="font-bold">Guest Registration</h1>
      </div>
      <form
        className="space-y-4"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setLoading(true);

          // Access form values by input id (set on each <Input> below)
          const form = e.target as HTMLFormElement;
          const first_name = (form.elements.namedItem("first-name") as HTMLInputElement).value;
          const last_name = (form.elements.namedItem("last-name") as HTMLInputElement).value;
          const email = (form.elements.namedItem("email") as HTMLInputElement).value;
          const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
          const address = (form.elements.namedItem("address") as HTMLTextAreaElement).value;

          try {
            await client.verification.save({
              // For a wizard-like verification process, set the step name here to help customers track user drop-off.
              // Call the `save` method with the same step name for each step in the verification process.
              step: "PersonalInfo",

              // The payload to send to the verification service.
              // This example sends the personal details collected in the first form.
              data: {
                email,
                full_name: `${first_name} ${last_name}`,
                phone,
                address,
              },

              // In a production app you would only set `complete: true` after ALL
              // steps (including IDV) are finished. It's set here for simplicity
              // so this demo step works standalone.
              complete: true,
            });
            onSubmit();
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="+1 (555) 555-5555"
            required
            type="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            placeholder="123 Main St, Anytown USA"
            required
          />
        </div>
        <Button className="w-full" type="submit" loading={loading}>
          Register
        </Button>
      </form>
    </div>
  );
}
