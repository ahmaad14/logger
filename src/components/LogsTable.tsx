import ILog from "../types/ILog";
import logsTabelHeaders from "./constants/logsTabelHeaders";
import UpArrow from "./icons/UpArrow";

type Props = {
  logs: ILog[];
  handleSort: (sortBy: keyof ILog) => void;
};
const LogsTable = ({ logs, handleSort }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {logsTabelHeaders.map((header, index) => (
            <th key={index} scope="col">
              {header.label}
              <button
                className="btn py-0 align-baseline"
                onClick={() => handleSort(header.key as keyof ILog)}
                data-testid={`sort-${header.key}`}
              >
                <UpArrow />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {logs.map((row, index) => (
          <tr key={index} data-testid="log-row">
            <td data-testid={`logId${index}`}> {row.logId} </td>
            <td data-testid={`applicationType${index}`}>
              {row.applicationType}
            </td>
            <td data-testid={`applicationId${index}`}> {row.applicationId} </td>
            <td data-testid={`actionType${index}`}> {row.actionType} </td>
            <td> </td>
            <td data-testid={`creationTimestamp${index}`}>
              {" "}
              {row.creationTimestamp}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogsTable;
