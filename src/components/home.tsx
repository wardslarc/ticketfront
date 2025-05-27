import React from "react";
import TicketForm from "./TicketForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Support Ticket Submission
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Please fill out the form below to submit a support ticket. We'll get
            back to you as soon as possible.
          </p>
        </div>

        <div className="bg-card shadow-md rounded-lg overflow-hidden border">
          <div className="p-6 sm:p-8">
            <TicketForm />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Need immediate assistance? Contact us directly at
            support@example.com
          </p>
        </div>
      </div>
    </div>
  );
}
