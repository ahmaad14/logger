import ILog from "../types/ILog";

export type StringLogFilter = {
  key: keyof ILog;
  value: string;
};

export type DateLogFilter = {
  start?: Date;
  end?: Date;
};

const checkDateValidity = (log: ILog, dateFilter?: DateLogFilter) => {
  if (!dateFilter) return true;

  // get full end and start day
  if (dateFilter.start) dateFilter.start?.setUTCHours(0, 0, 0, 0);
  if (dateFilter.end) dateFilter.end?.setUTCHours(23, 59, 59, 999);

  if (dateFilter.start && log.creationDate < dateFilter.start) return false;
  if (dateFilter.end && log.creationDate > dateFilter.end) return false;

  return true;
};

const filterLogs = (
  logs: ILog[],
  stringfilters: StringLogFilter[] = [],
  dateFilter?: DateLogFilter
) => {
  const checkValidity = (log: ILog) => {
    let isValid = true;
    for (let filter of stringfilters) {
      isValid = String(log[filter.key]).trim() === filter.value.trim();
      if (!isValid) return false;
    }
    return checkDateValidity(log, dateFilter);
  };

  return logs.filter((log) => checkValidity(log));
};

export default filterLogs;
