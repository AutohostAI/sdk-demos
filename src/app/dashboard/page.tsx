/**
 * Admin Dashboard Demo Page
 *
 * Demonstrates embedding the Autohost SDK's ReservationResults component
 * inside a mock PMS (Property Management System) admin dashboard.
 *
 * Flow: enter an SDK API key and reservation ID → fetch an auth token →
 * initialize the SDK → mount the ReservationResults widget.
 */
"use client";

import { DashboardContent } from "@/components/dashboardContent";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900"
         style={{ minHeight: '100vh', height: 'auto' }}>
      <DashboardContent />
    </div>
  );
}
