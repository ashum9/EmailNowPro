import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Send } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import ProgressModal from "@/components/progress-modal";

interface HrContact {
  id: number;
  name: string;
  email: string;
  company: string;
  position: string;
  industry: string;
}

export default function EmailComposer() {
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(20);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch HR contacts for preview
  const { data: hrContacts } = useQuery<HrContact[]>({
    queryKey: ["/api/hr-contacts"],
    queryFn: async () => {
      const response = await fetch("/api/hr-contacts?limit=3");
      return response.json();
    },
  });

  // Individual email mutation
  const individualEmailMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/send-email", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Email sent successfully",
      });
      // Reset form
      setRecipientEmail("");
      setRecipientName("");
      setSubject("");
      setMessage("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send email",
        variant: "destructive",
      });
    },
  });

  // Bulk email mutation
  const bulkEmailMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/send-bulk-emails", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      // Reset form
      setSubject("");
      setMessage("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send bulk emails",
        variant: "destructive",
      });
    },
  });

  const handleSendEmail = async () => {
    if (!subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isBulkMode && (!recipientEmail || !recipientName)) {
      toast({
        title: "Error",
        description: "Please fill in recipient details",
        variant: "destructive",
      });
      return;
    }

    setShowProgress(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    try {
      if (isBulkMode) {
        await bulkEmailMutation.mutateAsync({
          subject,
          message,
          quantity: selectedQuantity,
        });
      } else {
        await individualEmailMutation.mutateAsync({
          recipientEmail,
          recipientName,
          subject,
          message,
          type: "individual",
        });
      }
      
      // Complete progress
      setProgress(100);
      setTimeout(() => {
        setShowProgress(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      clearInterval(progressInterval);
      setShowProgress(false);
      setProgress(0);
    }
  };

  const quantityOptions = [
    { value: 20, label: "20", color: "text-[var(--primary)]" },
    { value: 50, label: "50", color: "text-[var(--secondary)]" },
    { value: 100, label: "100", color: "text-[var(--accent)]" },
  ];

  return (
    <>
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Email Composer</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose your sending mode and craft the perfect message for your audience.
            </p>
          </div>

          <Card className="glass-effect border-[var(--light-text)]/10 bg-transparent">
            <CardContent className="p-8">
              {/* Mode Toggle */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <User className="text-2xl text-[var(--primary)]" />
                  <span className="text-lg font-medium">Individual Email</span>
                </div>
                <Switch
                  checked={isBulkMode}
                  onCheckedChange={setIsBulkMode}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[var(--primary)] data-[state=checked]:to-[var(--secondary)]"
                />
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium">Bulk HR Email</span>
                  <Users className="text-2xl text-[var(--secondary)]" />
                </div>
              </div>

              {/* Individual Mode */}
              {!isBulkMode && (
                <div className="space-y-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="recipient-email" className="text-gray-300 mb-2">
                        Recipient Email
                      </Label>
                      <Input
                        id="recipient-email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="bg-[var(--dark-slate)]/50 border-[var(--light-text)]/20 text-[var(--light-text)] placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="recipient-name" className="text-gray-300 mb-2">
                        Recipient Name
                      </Label>
                      <Input
                        id="recipient-name"
                        type="text"
                        placeholder="John Doe"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="bg-[var(--dark-slate)]/50 border-[var(--light-text)]/20 text-[var(--light-text)] placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bulk Mode */}
              {isBulkMode && (
                <div className="space-y-6 mb-6">
                  <div>
                    <Label className="text-gray-300 mb-4">Select Quantity</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {quantityOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`quantity-option ${
                            selectedQuantity === option.value ? "selected" : ""
                          }`}
                          onClick={() => setSelectedQuantity(option.value)}
                        >
                          <div className={`text-2xl font-bold ${option.color} mb-2`}>
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-300">Emails</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[var(--dark-slate)]/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2">HR Database Preview</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      {hrContacts?.map((contact) => (
                        <div key={contact.id}>
                          • {contact.email} ({contact.name})
                        </div>
                      ))}
                      <div className="text-[var(--accent)]">
                        + {selectedQuantity - 3} more contacts...
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Content */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="subject" className="text-gray-300 mb-2">
                    Subject Line
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Your compelling subject line..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-[var(--dark-slate)]/50 border-[var(--light-text)]/20 text-[var(--light-text)] placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-300 mb-2">
                    Email Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={8}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-[var(--dark-slate)]/50 border-[var(--light-text)]/20 text-[var(--light-text)] placeholder-gray-400 resize-none"
                  />
                </div>
              </div>

              {/* Send Button */}
              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleSendEmail}
                  disabled={individualEmailMutation.isPending || bulkEmailMutation.isPending}
                  className="glow-button text-white px-8 py-4 text-lg font-semibold"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isBulkMode ? "Send Bulk Emails" : "Send Email"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <ProgressModal 
        isOpen={showProgress} 
        progress={progress}
        onClose={() => setShowProgress(false)}
      />
    </>
  );
}
