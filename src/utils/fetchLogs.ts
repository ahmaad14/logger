// import axios from "axios";
import ILog from "../types/ILog";

const prepareData = (logs: ILog[]) => {
  logs.forEach((log) => {
    handleNulls(log);
    log.creationDate = new Date(log.creationTimestamp);
  });
};

type LogKey = keyof ILog;

const handleNulls = (log: ILog) => {
  const keys: LogKey[] = Object.keys(log) as LogKey[];
  log.actionType = log.actionType || ""
  log.applicationType = log.applicationType || ""
  log.applicationId = log.applicationId || ""

};

const fetchLogs: () => Promise<ILog[]> = async () => {
  const res = await fetch(
    "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
  );
  const data = await res.json();
  const logs: ILog[] = data.result.auditLog;
  prepareData(logs);
  return logs;
};

export default fetchLogs;
