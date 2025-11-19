import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "./ui/field";

const Email = ({ children }) => {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      {children}
    </Field>
  );
};

export default Email;
