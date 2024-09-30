import { sleep } from "@/app/registration/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
async function init({ sdkKey, reservationId }, callback) {
  console.log("init");
  await sleep(500);

  async function fetchToken() {
    try {
      const response = await fetch(
        "https://integrations-dev.autohost.ai/sdk/authorization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": sdkKey,
          },
          body: JSON.stringify({
            filters: [
              {
                scope: "read",
                level: "reservation",
                id: reservationId,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Data:", data);
      return data.token; // Return the token once the promise resolves
    } catch (error) {
      console.error("Error:", error);
      return ""; // Return an empty string or handle the error as needed
    }
  }
  const apiToken = await fetchToken();
  console.log("slept");
  const client = await window.AutohostSDK.init({
    sandbox: true,
    // reservationId,
  });
  callback();
  client
    .component("ReservationResults", {
      reservationId,
      apiToken,
    })
    .mount("#results");
}

const Results = ({ sdkKey, reservationId }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init({ sdkKey, reservationId }, () => setLoading(false));
  }, []);

  return (
    <CardContent
      id="results"
      style={{
        height: loading ? "auto" : "1000px",
      }}
    >
      {loading && <ReloadIcon className="h-12 w-12 m-auto animate-spin" />}
    </CardContent>
  );
};

export function DashboardContent() {
  const [sdkKey, setSdkKey] = useState();
  const [reservationId, setReservationid] = useState();
  const [ready, setReady] = useState(false);

  if (!ready) {
    return (
      <div className="flex flex-1">
        <main className="flex-1 max-w-6xl mx-auto px-4 md:px-6 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Enter Details for Dashboard Demo</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">SDK Key</Label>
                <Input
                  id="first-name"
                  required
                  onChange={(e) => setSdkKey(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Reservation Id</Label>
                <Input
                  id="last-name"
                  required
                  onChange={(e) => setReservationid(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                type="submit"
                disabled={!sdkKey || !reservationId}
                onClick={(e) => {
                  setReady(true);
                }}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-1">
        <nav className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
                href="#"
              >
                <HomeIcon className="w-5 h-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
                href="#"
              >
                <CalendarIcon className="w-5 h-5" />
                Reservations
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
                href="#"
              >
                <BriefcaseIcon className="w-5 h-5" />
                Properties
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
                href="#"
              >
                <UsersIcon className="w-5 h-5" />
                Residents
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
                href="#"
              >
                <SettingsIcon className="w-5 h-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-1 max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Guest Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Check-in
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      April 2, 2024
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Check-out
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      April 6, 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Guests
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      2
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Resident
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      John Doe
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Guest Instructions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Arrival Instructions
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please check in at the front gate. The guest pass will be
                    available for pickup.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Parking
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Parking is available in the guest lot. Please use the
                    designated guest spots.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Notes
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please be mindful of noise levels during your stay. Quiet
                    hours are from 10 PM to 7 AM.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid md:grid-cols-1 gap-8 mt-8 h-96">
            <Card>
              <CardHeader>
                <CardTitle>Autohost Verification</CardTitle>
              </CardHeader>
              <Results reservationId={reservationId} sdkKey={sdkKey} />
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
