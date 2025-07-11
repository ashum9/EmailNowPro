import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmailSchema } from "@shared/schema";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    },
  });

  // Get HR contacts
  app.get("/api/hr-contacts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const contacts = await storage.getHrContacts(limit);
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching HR contacts:", error);
      res.status(500).json({ error: "Failed to fetch HR contacts" });
    }
  });

  // Get HR contacts count
  app.get("/api/hr-contacts/count", async (req, res) => {
    try {
      const count = await storage.getHrContactsCount();
      res.json({ count });
    } catch (error) {
      console.error("Error fetching HR contacts count:", error);
      res.status(500).json({ error: "Failed to fetch HR contacts count" });
    }
  });

  // Send individual email
  app.post("/api/send-email", async (req, res) => {
    try {
      const validatedData = sendEmailSchema.parse(req.body);
      
      // Create email log
      const emailLog = await storage.createEmailLog({
        recipientEmail: validatedData.recipientEmail,
        recipientName: validatedData.recipientName,
        subject: validatedData.subject,
        message: validatedData.message,
        type: validatedData.type,
        status: "pending",
      });

      // Send email
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.EMAIL_FROM || "noreply@emailnow.com",
          to: validatedData.recipientEmail,
          subject: validatedData.subject,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2>Hello ${validatedData.recipientName},</h2>
              <div style="white-space: pre-wrap;">${validatedData.message}</div>
              <br>
              <p>Best regards,<br>EmailNow Team</p>
            </div>
          `,
        });

        await storage.updateEmailLogStatus(emailLog.id, "sent", new Date());
        res.json({ success: true, message: "Email sent successfully" });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        await storage.updateEmailLogStatus(emailLog.id, "failed");
        res.status(500).json({ error: "Failed to send email" });
      }
    } catch (error) {
      console.error("Error processing email request:", error);
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Send bulk emails
  app.post("/api/send-bulk-emails", async (req, res) => {
    try {
      const { subject, message, quantity } = req.body;
      
      if (!subject || !message || !quantity) {
        return res.status(400).json({ error: "Subject, message, and quantity are required" });
      }

      // Get HR contacts based on quantity
      const contacts = await storage.getHrContacts(quantity);
      
      if (contacts.length === 0) {
        return res.status(400).json({ error: "No HR contacts available" });
      }

      const emailPromises = contacts.map(async (contact) => {
        // Create email log
        const emailLog = await storage.createEmailLog({
          recipientEmail: contact.email,
          recipientName: contact.name,
          subject,
          message,
          type: "bulk",
          status: "pending",
        });

        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.EMAIL_FROM || "noreply@emailnow.com",
            to: contact.email,
            subject,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Hello ${contact.name},</h2>
                <div style="white-space: pre-wrap;">${message}</div>
                <br>
                <p>Best regards,<br>EmailNow Team</p>
              </div>
            `,
          });

          await storage.updateEmailLogStatus(emailLog.id, "sent", new Date());
          return { success: true, contact: contact.email };
        } catch (emailError) {
          console.error(`Error sending email to ${contact.email}:`, emailError);
          await storage.updateEmailLogStatus(emailLog.id, "failed");
          return { success: false, contact: contact.email, error: emailError instanceof Error ? emailError.message : 'Unknown error' };
        }
      });

      const results = await Promise.allSettled(emailPromises);
      const successful = results.filter(r => r.status === "fulfilled" && r.value.success).length;
      const failed = results.length - successful;

      res.json({
        success: true,
        message: `Bulk email campaign completed. ${successful} emails sent successfully, ${failed} failed.`,
        results: {
          total: results.length,
          successful,
          failed,
        },
      });
    } catch (error) {
      console.error("Error processing bulk email request:", error);
      res.status(500).json({ error: "Failed to process bulk email request" });
    }
  });

  // Get email logs
  app.get("/api/email-logs", async (req, res) => {
    try {
      const logs = await storage.getEmailLogs();
      res.json(logs);
    } catch (error) {
      console.error("Error fetching email logs:", error);
      res.status(500).json({ error: "Failed to fetch email logs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
