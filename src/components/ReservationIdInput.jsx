import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

/**
 * ReservationIdInput component with QA settings for SDK component testing
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback function called with { reservationId, sdkKey, idvSettings }
 * @param {string} [props.title="Enter Reservation ID"] - Title for the input form
 * @param {boolean} [props.requireSDKKey=false] - Whether to require SDK key input
 * @returns {JSX.Element|null} The reservation input form or null when submitted
 */
export function ReservationIdInput({ onSubmit, title = "Enter Reservation ID", requireSDKKey = false }) {
  const [reservationId, setReservationId] = useState("");
  const [sdkKey, setSdkKey] = useState("");
  const [ready, setReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // IDV Configuration Settings
  const [idvSettings, setIdvSettings] = useState({
    primaryColor: "rgb(15, 23, 42)",
    allowSelfieRetryInPlace: true,
    includeWhatToExpected: false,
    locale: "en",
  });

  /**
   * Supported locales for the IDV component
   * @type {Array<{code: string, language: string}>}
   */
  const supportedLocales = [
    { code: "cs", language: "Czech" },
    { code: "de", language: "German" },
    { code: "en", language: "English" },
    { code: "es", language: "Spanish" },
    { code: "fr", language: "French" },
    { code: "he", language: "Hebrew" },
    { code: "it", language: "Italian" },
    { code: "ja", language: "Japanese" },
    { code: "pt", language: "Portuguese" },
    { code: "pt-BR", language: "Portuguese (Brazil)" },
  ];

  /**
   * Handle form submission and pass all data including QA settings to parent
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setReady(true);
    // Pass reservation data and QA settings for SDK component configuration
    onSubmit({ 
      reservationId, 
      sdkKey,
      idvSettings 
    });
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

        {/* QA Settings Panel - Below Card */}
        <div className="mt-6 space-y-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="text-xs text-muted-foreground hover:text-foreground w-full"
          >
            {showSettings ? "Hide" : "Show"} SDK Settings
          </Button>
          
          {showSettings && (
            <Card className="mt-2">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">IDV Component Settings</Label>
                    <Separator />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color" className="text-xs">Primary Color</Label>
                      <Input
                        id="primary-color"
                        type="text"
                        value={idvSettings.primaryColor}
                        onChange={(e) => setIdvSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                        placeholder="rgb(15, 23, 42)"
                        className="text-xs"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        id="allow-selfie-retry"
                        type="checkbox"
                        checked={idvSettings.allowSelfieRetryInPlace}
                        onChange={(e) => setIdvSettings(prev => ({ ...prev, allowSelfieRetryInPlace: e.target.checked }))}
                        className="h-3 w-3"
                      />
                      <Label htmlFor="allow-selfie-retry" className="text-xs">Allow Selfie Retry In Place</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        id="include-what-to-expect"
                        type="checkbox"
                        checked={idvSettings.includeWhatToExpected}
                        onChange={(e) => setIdvSettings(prev => ({ ...prev, includeWhatToExpected: e.target.checked }))}
                        className="h-3 w-3"
                      />
                      <Label htmlFor="include-what-to-expect" className="text-xs">Include What To Expect</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="locale" className="text-xs">Locale</Label>
                      <select
                        id="locale"
                        value={idvSettings.locale}
                        onChange={(e) => setIdvSettings(prev => ({ ...prev, locale: e.target.value }))}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        {supportedLocales.map((loc) => (
                          <option key={loc.code} value={loc.code}>
                            {loc.language} ({loc.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}