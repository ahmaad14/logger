import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type InputOption = {
  label: string;
  value: string;
};
type Props = {
  name: string;
  label: string;
  options: InputOption[];
  register?: UseFormRegister<any>;
} & InputHTMLAttributes<HTMLSelectElement>;
const SelectField = ({ name, label, options, register, ...rest }: Props) => {
  const registerProps = register ? register(name) : {};

  return (
    <div className="form-group col-md-2">
      <label className="py-2 text-secondary" htmlFor={name}> {label} </label>
      <select className="form-control" name={name} {...rest} {...registerProps}>
        <option value=""> Any </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}> {option.label} </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
