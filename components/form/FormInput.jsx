import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function FormInput(props) {
  const { name, type, label, defaultVal, placeholder } = props;
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultVal}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default FormInput;
