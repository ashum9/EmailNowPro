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
      { name: "Sarah Johnson", email: "sarah.johnson@techcorp.com", company: "TechCorp", position: "HR Manager", industry: "Technology" },
      { name: "Michael Chen", email: "michael.chen@innovatetech.com", company: "InnovateTech", position: "Recruitment Specialist", industry: "Technology" },
      { name: "Emily Rodriguez", email: "emily.rodriguez@futuresoft.com", company: "FutureSoft", position: "Head of Talent", industry: "Software" },
      { name: "David Kim", email: "david.kim@globalcorp.com", company: "GlobalCorp", position: "Talent Acquisition", industry: "Finance" },
      { name: "Lisa Wang", email: "lisa.wang@startupx.com", company: "StartupX", position: "People Operations", industry: "Technology" },
      { name: "James Wilson", email: "james.wilson@megacorp.com", company: "MegaCorp", position: "HR Director", industry: "Manufacturing" },
      { name: "Maria Garcia", email: "maria.garcia@techstart.com", company: "TechStart", position: "Recruitment Lead", industry: "Technology" },
      { name: "Robert Taylor", email: "robert.taylor@innovativeltd.com", company: "Innovative Ltd", position: "HR Business Partner", industry: "Consulting" },
      { name: "Jennifer Brown", email: "jennifer.brown@digitalagency.com", company: "Digital Agency", position: "Talent Manager", industry: "Marketing" },
      { name: "Kevin Zhang", email: "kevin.zhang@cloudtech.com", company: "CloudTech", position: "Senior Recruiter", industry: "Technology" },
      { name: "Amanda Miller", email: "amanda.miller@healthtech.com", company: "HealthTech", position: "HR Coordinator", industry: "Healthcare" },
      { name: "Christopher Lee", email: "christopher.lee@fintech.com", company: "FinTech", position: "Recruitment Manager", industry: "Finance" },
      { name: "Stephanie Clark", email: "stephanie.clark@edutech.com", company: "EduTech", position: "People & Culture", industry: "Education" },
      { name: "Daniel Martinez", email: "daniel.martinez@greentech.com", company: "GreenTech", position: "Talent Acquisition Lead", industry: "Environment" },
      { name: "Michelle Anderson", email: "michelle.anderson@retailtech.com", company: "RetailTech", position: "HR Manager", industry: "Retail" },
      { name: "Brian Thompson", email: "brian.thompson@aerospace.com", company: "Aerospace Corp", position: "Recruitment Specialist", industry: "Aerospace" },
      { name: "Laura Davis", email: "laura.davis@biotech.com", company: "BioTech", position: "Senior HR Partner", industry: "Biotechnology" },
      { name: "Andrew Wilson", email: "andrew.wilson@cybersec.com", company: "CyberSec", position: "Talent Director", industry: "Security" },
      { name: "Rachel Kim", email: "rachel.kim@aitech.com", company: "AITech", position: "Recruitment Lead", industry: "AI/ML" },
      { name: "Marcus Johnson", email: "marcus.johnson@robotics.com", company: "Robotics Inc", position: "HR Coordinator", industry: "Robotics" },
      { name: "Samantha Lee", email: "samantha.lee@blocktech.com", company: "BlockTech", position: "Talent Acquisition", industry: "Blockchain" },
      { name: "Thomas Garcia", email: "thomas.garcia@gametech.com", company: "GameTech", position: "Senior Recruiter", industry: "Gaming" },
      { name: "Nicole Brown", email: "nicole.brown@foodtech.com", company: "FoodTech", position: "People Operations", industry: "Food & Beverage" },
      { name: "Jason Wang", email: "jason.wang@traveltech.com", company: "TravelTech", position: "HR Business Partner", industry: "Travel" },
      { name: "Ashley Martinez", email: "ashley.martinez@proptech.com", company: "PropTech", position: "Talent Manager", industry: "Real Estate" },
      { name: "Ryan Thompson", email: "ryan.thompson@insurtech.com", company: "InsurTech", position: "Recruitment Manager", industry: "Insurance" },
      { name: "Kimberly Davis", email: "kimberly.davis@legaltech.com", company: "LegalTech", position: "HR Director", industry: "Legal" },
      { name: "Jonathan Miller", email: "jonathan.miller@mediatech.com", company: "MediaTech", position: "Senior Recruiter", industry: "Media" },
      { name: "Melissa Anderson", email: "melissa.anderson@adtech.com", company: "AdTech", position: "Talent Acquisition Lead", industry: "Advertising" },
      { name: "Charles Wilson", email: "charles.wilson@sporttech.com", company: "SportTech", position: "People & Culture", industry: "Sports" },
      { name: "Elizabeth Clark", email: "elizabeth.clark@fashiontech.com", company: "FashionTech", position: "HR Manager", industry: "Fashion" },
      { name: "Joseph Lee", email: "joseph.lee@energytech.com", company: "EnergyTech", position: "Recruitment Specialist", industry: "Energy" },
      { name: "Jessica Garcia", email: "jessica.garcia@autotech.com", company: "AutoTech", position: "Talent Director", industry: "Automotive" },
      { name: "Matthew Brown", email: "matthew.brown@artech.com", company: "ARTech", position: "Senior HR Partner", industry: "Augmented Reality" },
      { name: "Sarah Davis", email: "sarah.davis@vrtech.com", company: "VRTech", position: "Recruitment Lead", industry: "Virtual Reality" },
      { name: "Michael Thompson", email: "michael.thompson@iotech.com", company: "IoTech", position: "HR Coordinator", industry: "IoT" },
      { name: "Emily Wilson", email: "emily.wilson@datatech.com", company: "DataTech", position: "Talent Acquisition", industry: "Data Science" },
      { name: "David Martinez", email: "david.martinez@mltech.com", company: "MLTech", position: "Senior Recruiter", industry: "Machine Learning" },
      { name: "Lisa Clark", email: "lisa.clark@nanotech.com", company: "NanoTech", position: "People Operations", industry: "Nanotechnology" },
      { name: "James Kim", email: "james.kim@quantumtech.com", company: "QuantumTech", position: "HR Business Partner", industry: "Quantum Computing" },
      { name: "Maria Anderson", email: "maria.anderson@spacetech.com", company: "SpaceTech", position: "Talent Manager", industry: "Space Technology" },
      { name: "Robert Garcia", email: "robert.garcia@cleantech.com", company: "CleanTech", position: "Recruitment Manager", industry: "Clean Technology" },
      { name: "Jennifer Lee", email: "jennifer.lee@agritech.com", company: "AgriTech", position: "HR Director", industry: "Agriculture" },
      { name: "Kevin Brown", email: "kevin.brown@musictech.com", company: "MusicTech", position: "Senior Recruiter", industry: "Music Technology" },
      { name: "Amanda Wilson", email: "amanda.wilson@edtech.com", company: "EdTech", position: "Talent Acquisition Lead", industry: "Educational Technology" },
      { name: "Christopher Davis", email: "christopher.davis@martech.com", company: "MarTech", position: "People & Culture", industry: "Marketing Technology" },
      { name: "Stephanie Martinez", email: "stephanie.martinez@hrtech.com", company: "HRTech", position: "HR Manager", industry: "Human Resources Technology" },
      { name: "Daniel Thompson", email: "daniel.thompson@salestech.com", company: "SalesTech", position: "Recruitment Specialist", industry: "Sales Technology" },
      { name: "Michelle Clark", email: "michelle.clark@devtools.com", company: "DevTools", position: "Talent Director", industry: "Developer Tools" },
      { name: "Brian Garcia", email: "brian.garcia@apitech.com", company: "APITech", position: "Senior HR Partner", industry: "API Technology" },
      { name: "Laura Kim", email: "laura.kim@platformtech.com", company: "PlatformTech", position: "Recruitment Lead", industry: "Platform Technology" },
      { name: "Andrew Anderson", email: "andrew.anderson@infratech.com", company: "InfraTech", position: "HR Coordinator", industry: "Infrastructure" },
      { name: "Rachel Brown", email: "rachel.brown@securitytech.com", company: "SecurityTech", position: "Talent Acquisition", industry: "Security Technology" },
      { name: "Marcus Wilson", email: "marcus.wilson@networktech.com", company: "NetworkTech", position: "Senior Recruiter", industry: "Networking" },
      { name: "Samantha Davis", email: "samantha.davis@cloudplatform.com", company: "CloudPlatform", position: "People Operations", industry: "Cloud Platforms" },
      { name: "Thomas Lee", email: "thomas.lee@devopstech.com", company: "DevOpsTech", position: "HR Business Partner", industry: "DevOps" },
      { name: "Nicole Martinez", email: "nicole.martinez@containertech.com", company: "ContainerTech", position: "Talent Manager", industry: "Container Technology" },
      { name: "Jason Thompson", email: "jason.thompson@microservices.com", company: "MicroServices", position: "Recruitment Manager", industry: "Microservices" },
      { name: "Ashley Clark", email: "ashley.clark@serverless.com", company: "Serverless", position: "HR Director", industry: "Serverless Technology" },
      { name: "Ryan Garcia", email: "ryan.garcia@jamstack.com", company: "JAMStack", position: "Senior Recruiter", industry: "JAMStack" },
      { name: "Kimberly Kim", email: "kimberly.kim@headless.com", company: "Headless", position: "Talent Acquisition Lead", industry: "Headless Technology" },
      { name: "Jonathan Anderson", email: "jonathan.anderson@nocode.com", company: "NoCode", position: "People & Culture", industry: "No-Code Platforms" },
      { name: "Melissa Brown", email: "melissa.brown@lowcode.com", company: "LowCode", position: "HR Manager", industry: "Low-Code Platforms" },
      { name: "Charles Wilson", email: "charles.wilson@automationtech.com", company: "AutomationTech", position: "Recruitment Specialist", industry: "Automation" },
      { name: "Elizabeth Davis", email: "elizabeth.davis@workflowtech.com", company: "WorkflowTech", position: "Talent Director", industry: "Workflow Technology" },
      { name: "Joseph Lee", email: "joseph.lee@integrationtech.com", company: "IntegrationTech", position: "Senior HR Partner", industry: "Integration Technology" },
      { name: "Jessica Martinez", email: "jessica.martinez@dataintegration.com", company: "DataIntegration", position: "Recruitment Lead", industry: "Data Integration" },
      { name: "Matthew Thompson", email: "matthew.thompson@etltech.com", company: "ETLTech", position: "HR Coordinator", industry: "ETL Technology" },
      { name: "Sarah Clark", email: "sarah.clark@analyticstech.com", company: "AnalyticsTech", position: "Talent Acquisition", industry: "Analytics" },
      { name: "Michael Garcia", email: "michael.garcia@bitech.com", company: "BITech", position: "Senior Recruiter", industry: "Business Intelligence" },
      { name: "Emily Kim", email: "emily.kim@dashboardtech.com", company: "DashboardTech", position: "People Operations", industry: "Dashboard Technology" },
      { name: "David Anderson", email: "david.anderson@visualizationtech.com", company: "VisualizationTech", position: "HR Business Partner", industry: "Data Visualization" },
      { name: "Lisa Brown", email: "lisa.brown@reportingtech.com", company: "ReportingTech", position: "Talent Manager", industry: "Reporting Technology" },
      { name: "James Wilson", email: "james.wilson@kpitech.com", company: "KPITech", position: "Recruitment Manager", industry: "KPI Technology" },
      { name: "Maria Davis", email: "maria.davis@metricstech.com", company: "MetricsTech", position: "HR Director", industry: "Metrics Technology" },
      { name: "Robert Lee", email: "robert.lee@observabilitytech.com", company: "ObservabilityTech", position: "Senior Recruiter", industry: "Observability" },
      { name: "Jennifer Martinez", email: "jennifer.martinez@monitoringtech.com", company: "MonitoringTech", position: "Talent Acquisition Lead", industry: "Monitoring Technology" },
      { name: "Kevin Thompson", email: "kevin.thompson@loggingtech.com", company: "LoggingTech", position: "People & Culture", industry: "Logging Technology" },
      { name: "Amanda Clark", email: "amanda.clark@tracingtech.com", company: "TracingTech", position: "HR Manager", industry: "Tracing Technology" },
      { name: "Christopher Garcia", email: "christopher.garcia@apmtech.com", company: "APMTech", position: "Recruitment Specialist", industry: "APM Technology" },
      { name: "Stephanie Kim", email: "stephanie.kim@perftech.com", company: "PerfTech", position: "Talent Director", industry: "Performance Technology" },
      { name: "Daniel Anderson", email: "daniel.anderson@loadtech.com", company: "LoadTech", position: "Senior HR Partner", industry: "Load Testing" },
      { name: "Michelle Brown", email: "michelle.brown@stresstech.com", company: "StressTech", position: "Recruitment Lead", industry: "Stress Testing" },
      { name: "Brian Wilson", email: "brian.wilson@testingtech.com", company: "TestingTech", position: "HR Coordinator", industry: "Testing Technology" },
      { name: "Laura Davis", email: "laura.davis@qatech.com", company: "QATech", position: "Talent Acquisition", industry: "Quality Assurance" },
      { name: "Andrew Lee", email: "andrew.lee@automatedtest.com", company: "AutomatedTest", position: "Senior Recruiter", industry: "Test Automation" },
      { name: "Rachel Martinez", email: "rachel.martinez@cicdtech.com", company: "CICDTech", position: "People Operations", industry: "CI/CD Technology" },
      { name: "Marcus Thompson", email: "marcus.thompson@deploytech.com", company: "DeployTech", position: "HR Business Partner", industry: "Deployment Technology" },
      { name: "Samantha Clark", email: "samantha.clark@releasetech.com", company: "ReleaseTech", position: "Talent Manager", industry: "Release Management" },
      { name: "Thomas Garcia", email: "thomas.garcia@versiontech.com", company: "VersionTech", position: "Recruitment Manager", industry: "Version Control" },
      { name: "Nicole Kim", email: "nicole.kim@gittech.com", company: "GitTech", position: "HR Director", industry: "Git Technology" },
      { name: "Jason Anderson", email: "jason.anderson@codetech.com", company: "CodeTech", position: "Senior Recruiter", industry: "Code Management" },
      { name: "Ashley Brown", email: "ashley.brown@reviewtech.com", company: "ReviewTech", position: "Talent Acquisition Lead", industry: "Code Review" },
      { name: "Ryan Wilson", email: "ryan.wilson@collaborationtech.com", company: "CollaborationTech", position: "People & Culture", industry: "Collaboration Technology" },
      { name: "Kimberly Davis", email: "kimberly.davis@teamtech.com", company: "TeamTech", position: "HR Manager", industry: "Team Technology" },
      { name: "Jonathan Lee", email: "jonathan.lee@projecttech.com", company: "ProjectTech", position: "Recruitment Specialist", industry: "Project Management" },
      { name: "Melissa Martinez", email: "melissa.martinez@tasktech.com", company: "TaskTech", position: "Talent Director", industry: "Task Management" },
      { name: "Charles Thompson", email: "charles.thompson@tickettech.com", company: "TicketTech", position: "Senior HR Partner", industry: "Ticketing Technology" },
      { name: "Elizabeth Clark", email: "elizabeth.clark@issuetech.com", company: "IssueTech", position: "Recruitment Lead", industry: "Issue Tracking" },
      { name: "Joseph Garcia", email: "joseph.garcia@bugtech.com", company: "BugTech", position: "HR Coordinator", industry: "Bug Tracking" },
      { name: "Jessica Kim", email: "jessica.kim@supporttech.com", company: "SupportTech", position: "Talent Acquisition", industry: "Support Technology" },
      { name: "Matthew Anderson", email: "matthew.anderson@helpdesk.com", company: "HelpDesk", position: "Senior Recruiter", industry: "Help Desk" },
      { name: "Sarah Brown", email: "sarah.brown@servicetech.com", company: "ServiceTech", position: "People Operations", industry: "Service Management" },
      { name: "Michael Wilson", email: "michael.wilson@incidenttech.com", company: "IncidentTech", position: "HR Business Partner", industry: "Incident Management" },
      { name: "Emily Davis", email: "emily.davis@alerttech.com", company: "AlertTech", position: "Talent Manager", industry: "Alert Technology" },
      { name: "David Lee", email: "david.lee@notificationtech.com", company: "NotificationTech", position: "Recruitment Manager", industry: "Notification Technology" }
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
