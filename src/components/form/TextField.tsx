import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  name : string, 
  label: string,
  register? : UseFormRegister<any>;
} & InputHTMLAttributes<HTMLInputElement>;
const TextField = ({name, label,register,...rest }: Props) => {
  const registerProps =  register? register(name) : {} 
  return (
    <div className="form-group col-md-2">
      <label className="py-2 text-secondary" htmlFor={name}> {label} </label>
      <input className="form-control" name={name} {...rest} {...registerProps} />
    </div>
  );
};

export default TextField;
