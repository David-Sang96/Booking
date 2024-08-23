import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import * as apiClient from "../api-client";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  // const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.register, {
    onSuccess: (data) => {
      // showToast({ message: data.message, type: "SUCCESS" });
      toast.success(data.message);
      navigate("/");
    },
    onError: (error: Error) => {
      // showToast({ message: error.message, type: "ERROR" });
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const InputStyles =
    "w-full rounded border-2 px-2 py-2 font-normal focus:outline-none";

  return (
    <form
      className="flex flex-col gap-5 max-md:px-10 lg:px-20"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col gap-5 md:flex-row">
        <label className="labelStyle">
          <span className="inline-block pb-2"> First Name</span>
          <input
            type="text"
            className={twMerge(
              InputStyles,
              errors.firstName && "border-red-300",
            )}
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="labelStyle">
          <span className="inline-block pb-2"> Last Name</span>
          <input
            type="text"
            className={twMerge(
              InputStyles,
              errors.lastName && "border-red-300",
            )}
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="labelStyle">
        <span className="inline-block pb-2"> E-mail</span>
        <input
          type="email"
          autoComplete="username"
          className={twMerge(InputStyles, errors.email && "border-red-300")}
          {...register("email", { required: "E-mail is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="labelStyle">
        <span className="inline-block pb-2"> Password</span>
        <input
          type="password"
          autoComplete="new-password"
          className={twMerge(InputStyles, errors.password && "border-red-300")}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="labelStyle">
        <span className="inline-block pb-2"> Confirm Password</span>
        <input
          type="password"
          autoComplete="new-password"
          className={twMerge(
            InputStyles,
            errors.confirmPassword && "border-red-300",
          )}
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "Confirm Password is required";
              } else if (watch("password") !== value) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <div className="flex items-center justify-between pt-5 max-sm:flex-col max-sm:items-end max-sm:gap-5">
        <div>
          Already registered?{" "}
          <Link
            to={"/sign-in"}
            className="underline decoration-black underline-offset-2 hover:text-blue-800"
          >
            Sign in here
          </Link>
        </div>
        <button
          type="submit"
          className="rounded border border-blue-800 bg-slate-50 px-3 py-2 text-sm duration-300 hover:bg-blue-800 hover:text-white md:text-base"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Register;
