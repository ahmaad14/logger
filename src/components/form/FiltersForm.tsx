import { useForm } from "react-hook-form";
import ILog from "../../types/ILog";
import { DateLogFilter, StringLogFilter } from "../../utils/filterLogs";
import actionTypes from "../constants/actionTypes";
import applicationTypes from "../constants/applicationTypes";
import SelectField from "./SelectField";
import TextField from "./TextField";

type Props = {
  onSubmit: (
    stringFilters: StringLogFilter[],
    dateFilter: DateLogFilter
  ) => void;
};

type FormValues = {
  logId: string;
  applicationType: string;
  actionType: string;
  startDate: Date;
  endDate: Date;
};

type FormKey = keyof FormValues & keyof ILog;

const FiltersForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const setUrlSearchQuery = (
    stringFilters: StringLogFilter[],
    dateFilter: DateLogFilter
  ) => {
    const params: Record<string, string> = {};
    stringFilters.forEach(
      (filter) => (params[String(filter.key)] = filter.value)
    );
    if (dateFilter.start) params["startDate"] = dateFilter.start.toDateString();
    if (dateFilter.end) params["endDate"] = dateFilter.end.toDateString();
    window.history.replaceState(
      null,
      "",
      "?" + new URLSearchParams(params).toString()
    );
  };

  const onFormSubmit = (formData: FormValues) => {
    const filtersKeys = ["logId", "applicationType", "actionType"] as FormKey[];
    const stringFilters: StringLogFilter[] = filtersKeys
      .filter((key) => formData[key]) // To ignore empty filters
      .map((key) => ({
        key,
        value: formData[key],
      }));

    const dateFilter: DateLogFilter = {};
    if (formData.startDate) dateFilter.start = new Date(formData.startDate);
    if (formData.endDate) dateFilter.end = new Date(formData.endDate);

    setUrlSearchQuery(stringFilters, dateFilter);
    onSubmit(stringFilters, dateFilter);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="row align-items-end mb-5">
        <TextField
          label="Log ID"
          name="logId"
          register={register}
          data-testid={"form-logId"}
        />
        <SelectField
          name="applicationType"
          label="Application Type"
          options={applicationTypes.map((type) => ({
            label: type,
            value: type,
          }))}
          register={register}
          data-testid={"form-applicationType"}
        />
        <SelectField
          name="actionType"
          label="Action Type"
          options={actionTypes.map((type) => ({
            label: type,
            value: type,
          }))}
          register={register}
          data-testid={"form-actionType"}
        />

        <TextField
          name="startDate"
          label="From Date"
          type="date"
          register={register}
        />
        <TextField
          name="endDate"
          label="To Date"
          type="date"
          register={register}
        />
        <div className="col-md-2">
          <button
            data-testid="search-btn"
            type="submit"
            className="btn btn-primary"
          >
            Search Logger
          </button>
        </div>
      </div>
    </form>
  );
};

export default FiltersForm;
