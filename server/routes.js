"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
var http_1 = require("http");
var storage_1 = require("./storage");
var schema_1 = require("@shared/schema");
var nodemailer_1 = require("nodemailer");
function registerRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var transporter, httpServer;
        var _this = this;
        return __generator(this, function (_a) {
            transporter = nodemailer_1.default.createTransport({
                host: process.env.SMTP_HOST || "smtp.gmail.com",
                port: parseInt(process.env.SMTP_PORT || "587"),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER || process.env.EMAIL_USER,
                    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
                },
            });
            // Get HR contacts (internal only - not exposed to client)
            app.get("/api/hr-contacts", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var limit, contacts, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            limit = req.query.limit ? parseInt(req.query.limit) : undefined;
                            return [4 /*yield*/, storage_1.storage.getHrContacts(limit)];
                        case 1:
                            contacts = _a.sent();
                            // Only return count for security, not actual contact data
                            res.json({ count: contacts.length });
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error("Error fetching HR contacts:", error_1);
                            res.status(500).json({ error: "Failed to fetch HR contacts" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Get HR contacts count
            app.get("/api/hr-contacts/count", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var count, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_1.storage.getHrContactsCount()];
                        case 1:
                            count = _a.sent();
                            res.json({ count: count });
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            console.error("Error fetching HR contacts count:", error_2);
                            res.status(500).json({ error: "Failed to fetch HR contacts count" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Send individual email
            app.post("/api/send-email", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var validatedData, emailLog, emailError_1, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, , 9]);
                            validatedData = schema_1.sendEmailSchema.parse(req.body);
                            return [4 /*yield*/, storage_1.storage.createEmailLog({
                                    recipientEmail: validatedData.recipientEmail,
                                    recipientName: validatedData.recipientName,
                                    subject: validatedData.subject,
                                    message: validatedData.message,
                                    type: validatedData.type,
                                    status: "pending",
                                })];
                        case 1:
                            emailLog = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 7]);
                            return [4 /*yield*/, transporter.sendMail({
                                    from: process.env.SMTP_FROM || process.env.EMAIL_FROM || "noreply@emailnow.com",
                                    to: validatedData.recipientEmail,
                                    subject: validatedData.subject,
                                    html: "\n            <div style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333;\">\n              <h2>Hello ".concat(validatedData.recipientName, ",</h2>\n              <div style=\"white-space: pre-wrap;\">").concat(validatedData.message, "</div>\n              <br>\n              <p>Best regards,<br>EmailNow Team</p>\n            </div>\n          "),
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, storage_1.storage.updateEmailLogStatus(emailLog.id, "sent", new Date())];
                        case 4:
                            _a.sent();
                            res.json({ success: true, message: "Email sent successfully" });
                            return [3 /*break*/, 7];
                        case 5:
                            emailError_1 = _a.sent();
                            console.error("Error sending email:", emailError_1);
                            return [4 /*yield*/, storage_1.storage.updateEmailLogStatus(emailLog.id, "failed")];
                        case 6:
                            _a.sent();
                            res.status(500).json({ error: "Failed to send email" });
                            return [3 /*break*/, 7];
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            error_3 = _a.sent();
                            console.error("Error processing email request:", error_3);
                            res.status(400).json({ error: "Invalid request data" });
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            }); });
            // Send bulk emails
            app.post("/api/send-bulk-emails", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var _a, subject_1, message_1, quantity, recipients, contacts, emailPromises, results, successful, failed, error_4;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 6, , 7]);
                            _a = req.body, subject_1 = _a.subject, message_1 = _a.message, quantity = _a.quantity, recipients = _a.recipients;
                            if (!subject_1 || !message_1) {
                                return [2 /*return*/, res.status(400).json({ error: "Subject and message are required" })];
                            }
                            contacts = [];
                            if (!(Array.isArray(recipients) && recipients.length > 0)) return [3 /*break*/, 1];
                            // Use recipients from CSV upload
                            contacts = recipients.slice(0, 250).map(function (r) { return ({
                                email: r.email,
                                name: r.name || "",
                            }); });
                            return [3 /*break*/, 4];
                        case 1:
                            if (!quantity) return [3 /*break*/, 3];
                            return [4 /*yield*/, storage_1.storage.getHrContacts(quantity)];
                        case 2:
                            // Fallback to HR contacts by quantity
                            contacts = _b.sent();
                            return [3 /*break*/, 4];
                        case 3: return [2 /*return*/, res.status(400).json({ error: "Either recipients array or quantity is required" })];
                        case 4:
                            if (contacts.length === 0) {
                                return [2 /*return*/, res.status(400).json({ error: "No recipients available" })];
                            }
                            emailPromises = contacts.map(function (contact) { return __awaiter(_this, void 0, void 0, function () {
                                var emailLog, emailError_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, storage_1.storage.createEmailLog({
                                                recipientEmail: contact.email,
                                                recipientName: contact.name,
                                                subject: subject_1,
                                                message: message_1,
                                                type: "bulk",
                                                status: "pending",
                                            })];
                                        case 1:
                                            emailLog = _a.sent();
                                            _a.label = 2;
                                        case 2:
                                            _a.trys.push([2, 5, , 7]);
                                            return [4 /*yield*/, transporter.sendMail({
                                                    from: process.env.SMTP_FROM || process.env.EMAIL_FROM || "noreply@emailnow.com",
                                                    to: contact.email,
                                                    subject: subject_1,
                                                    html: "\n              <div style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333;\">\n                <h2>Hello ".concat(contact.name, ",</h2>\n                <div style=\"white-space: pre-wrap;\">").concat(message_1, "</div>\n                <br>\n                <p>Best regards,<br>EmailNow Team</p>\n              </div>\n            "),
                                                })];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, storage_1.storage.updateEmailLogStatus(emailLog.id, "sent", new Date())];
                                        case 4:
                                            _a.sent();
                                            return [2 /*return*/, { success: true, contact: contact.email }];
                                        case 5:
                                            emailError_2 = _a.sent();
                                            console.error("Error sending email to ".concat(contact.email, ":"), emailError_2);
                                            return [4 /*yield*/, storage_1.storage.updateEmailLogStatus(emailLog.id, "failed")];
                                        case 6:
                                            _a.sent();
                                            return [2 /*return*/, { success: false, contact: contact.email, error: emailError_2 instanceof Error ? emailError_2.message : 'Unknown error' }];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.allSettled(emailPromises)];
                        case 5:
                            results = _b.sent();
                            successful = results.filter(function (r) { return r.status === "fulfilled" && r.value.success; }).length;
                            failed = results.length - successful;
                            res.json({
                                success: true,
                                message: "Bulk email campaign completed. ".concat(successful, " emails sent successfully, ").concat(failed, " failed."),
                                results: {
                                    total: results.length,
                                    successful: successful,
                                    failed: failed,
                                },
                            });
                            return [3 /*break*/, 7];
                        case 6:
                            error_4 = _b.sent();
                            console.error("Error processing bulk email request:", error_4);
                            res.status(500).json({ error: "Failed to process bulk email request" });
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            }); });
            // Get email logs
            app.get("/api/email-logs", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var logs, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, storage_1.storage.getEmailLogs()];
                        case 1:
                            logs = _a.sent();
                            res.json(logs);
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            console.error("Error fetching email logs:", error_5);
                            res.status(500).json({ error: "Failed to fetch email logs" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            // Health check endpoint
            app.get("/api/health", function (req, res) {
                res.json({ status: "healthy", timestamp: new Date().toISOString() });
            });
            // Analytics endpoint
            app.get("/api/analytics", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var logs, hrContactsCount, analytics, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, storage_1.storage.getEmailLogs()];
                        case 1:
                            logs = _a.sent();
                            return [4 /*yield*/, storage_1.storage.getHrContactsCount()];
                        case 2:
                            hrContactsCount = _a.sent();
                            analytics = {
                                totalEmails: logs.length,
                                sentEmails: logs.filter(function (log) { return log.status === "sent"; }).length,
                                failedEmails: logs.filter(function (log) { return log.status === "failed"; }).length,
                                pendingEmails: logs.filter(function (log) { return log.status === "pending"; }).length,
                                totalHrContacts: hrContactsCount,
                                recentActivity: logs.slice(-10).reverse()
                            };
                            res.json(analytics);
                            return [3 /*break*/, 4];
                        case 3:
                            error_6 = _a.sent();
                            console.error("Error fetching analytics:", error_6);
                            res.status(500).json({ error: "Failed to fetch analytics" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            // Status endpoint for public metrics
            app.get("/api/status", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var logs, hrContactsCount, publicMetrics, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, storage_1.storage.getEmailLogs()];
                        case 1:
                            logs = _a.sent();
                            return [4 /*yield*/, storage_1.storage.getHrContactsCount()];
                        case 2:
                            hrContactsCount = _a.sent();
                            publicMetrics = {
                                totalContacts: hrContactsCount,
                                emailsSent: logs.filter(function (log) { return log.status === "sent"; }).length,
                                uptime: "99.9%",
                                status: "operational"
                            };
                            res.json(publicMetrics);
                            return [3 /*break*/, 4];
                        case 3:
                            error_7 = _a.sent();
                            console.error("Error fetching status:", error_7);
                            res.status(500).json({ error: "Failed to fetch status" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            httpServer = (0, http_1.createServer)(app);
            return [2 /*return*/, httpServer];
        });
    });
}
