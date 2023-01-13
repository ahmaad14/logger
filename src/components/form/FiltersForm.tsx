import { useForm } from "react-hook-form";
import ILog from "../../types/ILog";
import { DateLogFilter, StringLogFilter } from "../../utils/filterLogs";
import actionTypes from "../constants/actionTypes";
import applicationTypes from "../constants/applicationTypes";
import SelectField from "./SelectField";
import TextField from "./TextField";

type Props = {
  onSubmit: (stringFilters: StringLogFilter[], dateFilter: DateLogFilter) => void;
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

    onSubmit(stringFilters, dateFilter);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="row align-items-end mb-5">
        <TextField label="Log ID" name="logId" register={register} />
        <SelectField
          name="applicationType"
          label="Application Type"
          options={applicationTypes.map((type) => ({
            label: type,
            value: type,
          }))}
          register={register}
        />
        <SelectField
          name="actionType"
          label="Action Type"
          options={actionTypes.map((type) => ({
            label: type,
            value: type,
          }))}
          register={register}
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
          <button type="submit" className="btn btn-primary">
            Search Logger
          </button>
        </div>
      </div>
    </form>
  );
};

export default FiltersForm;