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
          {logsTabelHeaders.map((header) => (
            <th scope="col">
              {header.label}
              <button
                className="btn py-0 align-baseline"
                onClick={() => handleSort(header.key as keyof ILog)}
              >
                <UpArrow />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {logs.map((row) => (
          <tr>
            <td> {row.logId} </td>
            <td> {row.applicationType} </td>
            <td> {row.applicationId} </td>
            <td> {row.actionType} </td>
            <td> </td>
            <td> {row.creationTimestamp} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogsTable;
