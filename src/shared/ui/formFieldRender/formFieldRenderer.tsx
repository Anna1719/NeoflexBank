import { Select, Input } from "@/shared/ui/formFields";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FormField } from "@/utils/formUtils/formFieldTypes";

interface FormFieldRendererProps<T extends FieldValues> {
  field: FormField<T>;
  errors?: FieldErrors<T>;
  register: UseFormRegister<T>;
  isSubmitted: boolean;
}

export const FormFieldRenderer = <T extends FieldValues>({
  field,
  errors,
  register,
  isSubmitted,
}: FormFieldRendererProps<T>) => {
  const errorMessage = (errors?.[field.id]?.message as string | undefined);

  if (field.type === "select") {
    return (
      <Select
        req={field.req}
        id={String(field.id)}
        label={field.label}
        options={field.options}
        error={errorMessage}
        register={register(field.id as Path<T>, field.validation)}
      />
    );
  }

  return (
    <Input
      sub={isSubmitted}
      req={field.req}
      id={String(field.id)}
      label={field.label}
      type={field.type}
      placeholder={field.placeholder}
      error={errorMessage}
      register={register(field.id as Path<T>, field.validation)}
      formatter={field.formatter}
    />
  );
};
