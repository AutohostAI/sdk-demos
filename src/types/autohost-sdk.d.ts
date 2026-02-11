// ─── Core SDK ───────────────────────────────────────────────────────────────
// AutohostSDK, InitConfig, AutohostClient, MountableComponent

export interface InitConfig {
  /** Connect to the Autohost dev/testing environment */
  sandbox?: boolean;
  /** The reservation ID to scope the SDK session to */
  reservationId: string;
}

export interface MountableComponent {
  /** Mount the component into a DOM element matching the CSS selector */
  mount(selector: string): void;
}

export interface AutohostClient {
  /** Create a mountable SDK component by name */
  component(
    name: "IDV",
    config: IDVConfig
  ): MountableComponent;
  component(
    name: "ElectronicSignature",
    config: ElectronicSignatureConfig
  ): MountableComponent;
  component(
    name: "ReservationResults",
    config: ReservationResultsConfig
  ): MountableComponent;

  /** Verification helper methods */
  verification: {
    /** Save verification step data */
    save(options: SaveOptions): Promise<void>;
  };
}

export interface AutohostSDK {
  /** Initialize the SDK and return a client instance */
  init(config: InitConfig): Promise<AutohostClient>;
  /** Save verification data (global shorthand, used after all steps are done) */
  save(options: SaveOptions): Promise<void>;
}

// ─── Save Method ────────────────────────────────────────────────────────────
// SaveOptions, PersonalInfo, StepData

export interface PersonalInfo {
  email: string;
  full_name: string;
  phone: string;
  address: string;
}

export interface SaveOptions {
  /** Name of the current verification step (used for drop-off tracking) */
  step: string;
  /** The payload to send — shape depends on the step */
  data?: PersonalInfo | Record<string, unknown>;
  /** Set to true after all verification steps are finished */
  complete?: boolean;
}

// ─── IDV (Identity Document Verification) ───────────────────────────────────
// IDVConfig, IDVCallbacks

export interface IDVCallbacks {
  /** Called when the IDV process completes successfully */
  onIDVComplete: () => void;
}

export interface IDVConfig {
  /** Callbacks for IDV lifecycle events */
  callbacks: IDVCallbacks;
  /** The reservation ID to use in the IDV process */
  reservationId: string;
  /** Primary color for the component's styles */
  primaryColor?: string;
  /** Allow retaking the selfie without restarting IDV */
  allowSelfieRetryInPlace?: boolean;
  /** Show a "What to Expect" intro screen before IDV */
  includeWhatToExpect?: boolean;
  /** Locale for the IDV component (e.g. "en-US", "fr") */
  locale?: string;
}

// ─── Electronic Signature ───────────────────────────────────────────────────
// ElectronicSignatureConfig, ElectronicSignatureCallbacks, SignatureSubmissionData, GeoIP

export interface GeoIP {
  ip: string;
  city: string;
  countryName: string;
  countryCode: string;
  regionName: string;
  regionCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface SignatureSubmissionData {
  signedDate: string;
  copyRequested: boolean;
  userIP: string;
  userAgent: string;
  geoip: GeoIP;
}

export interface ElectronicSignatureCallbacks {
  /** Called when the guest submits the signed agreement */
  onSubmit: (data: SignatureSubmissionData) => void;
  /** Called when an error occurs during signature */
  onError?: (error: string) => void;
  /** Called when the guest scrolls to the bottom of the agreement */
  onScrollToBottom?: () => void;
}

export interface ElectronicSignatureConfig {
  /** The reservation ID to scope the agreement to */
  reservationId: string;
  /** Primary color for the component's styles */
  primaryColor?: string;
  /** Signature input modes to enable */
  signatureModes?: ("draw" | "type")[];
  /** Send a signed copy to the email address on the reservation */
  emailSignedCopy?: boolean;
  /** Show a checkbox for double opt-in to the usage terms */
  showTermsCheckbox?: boolean;
  /** Callbacks for e-signature lifecycle events */
  callbacks: ElectronicSignatureCallbacks;
}

// ─── Reservation Results (Admin Dashboard) ──────────────────────────────────

export interface ReservationResultsConfig {
  /** The reservation ID to display results for */
  reservationId: string;
  /** Scoped auth token obtained from the Autohost API */
  apiToken: string;
  /** Optional CSS style overrides for sub-components */
  styles?: Record<string, React.CSSProperties>;
}

// ─── Window Augmentation ────────────────────────────────────────────────────

declare global {
  interface Window {
    AutohostSDK: AutohostSDK;
  }
}
