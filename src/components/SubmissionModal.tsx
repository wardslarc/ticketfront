import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SubmissionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmitAnother?: () => void;
  ticketData?: {
    name?: string;
    email?: string;
    subject?: string;
    priority?: string;
    description?: string;
    attachments?: File[];
    ticketId?: string;
  };
}

const SubmissionModal = ({
  isOpen = true,
  onClose = () => {},
  onSubmitAnother = () => {},
  ticketData = {
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Technical Issue",
    priority: "Medium",
    description: "I need help with my account settings.",
    attachments: [],
    ticketId: "TKT-" + Math.floor(100000 + Math.random() * 900000),
  },
}: SubmissionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-md mx-auto rounded-lg">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <DialogTitle className="text-xl text-center">
            Ticket Submitted Successfully!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your support ticket has been received and will be processed shortly.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3 text-sm">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-medium text-gray-700">
              Ticket Reference:{" "}
              <span className="font-bold text-primary">
                {ticketData.ticketId}
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium">{ticketData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium">{ticketData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Subject:</span>
              <span className="font-medium">{ticketData.subject}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Priority:</span>
              <span className="font-medium">{ticketData.priority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Attachments:</span>
              <span className="font-medium">
                {ticketData.attachments?.length || 0} files
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onSubmitAnother}
            className="w-full sm:w-auto"
          >
            Submit Another Ticket
          </Button>
          <Button onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionModal;
