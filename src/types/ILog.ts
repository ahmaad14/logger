
// single log entity interface

export default interface ILog {
  logId: number;
  applicationId: string;
  applicationType: string;
  companyId: string;
  actionType: string;
  ip: string;
  userAgent: string;
  userId: number;
  source: string;
  ownerId: string;
  logInfo: string;
  creationTimestamp: string;
  creationDate: Date;   
}
