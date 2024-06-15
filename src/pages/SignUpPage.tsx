import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import {
  useAddUserMutation,
  useGetUserMutation,
} from "../redux/middleware/ProductApi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const registrationSchema = z.object({
  firstName: z
    .string()
    .min(5, { message: "First Name must contain at least 5 character" }),
  lastName: z
    .string()
    .min(5, { message: "Last Name must contain at least 5 character" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character" }),
});
export type RegFormField = z.infer<typeof registrationSchema>;
export type LoginFormField = z.infer<typeof loginSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegFormField>({ resolver: zodResolver(registrationSchema) });

  const {
    register: loginRegister,
    handleSubmit: loginSubmit,
    formState: { errors: loginError, isSubmitting: loginIsSubmitting },
  } = useForm<LoginFormField>({ resolver: zodResolver(loginSchema) });

  const [addUser, { isLoading }] = useAddUserMutation();
  const [getUser] = useGetUserMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onRegistration: SubmitHandler<RegFormField> = async (data) => {
    try {
      const jsonWebToken = await addUser(data).unwrap();

      console.log("===============result=====================");
      console.log(jsonWebToken);
      console.log("================result====================");
      setErrorMessage("");
      authService.setJsonWebToken(jsonWebToken);

      navigate("/");
      window.location.reload();
    } catch (error: any) {
      if (error.status > 200) {
        setErrorMessage(error.data);
        console.log("=================Sign Up error===================");
        console.log(error);
        console.log("==================Sign Up error==================");
      } else {
        setErrorMessage("");
      }
    }
  };

  const onLoginSubmit: SubmitHandler<LoginFormField> = async (data) => {
    try {
      const jsonWebToken = await getUser(data).unwrap();

      authService.setJsonWebToken(jsonWebToken);

      setErrorMessage("");

      console.log("=================redirect===================");
      console.log(location.state?.from?.pathname);
      console.log("====================================");

      navigate(from);
    } catch (error: any) {
      if (error.status > 200) {
        setErrorMessage(error.data);
      } else {
        setErrorMessage("");
      }
    }
  };

  return (
    <Tabs
      mx={"auto"}
      display={"flex"}
      flexDir={"column"}
      align="center"
      isFitted
      variant="enclosed"
    >
      <TabList
        mb={3}
        width={["100%", "40%", "50%", "50%", "40%", "30%"]}
        marginInline={"auto"}
      >
        <Tab>Login</Tab>
        <Tab>Registration</Tab>
      </TabList>

      <TabPanels
        maxWidth={["100%", "40%", "50%", "40%", "40%", "35%"]}
        mx={"auto"}
      >
        <TabPanel>
          <form onSubmit={loginSubmit(onLoginSubmit)}>
            <Flex flexDir={"column"} gap={5}>
              <FormControl isInvalid={!!loginError.email}>
                <FormLabel htmlFor={"email"}>Email</FormLabel>
                <Input placeholder={"Email"} {...loginRegister("email")} />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>
                  {loginError.email && loginError.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!loginError.password}>
                <FormLabel htmlFor={"password"}>Password</FormLabel>
                <Input
                  placeholder={"Password"}
                  {...loginRegister("password")}
                />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>
                  {loginError.password && loginError.password.message}
                </FormErrorMessage>
              </FormControl>

              {errorMessage !== "" && <Text color={"red"}>{errorMessage}</Text>}

              <Button
                width={"full"}
                type="submit"
                isLoading={loginIsSubmitting || isLoading}
                alignSelf={"start"}
                isDisabled={Object.keys(loginError).length !== 0}
              >
                Login
              </Button>
            </Flex>
          </form>
        </TabPanel>
        <TabPanel>
          <form onSubmit={handleSubmit(onRegistration)}>
            <Flex flexDir={"column"} gap={5}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor={"firstName"}>First Name</FormLabel>
                <Input placeholder={"First Name"} {...register("firstName")} />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>
                  {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor={"lastName"}>Last Name</FormLabel>
                <Input placeholder={"Last Name"} {...register("lastName")} />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>
                  {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor={"email"}>Email</FormLabel>
                <Input placeholder={"Email"} {...register("email")} />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor={"password"}>Password</FormLabel>
                <Input placeholder={"Password"} {...register("password")} />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              {errorMessage !== "" && <Text color={"red"}>{errorMessage}</Text>}

              <Button
                width={"sm"}
                type="submit"
                isLoading={isSubmitting || isLoading}
                alignSelf={"start"}
                isDisabled={Object.keys(errors).length !== 0}
              >
                Sign up
              </Button>
            </Flex>
          </form>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SignUpPage;
