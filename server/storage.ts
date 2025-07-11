import { hrContacts, emailLogs, type HrContact, type InsertHrContact, type EmailLog, type InsertEmailLog } from "@shared/schema";

export interface IStorage {
  // HR Contacts
  getHrContacts(limit?: number): Promise<HrContact[]>;
  getHrContactsCount(): Promise<number>;
  
  // Email Logs
  createEmailLog(log: InsertEmailLog): Promise<EmailLog>;
  getEmailLogs(): Promise<EmailLog[]>;
  updateEmailLogStatus(id: number, status: string, sentAt?: Date): Promise<void>;
}

export class MemStorage implements IStorage {
  private hrContacts: Map<number, HrContact>;
  private emailLogs: Map<number, EmailLog>;
  private hrContactsCurrentId: number;
  private emailLogsCurrentId: number;

  constructor() {
    this.hrContacts = new Map();
    this.emailLogs = new Map();
    this.hrContactsCurrentId = 1;
    this.emailLogsCurrentId = 1;
    
    // Initialize with sample HR contacts
    this.initializeHrContacts();
  }

  private initializeHrContacts() {
    const sampleContacts: Omit<HrContact, 'id'>[] = [
  { "name": "Vivek Sharma", "email": "vivek.sharma@techcorp.com", "company": "TechCorp", "position": "HR Manager", "industry": "Technology" },
  { "name": "Shashwat Mishra", "email": "shashwat.mishra@innovatetech.com", "company": "InnovateTech", "position": "Recruitment Specialist", "industry": "Technology" },
  { "name": "Rishabh Dwivedi", "email": "rishabh.dwivedi@futuresoft.com", "company": "FutureSoft", "position": "Head of Talent", "industry": "Software" },
  { "name": "Ayush Mishra", "email": "ayush.mishra@globalcorp.com", "company": "GlobalCorp", "position": "Talent Acquisition", "industry": "Finance" },
  { "name": "Divyansh Yadav", "email": "divyansh.yadav@startupx.com", "company": "StartupX", "position": "People Operations", "industry": "Technology" },
  { "name": "Sreyash Singh", "email": "sreyash.singh@megacorp.com", "company": "MegaCorp", "position": "HR Director", "industry": "Manufacturing" },
  { "name": "Anirya Tiwari", "email": "anirya.tiwari@techstart.com", "company": "TechStart", "position": "Recruitment Lead", "industry": "Technology" },
  { "name": "Sushank Sahil", "email": "sushank.sahil@innovativeltd.com", "company": "Innovative Ltd", "position": "HR Business Partner", "industry": "Consulting" },
  { "name": "Arsh Tiwari", "email": "arsh.tiwari@digitalagency.com", "company": "Digital Agency", "position": "Talent Manager", "industry": "Marketing" },
  { "name": "Abhay Gangwar", "email": "abhay.gangwar@cloudtech.com", "company": "CloudTech", "position": "Senior Recruiter", "industry": "Technology" },
  { "name": "Apurv Shukla", "email": "apurv.shukla@healthtech.com", "company": "HealthTech", "position": "HR Coordinator", "industry": "Healthcare" },
  { "name": "Vaibhav Pandey", "email": "vaibhav.pandey@fintech.com", "company": "FinTech", "position": "Recruitment Manager", "industry": "Finance" },
  { "name": "Ashutosh Pandey", "email": "ashutosh.pandey@edutech.com", "company": "EduTech", "position": "People & Culture", "industry": "Education" },
  { "name": "Arin Shukla", "email": "arin.shukla@greentech.com", "company": "GreenTech", "position": "Talent Acquisition Lead", "industry": "Environment" },
  { "name": "Anuj Pundir", "email": "anuj.pundir@retailtech.com", "company": "RetailTech", "position": "HR Manager", "industry": "Retail" },
  { "name": "Akash Rawat", "email": "akash.rawat@aerospace.com", "company": "Aerospace Corp", "position": "Recruitment Specialist", "industry": "Aerospace" },
  { "name": "Shiv Vashisth", "email": "shiv.vashisth@biotech.com", "company": "BioTech", "position": "Senior HR Partner", "industry": "Biotechnology" },
  { "name": "Anuj Choudhary", "email": "anuj.choudhary@cybersec.com", "company": "CyberSec", "position": "Talent Director", "industry": "Security" },
  { "name": "Sahil Kushwaha", "email": "sahil.kushwaha@aitech.com", "company": "AITech", "position": "Recruitment Lead", "industry": "AI/ML" },
  { "name": "Vivek Sharma", "email": "vivek.sharma@robotics.com", "company": "Robotics Inc", "position": "HR Coordinator", "industry": "Robotics" },
  { "name": "Shashwat Mishra", "email": "shashwat.mishra@blocktech.com", "company": "BlockTech", "position": "Talent Acquisition", "industry": "Blockchain" },
  { "name": "Rishabh Dwivedi", "email": "rishabh.dwivedi@gametech.com", "company": "GameTech", "position": "Senior Recruiter", "industry": "Gaming" },
  { "name": "Ayush Mishra", "email": "ayush.mishra@foodtech.com", "company": "FoodTech", "position": "People Operations", "industry": "Food & beverage" },
  { "name": "Divyansh Yadav", "email": "divyansh.yadav@traveltech.com", "company": "TravelTech", "position": "HR Business Partner", "industry": "Travel" },
  { "name": "Sreyash Singh", "email": "sreyash.singh@proptech.com", "company": "PropTech", "position": "Talent Manager", "industry": "Real Estate" },
  { "name": "Anirya Tiwari", "email": "anirya.tiwari@insurtech.com", "company": "InsurTech", "position": "Recruitment Manager", "industry": "Insurance" },
  { "name": "Sushank Sahil", "email": "sushank.sahil@legaltech.com", "company": "LegalTech", "position": "HR Director", "industry": "Legal" },
  { "name": "Arsh Tiwari", "email": "arsh.tiwari@mediatech.com", "company": "MediaTech", "position": "Senior Recruiter", "industry": "Media" },
  { "name": "Abhay Gangwar", "email": "abhay.gangwar@adtech.com", "company": "AdTech", "position": "Talent Acquisition Lead", "industry": "Advertising" },
  { "name": "Apurv Shukla", "email": "apurv.shukla@sporttech.com", "company": "SportTech", "position": "People & Culture", "industry": "Sports" },
  { "name": "Vaibhav Pandey", "email": "vaibhav.pandey@fashiontech.com", "company": "FashionTech", "position": "HR Manager", "industry": "Fashion" },
  { "name": "Ashutosh Pandey", "email": "ashutosh.pandey@energytech.com", "company": "EnergyTech", "position": "Recruitment Specialist", "industry": "Energy" },
  { "name": "Arin Shukla", "email": "arin.shukla@autotech.com", "company": "AutoTech", "position": "Talent Director", "industry": "Automotive" },
  { "name": "Anuj Pundir", "email": "anuj.pundir@artech.com", "company": "ARTech", "position": "Senior HR Partner", "industry": "Augmented Reality" },
  { "name": "Akash Rawat", "email": "akash.rawat@vrtech.com", "company": "VRTech", "position": "Recruitment Lead", "industry": "Virtual Reality" },
  { "name": "Shiv Vashisth", "email": "shiv.vashisth@iotech.com", "company": "IoTech", "position": "HR Coordinator", "industry": "IoT" },
  { "name": "Anuj Choudhary", "email": "anuj.choudhary@datatech.com", "company": "DataTech", "position": "Talent Acquisition", "industry": "Data Science" },
  { "name": "Sahil Kushwaha", "email": "sahil.kushwaha@mltech.com", "company": "MLTech", "position": "Senior Recruiter", "industry": "Machine Learning" },
  { "name": "Vivek Sharma", "email": "vivek.sharma@nanotech.com", "company": "NanoTech", "position": "People Operations", "industry": "Nanotechnology" },
  { "name": "Shashwat Mishra", "email": "shashwat.mishra@quantumtech.com", "company": "QuantumTech", "position": "HR Business Partner", "industry": "Quantum Computing" },
  { "name": "Rishabh Dwivedi", "email": "rishabh.dwivedi@spacetech.com", "company": "SpaceTech", "position": "Talent Manager", "industry": "Space Technology" },
  { "name": "Ayush Mishra", "email": "ayush.mishra@cleantech.com", "company": "CleanTech", "position": "Recruitment Manager", "industry": "Clean Technology" },
  { "name": "Divyansh Yadav", "email": "divyansh.yadav@agritech.com", "company": "AgriTech", "position": "HR Director", "industry": "Agriculture" },
  { "name": "Sreyash Singh", "email": "sreyash.singh@musictech.com", "company": "MusicTech", "position": "Senior Recruiter", "industry": "Music Technology" },
  { "name": "Anirya Tiwari", "email": "anirya.tiwari@edtech.com", "company": "EdTech", "position": "Talent Acquisition Lead", "industry": "Educational Technology" },
  { "name": "Sushank Sahil", "email": "sushank.sahil@martech.com", "company": "MarTech", "position": "People & Culture", "industry": "Marketing Technology" },
  { "name": "Arsh Tiwari", "email": "arsh.tiwari@hrtech.com", "company": "HRTech", "position": "HR Manager", "industry": "Human Resources Technology" },
  { "name": "Abhay Gangwar", "email": "abhay.gangwar@salestech.com", "company": "SalesTech", "position": "Recruitment Specialist", "industry": "Sales Technology" },
  { "name": "Apurv Shukla", "email": "apurv.shukla@devtools.com", "company": "DevTools", "position": "Talent Director", "industry": "Developer Tools" },
  { "name": "Vaibhav Pandey", "email": "vaibhav.pandey@apitech.com", "company": "APITech", "position": "Senior HR Partner", "industry": "API Technology" },
  { "name": "Ashutosh Pandey", "email": "ashutosh.pandey@platformtech.com", "company": "PlatformTech", "position": "Recruitment Lead", "industry": "Platform Technology" },
  { "name": "Arin Shukla", "email": "arin.shukla@infratech.com", "company": "InfraTech", "position": "HR Coordinator", "industry": "Infrastructure" },
  { "name": "Anuj Pundir", "email": "anuj.pundir@securitytech.com", "company": "SecurityTech", "position": "Talent Acquisition", "industry": "Security Technology" },
  { "name": "Akash Rawat", "email": "akash.rawat@networktech.com", "company": "NetworkTech", "position": "Senior Recruiter", "industry": "Networking" },
  { "name": "Shiv Vashisth", "email": "shiv.vashisth@cloudplatform.com", "company": "CloudPlatform", "position": "People Operations", "industry": "Cloud Platforms" },
  { "name": "Anuj Choudhary", "email": "anuj.choudhary@devopstech.com", "company": "DevOpsTech", "position": "HR Business Partner", "industry": "DevOps" },
  { "name": "Sahil Kushwaha", "email": "sahil.kushwaha@containertech.com", "company": "ContainerTech", "position": "Talent Manager", "industry": "Container Technology" },
  { "name": "Vivek Sharma", "email": "vivek.sharma@microservices.com", "company": "MicroServices", "position": "Recruitment Manager", "industry": "Microservices" },
  { "name": "Shashwat Mishra", "email": "shashwat.mishra@serverless.com", "company": "Serverless", "position": "HR Director", "industry": "Serverless Technology" },
  { "name": "Rishabh Dwivedi", "email": "rishabh.dwivedi@jamstack.com", "company": "JAMStack", "position": "Senior Recruiter", "industry": "JAMStack" },
  { "name": "Ayush Mishra", "email": "ayush.mishra@headless.com", "company": "Headless", "position": "Talent Acquisition Lead", "industry": "Headless Technology" },
  { "name": "Divyansh Yadav", "email": "divyansh.yadav@nocode.com", "company": "NoCode", "position": "People & Culture", "industry": "No-Code Platforms" },
  { "name": "Sreyash Singh", "email": "sreyash.singh@lowcode.com", "company": "LowCode", "position": "HR Manager", "industry": "Low-Code Platforms" },
  { "name": "Anirya Tiwari", "email": "anirya.tiwari@automationtech.com", "company": "AutomationTech", "position": "Recruitment Specialist", "industry": "Automation" },
  { "name": "Sushank Sahil", "email": "sushank.sahil@workflowtech.com", "company": "WorkflowTech", "position": "Talent Director", "industry": "Workflow Technology" },
  { "name": "Arsh Tiwari", "email": "arsh.tiwari@integrationtech.com", "company": "IntegrationTech", "position": "Senior HR Partner", "industry": "Integration Technology" },
  { "name": "Abhay Gangwar", "email": "abhay.gangwar@dataintegration.com", "company": "DataIntegration", "position": "Recruitment Lead", "industry": "Data Integration" },
  { "name": "Apurv Shukla", "email": "apurv.shukla@etltech.com", "company": "ETLTech", "position": "HR Coordinator", "industry": "ETL Technology" },
  { "name": "Vaibhav Pandey", "email": "vaibhav.pandey@analyticstech.com", "company": "AnalyticsTech", "position": "Talent Acquisition", "industry": "Analytics" },
  { "name": "Ashutosh Pandey", "email": "ashutosh.pandey@bitech.com", "company": "BITech", "position": "Senior Recruiter", "industry": "Business Intelligence" },
  { "name": "Arin Shukla", "email": "arin.shukla@dashboardtech.com", "company": "DashboardTech", "position": "People Operations", "industry": "Dashboard Technology" },
  { "name": "Anuj Pundir", "email": "anuj.pundir@visualizationtech.com", "company": "VisualizationTech", "position": "HR Business Partner", "industry": "Data Visualization" },
  { "name": "Akash Rawat", "email": "akash.rawat@reportingtech.com", "company": "ReportingTech", "position": "Talent Manager", "industry": "Reporting Technology" },
  { "name": "Shiv Vashisth", "email": "shiv.vashisth@kpitech.com", "company": "KPITech", "position": "Recruitment Manager", "industry": "KPI Technology" },
  { "name": "Anuj Choudhary", "email": "anuj.choudhary@metricstech.com", "company": "MetricsTech", "position": "HR Director", "industry": "Metrics Technology" },
  { "name": "Sahil Kushwaha", "email": "sahil.kushwaha@observabilitytech.com", "company": "ObservabilityTech", "position": "Senior Recruiter", "industry": "Observability" },
  { "name": "Vivek Sharma", "email": "vivek.sharma@monitoringtech.com", "company": "MonitoringTech", "position": "Talent Acquisition Lead", "industry": "Monitoring Technology" },
  { "name": "Shashwat Mishra", "email": "shashwat.mishra@loggingtech.com", "company": "LoggingTech", "position": "People & Culture", "industry": "Logging Technology" },
  { "name": "Rishabh Dwivedi", "email": "rishabh.dwivedi@tracingtech.com", "company": "TracingTech", "position": "HR Manager", "industry": "Tracing Technology" },
  { "name": "Ayush Mishra", "email": "ayush.mishra@apmtech.com", "company": "APMTech", "position": "Recruitment Specialist", "industry": "APM Technology" },
  { "name": "Divyansh Yadav", "email": "divyansh.yadav@perftech.com", "company": "PerfTech", "position": "Talent Director", "industry": "Performance Technology" },
  { "name": "Sreyash Singh", "email": "sreyash.singh@loadtech.com", "company": "LoadTech", "position": "Senior HR Partner", "industry": "Load Testing" },
  { "name": "Anirya Tiwari", "email": "anirya.tiwari@stresstech.com", "company": "StressTech", "position": "Recruitment Lead", "industry": "Stress Testing" },
  { "name": "Sushank Sahil", "email": "sushank.sahil@testingtech.com", "company": "TestingTech", "position": "HR Coordinator", "industry": "Testing Technology" },
  { "name": "Arsh Tiwari", "email": "arsh.tiwari@qatech.com", "company": "QATech", "position": "Talent Acquisition", "industry": "Quality Assurance" },
  { "name": "Abhay Gangwar", "email": "abhay.gangwar@automatedtest.com", "company": "AutomatedTest", "position": "Senior Recruiter", "industry": "Test Automation" },
  { "name": "Apurv Shukla", "email": "apurv.shukla@cicdtech.com", "company": "CICDTech", "position": "People Operations", "industry": "CI/CD Technology" },
  { "name": "Vaibhav Pandey", "email": "vaibhav.pandey@deploytech.com", "company": "DeployTech", "position": "HR Business Partner", "industry": "Deployment Technology" },
  { "name": "Ashutosh Pandey", "email": "ashutosh.pandey@releasetech.com", "company": "ReleaseTech", "position": "Talent Manager", "industry": "Release Management" },
  { "name": "Arin Shukla", "email": "arin.shukla@versiontech.com", "company": "VersionTech", "position": "Recruitment Manager", "industry": "Version Control" },
  { "name": "Anuj Pundir", "email": "anuj.pundir@gittech.com", "company": "GitTech", "position": "HR Director", "industry": "Git Technology" },
  { "name": "Akash Rawat", "email": "akash.rawat@codetech.com", "company": "CodeTech", "position": "Senior Recruiter", "industry": "Code Management" },
  { "name": "Shiv Vashisth", "email": "shiv.vashisth@reviewtech.com", "company": "ReviewTech", "position": "Talent Acquisition Lead", "industry": "Code Review" },
  { "name": "Anuj Choudhary", "email": "anuj.choudhary@collaborationtech.com", "company": "CollaborationTech", "position": "People & Culture", "industry": "Collaboration Technology" },
  { "name": "Sahil Kushwaha", "email": "sahil.kushwaha@teamtech.com", "company": "TeamTech", "position": "HR Manager", "industry": "Team Technology" },
  { "name": "Vivek Sharma", "email": "vivek.sharma@projecttech.com", "company": "ProjectTech", "position": "Recruitment Specialist", "industry": "Project Management" },
  { "name": "Shashwat Mishra", "email": "shashwat.mishra@tasktech.com", "company": "TaskTech", "position": "Talent Director", "industry": "Task Management" },
  { "name": "Rishabh Dwivedi", "email": "rishabh.dwivedi@tickettech.com", "company": "TicketTech", "position": "Senior HR Partner", "industry": "Ticketing Technology" },
  { "name": "Ayush Mishra", "email": "ayush.mishra@issuetech.com", "company": "IssueTech", "position": "Recruitment Lead", "industry": "Issue Tracking" },
  { "name": "Divyansh Yadav", "email": "divyansh.yadav@bugtech.com", "company": "BugTech", "position": "HR Coordinator", "industry": "Bug Tracking" },
  { "name": "Sreyash Singh", "email": "sreyash.singh@supporttech.com", "company": "SupportTech", "position": "Talent Acquisition", "industry": "Support Technology" },
  { "name": "Anirya Tiwari", "email": "anirya.tiwari@helpdesk.com", "company": "HelpDesk", "position": "Senior Recruiter", "industry": "Help Desk" },
  { "name": "Sushank Sahil", "email": "sushank.sahil@servicetech.com", "company": "ServiceTech", "position": "People Operations", "industry": "Service Management" },
  { "name": "Arsh Tiwari", "email": "arsh.tiwari@incidenttech.com", "company": "IncidentTech", "position": "HR Business Partner", "industry": "Incident Management" },
  { "name": "Abhay Gangwar", "email": "abhay.gangwar@alerttech.com", "company": "AlertTech", "position": "Talent Manager", "industry": "Alert Technology" },
  { "name": "Apurv Shukla", "email": "apurv.shukla@notificationtech.com", "company": "NotificationTech", "position": "Recruitment Manager", "industry": "Notification Technology" }
];

    sampleContacts.forEach(contact => {
      const id = this.hrContactsCurrentId++;
      this.hrContacts.set(id, { ...contact, id });
    });
  }

  async getHrContacts(limit?: number): Promise<HrContact[]> {
    const contacts = Array.from(this.hrContacts.values());
    return limit ? contacts.slice(0, limit) : contacts;
  }

  async getHrContactsCount(): Promise<number> {
    return this.hrContacts.size;
  }

  async createEmailLog(log: InsertEmailLog): Promise<EmailLog> {
    const id = this.emailLogsCurrentId++;
    const emailLog: EmailLog = { 
      ...log, 
      id, 
      sentAt: null,
      recipientName: log.recipientName || null
    };
    this.emailLogs.set(id, emailLog);
    return emailLog;
  }

  async getEmailLogs(): Promise<EmailLog[]> {
    return Array.from(this.emailLogs.values());
  }

  async updateEmailLogStatus(id: number, status: string, sentAt?: Date): Promise<void> {
    const log = this.emailLogs.get(id);
    if (log) {
      log.status = status;
      if (sentAt) {
        log.sentAt = sentAt;
      }
      this.emailLogs.set(id, log);
    }
  }
}

export const storage = new MemStorage();
