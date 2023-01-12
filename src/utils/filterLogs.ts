import ILog from "../types/ILog";

export type LogFilter = {
  key: keyof ILog;
  value: any;
};

export type LogDateFilter = {
  start?: Date;
  end?: Date;
};

const filterLogs = (
  logs: ILog[],
  filters: LogFilter[] = [],
  dateFilter?: LogDateFilter
) => {
  const checkDataValidity = (log: ILog) => {
    if (!dateFilter) return true;
    const logDate = new Date(log.creationTimestamp.split(" ")[0]);
    if (dateFilter.start && logDate < dateFilter.start) return false;
    if (dateFilter.end && logDate > dateFilter.end) return false;
    return true;
  };
  const checkValidity = (log: ILog) => {
    let isValid = true;
    for (let filter of filters) {
      isValid = log[filter.key] === filter.value;
    }
    isValid = checkDataValidity(log);
    return isValid;
  };

  return logs.filter((log) => checkValidity(log));
};

export default filterLogs;
