import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Send, Settings, Mail, Lock, Globe } from "lucide-react";
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
  const [csvRecipients, setCsvRecipients] = useState<any[]>([]);
  const [csvError, setCsvError] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState(20);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Email configuration states
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [showEmailConfig, setShowEmailConfig] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Remove HR contacts query for security - don't expose contact data to client

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

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvError("");
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<any>) => {
        if (results.errors.length) {
          setCsvError("Error parsing CSV file.");
          setCsvRecipients([]);
        } else {
          // Expecting columns: email, name (optionally more)
          const validRows = (results.data as any[]).filter(row => row.email && row.name);
          if (validRows.length === 0) {
            setCsvError("No valid rows found. CSV must have 'email' and 'name' columns.");
            setCsvRecipients([]);
          } else {
            setCsvRecipients(validRows);
          }
        }
      },
      error: () => {
        setCsvError("Failed to read CSV file.");
        setCsvRecipients([]);
      }
    });
  };

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

    if (!smtpHost || !smtpUser || !smtpPassword || !fromEmail) {
      toast({
        title: "Error",
        description: "Please configure your email settings",
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
      const emailConfig = {
        smtpHost,
        smtpPort: parseInt(smtpPort),
        smtpUser,
        smtpPassword,
        fromEmail,
      };

      if (isBulkMode) {
        if (csvRecipients.length > 0) {
          await bulkEmailMutation.mutateAsync({
            subject,
            message,
            recipients: csvRecipients,
            ...emailConfig,
          });
        } else {
          await bulkEmailMutation.mutateAsync({
            subject,
            message,
            quantity: selectedQuantity,
            ...emailConfig,
          });
        }
      } else {
        await individualEmailMutation.mutateAsync({
          recipientEmail,
          recipientName,
          subject,
          message,
          type: "individual",
          ...emailConfig,
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
    { value: 20, label: "20", color: "text-white" },
    { value: 50, label: "50", color: "text-white" },
    { value: 100, label: "100", color: "text-white" },
  ];

  return (
    <>
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="form-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 clean-text">
              Email Composer
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose your sending mode and craft the perfect message for your audience.
            </p>
          </div>

          <Card className="glass-effect border-white/10 bg-transparent">
            <CardContent className="p-8">
              {/* Email Configuration Toggle */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEmailConfig(!showEmailConfig)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Email Configuration
                </Button>
              </div>

              {/* Email Configuration */}
              {showEmailConfig && (
                <div className="space-y-6 mb-6 p-6 bg-black/40 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lock className="h-5 w-5 text-white" />
                    <h3 className="text-lg font-semibold text-white">SMTP Configuration</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="smtp-host" className="text-gray-300 mb-2">
                        SMTP Host
                      </Label>
                      <Input
                        id="smtp-host"
                        type="text"
                        placeholder="smtp.gmail.com"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        className="bg-black/50 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtp-port" className="text-gray-300 mb-2">
                        SMTP Port
                      </Label>
                      <Input
                        id="smtp-port"
                        type="text"
                        placeholder="587"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                        className="bg-black/50 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtp-user" className="text-gray-300 mb-2">
                        SMTP Username
                      </Label>
                      <Input
                        id="smtp-user"
                        type="email"
                        placeholder="your-email@gmail.com"
                        value={smtpUser}
                        onChange={(e) => setSmtpUser(e.target.value)}
                        className="bg-black/50 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtp-password" className="text-gray-300 mb-2">
                        SMTP Password
                      </Label>
                      <Input
                        id="smtp-password"
                        type="password"
                        placeholder="your-app-password"
                        value={smtpPassword}
                        onChange={(e) => setSmtpPassword(e.target.value)}
                        className="bg-black/50 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="from-email" className="text-gray-300 mb-2">
                      From Email Address
                    </Label>
                    <Input
                      id="from-email"
                      type="email"
                      placeholder="noreply@yourcompany.com"
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                      className="bg-black/50 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              )}

              {/* Mode Toggle */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <User className="text-2xl text-white" />
                  <span className="text-lg font-medium text-white hidden sm:inline">Individual Email</span>
                </div>
                <Switch
                  checked={isBulkMode}
                  onCheckedChange={setIsBulkMode}
                  className="data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-600"
                />
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium text-white hidden sm:inline">Bulk HR Email</span>
                  <Users className="text-2xl text-white" />
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
                        className="bg-black/50 border-white/20 text-white placeholder-gray-400"
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
                        className="bg-black/50 border-white/20 text-white placeholder-gray-400"
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
                    <div className="grid grid-cols-3 gap-4 mb-6">
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
                  <div>
                    <Label className="text-gray-300 mb-2">Import Recipients from CSV</Label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCsvUpload}
                      className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                    <div className="text-xs text-gray-400 mt-1">CSV must have columns: <b>email</b>, <b>name</b></div>
                    {csvError && <div className="text-red-400 text-xs mt-1">{csvError}</div>}
                    {csvRecipients.length > 0 && (
                      <div className="text-green-400 text-xs mt-2">{csvRecipients.length} recipients loaded from CSV.</div>
                    )}
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
                    className="bg-black/50 border-white/20 text-white placeholder-gray-400"
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
                    className="bg-black/50 border-white/20 text-white placeholder-gray-400 resize-none"
                  />
                </div>
              </div>

              {/* Send Button */}
              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleSendEmail}
                  disabled={individualEmailMutation.isPending || bulkEmailMutation.isPending}
                  className="clean-button px-8 py-4 text-lg font-semibold"
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
