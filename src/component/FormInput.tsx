import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { LoginFormField } from "../pages/SignUpPage";

interface Props {
  name: string;
  label: string;
  errorMessage?: string;
  helperMessage?: string;
  hasError?: boolean;
  register: UseFormRegister<LoginFormField>;
}
const FormInput = ({
  name,
  label,
  errorMessage,
  helperMessage,
  hasError,
  register,
}: Props) => {
  return (
    <FormControl isInvalid={hasError}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input placeholder={label} {...register(name as keyof LoginFormField)} />
      <FormHelperText>{helperMessage}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
