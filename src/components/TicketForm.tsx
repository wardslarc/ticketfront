import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Validation schema including new fields
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  priority: z.string().nonempty({ message: "Please select a priority level" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  issueType: z.string().optional(),
  company: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface TicketFormProps {
  onSubmit?: (data: FormValues) => void;
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyVMVaYt8nzr8Hqkh3z1GhMrMTOhl9c3cKBwhKD4zS_MbSRpOqIMbVp7Iu6X-AX6okIIA/exec";

const TicketForm = ({ onSubmit }: TicketFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      priority: "",
      description: "",
      issueType: "",
      company: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setProgress(0);
    setSubmitStatus("idle");

    try {
      // Simulate progress bar (optional)
      for (let i = 0; i <= 100; i += 20) {
        setProgress(i);
        await new Promise((r) => setTimeout(r, 100));
      }

      // Send POST request as application/x-www-form-urlencoded with no-cors
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // important to avoid CORS errors
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data as any).toString(),
      });

      setSubmitStatus("success");
      form.reset();

      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setProgress(100);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-background rounded-xl border shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit a Support Ticket</h2>

      {submitStatus === "error" && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was a problem submitting your ticket. Please try again.</AlertDescription>
        </Alert>
      )}

      {submitStatus === "success" && (
        <Alert variant="success" className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your ticket was submitted successfully!</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Brief description of your issue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the priority level that best describes your issue</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide detailed information about your issue"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New field: issueType */}
          <FormField
            control={form.control}
            name="issueType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Bug, Feature Request" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New field: company */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isSubmitting && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Submitting ticket...</div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
