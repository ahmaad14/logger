import ILog from "../types/ILog";

const sortLogs = (logs: ILog[], sortyBy?: keyof ILog) => {
  if(!sortyBy) return logs;  
  const compareBasedOnType = (column1: any, column2: any) => {
    switch (typeof column1) {
      case "string":
        return column1?.localeCompare(column2);
      default:
        return column1 - column2;
    }
  };
  const sortedLogs = [...logs].sort((log1, log2) =>
    compareBasedOnType(log1[sortyBy], log2[sortyBy])
  );
  return sortedLogs;
};

export default sortLogs;
