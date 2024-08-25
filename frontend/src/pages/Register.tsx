import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { PiSpinnerBold } from "react-icons/pi";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useState } from "react";
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
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const togglePasswordVisibility = () => {
    if (watch("password").length === 0) return;
    setPasswordShown((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    if (watch("confirmPassword").length === 0) return;
    setConfirmPasswordShown((prev) => !prev);
  };

  const mutation = useMutation(apiClient.register, {
    onSuccess: async (data) => {
      // showToast({ message: data.message, type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      toast.success(data.message);
      navigate("/");
    },
    onError: (error: Error) => {
      // showToast({ message: error.message, type: "ERROR" });
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
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
            <span className="text-sm font-bold text-red-500">
              {errors.firstName.message}
            </span>
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
          <span className="text-sm font-bold text-red-500">
            {errors.email.message}
          </span>
        )}
      </label>

      <label className="labelStyle">
        <span className="inline-block pb-2"> Password</span>
        <div className="relative">
          <input
            type={passwordShown ? "text" : "password"}
            autoComplete="new-password"
            className={twMerge(
              InputStyles,
              errors.password && "border-red-300",
            )}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {passwordShown && watch("password").length !== 0 ? (
            <FaEye
              className="absolute right-4 top-3 size-6 cursor-pointer text-blue-800 max-sm:size-4"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-4 top-3 size-6 cursor-pointer text-blue-800 max-md:size-5"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-sm font-bold text-red-500">
            {errors.password.message}
          </span>
        )}
      </label>

      <label className="labelStyle">
        <span className="inline-block pb-2"> Confirm Password</span>
        <div className="relative">
          <input
            type={confirmPasswordShown ? "text" : "password"}
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
          {confirmPasswordShown && watch("confirmPassword").length !== 0 ? (
            <FaEye
              className="absolute right-4 top-3 size-6 cursor-pointer text-blue-800 max-sm:size-4"
              onClick={toggleConfirmPasswordVisibility}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-4 top-3 size-6 cursor-pointer text-blue-800 max-md:size-5"
              onClick={toggleConfirmPasswordVisibility}
            />
          )}
        </div>
        {errors.confirmPassword && (
          <span className="text-sm font-bold text-red-500">
            {errors.confirmPassword.message}
          </span>
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
          disabled={mutation.isLoading}
          className={`flex items-center gap-1 rounded border border-blue-800 bg-slate-50 px-3 py-2 text-sm duration-300 hover:bg-blue-800 hover:text-white md:text-base ${mutation.isLoading && "cursor-not-allowed"}`}
        >
          {mutation.isLoading && (
            <PiSpinnerBold className="size-6 animate-spin" />
          )}
          <p>Create Account</p>
        </button>
      </div>
    </form>
  );
};

export default Register;
