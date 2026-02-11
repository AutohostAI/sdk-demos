/**
 * Done — Registration Completion Screen
 *
 * Shown after the guest finishes all verification steps (personal info,
 * usage agreement, and IDV). When a brand theme is active, displays a
 * rich themed completion page with reservation details, status badge,
 * and "Arrival Information" card. Falls back to a simple success message
 * when no theme is selected.
 */
"use client";

import { CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import { useBrandTheme } from "@/context/BrandThemeContext";

interface DoneProps {
  reservationId?: string;
}

export const Done = ({ reservationId }: DoneProps) => {
  const { theme } = useBrandTheme();
  const isThemed = theme && theme.id !== "none";

  if (!isThemed) {
    return (
      <div className="mx-4 my-auto flex max-w-md flex-col items-center justify-center space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <CheckCircle2 className="h-20 w-20 text-emerald-500" />
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
            Congratulations!
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Your guest registration is complete. You&apos;re all set for
            check-in!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 px-4 py-10">
      {/* Success icon + heading */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          You&apos;re All Set!
        </h2>
        <p className="text-sm text-muted-foreground">
          Your pre-arrival check-in is complete. We look forward to
          welcoming you.
        </p>
      </div>

      {/* Reservation details card */}
      <div className="w-full rounded-lg border bg-card p-5 shadow-sm">
        <div className="space-y-3">
          {reservationId && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Reservation
              </span>
              <span className="font-mono text-sm font-medium text-foreground">
                {reservationId}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3 w-3" />
              Verified
            </span>
          </div>
          {theme.checkInTime && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Check-in</span>
              <span className="flex items-center gap-1 text-sm text-foreground">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                {theme.checkInTime}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Arrival Information card */}
      {(theme.address || theme.contactPhone) && (
        <div className="w-full rounded-lg border bg-card p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Arrival Information
          </h3>
          <div className="space-y-2.5 text-sm text-muted-foreground">
            {theme.address && (
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{theme.address}</span>
              </div>
            )}
            {theme.contactPhone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{theme.contactPhone}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground/60">
        We look forward to hosting you!
      </p>
    </div>
  );
};
