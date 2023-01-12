import axios from "axios";
import ILog from "../types/ILog";

const setAdditionalKeys = (logs: ILog[]) => {
  logs.forEach((log) => (log.creationDate = new Date(log.creationTimestamp)));
};

const fetchLogs: () => Promise<ILog[]> = async () => {
  const res = await axios.get(
    "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
  );
  const logs: ILog[] = res.data.result.auditLog;
  setAdditionalKeys(logs);
  return logs;
};

export default fetchLogs;
