import {
  useForm,
  type FieldValues,
  type Path,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import Button from "./Button";
import type { ZodType } from "zod";

type Field<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: string;
};

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T, any, any>; 
  fields: Field<T>[];
  onSubmit: SubmitHandler<T>;
}

export function AuthForm<T extends FieldValues>({
  schema,
  fields,
  onSubmit,
}: AuthFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema) as any, 
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-80 p-6 border rounded mt-6"
    >
      {fields.map((f) => (
        <Input
          key={f.name}
          label={f.label}
          type={f.type || "text"}
          {...register(f.name)}
          error={(errors[f.name]?.message as string) || ""}
        />
      ))}
      <Button type="submit">Надіслати</Button>
    </form>
  );
}
