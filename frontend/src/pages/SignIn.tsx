import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { PiSpinnerBold } from "react-icons/pi";
import * as apiClient from "../api-client";
import { SignInFormData } from "../types/authTypes";

const SignIn = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInFormData>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const togglePasswordVisibility = () => {
    if (watch("password").length === 0) return;
    setPasswordShown((prev) => !prev);
  };

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async (data) => {
      // force validateToken function to run again
      await queryClient.invalidateQueries("validateToken");
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate(location.state?.from?.pathname || "/", { replace: true });
    }
  }, [mutation.isSuccess, navigate, location.state?.from?.pathname]);

  const onSubmit = handleSubmit((data: SignInFormData) => {
    mutation.mutate(data);
  });

  const InputStyles =
    "w-full rounded border-2 px-2 py-2 font-normal focus:outline-none";

  return (
    <form
      className="flex flex-col gap-5 max-md:px-10 lg:px-20"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label>
        <span className="inline-block pb-2 font-medium">E-mail</span>
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

      <label>
        <span className="inline-block pb-2 font-medium">Password</span>
        <div className="relative">
          <input
            type={passwordShown ? "text" : "password"}
            autoComplete="current-password"
            className={twMerge(InputStyles, errors.email && "border-red-300")}
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

      <div className="flex items-center justify-between pt-5 max-sm:flex-col max-sm:items-end max-sm:gap-5">
        <div>
          Not Registered?{" "}
          <Link
            to={"/register"}
            className="underline decoration-black underline-offset-2 hover:text-blue-800"
          >
            Create an account here
          </Link>
        </div>
        <button
          disabled={mutation.isLoading}
          type="submit"
          className={`flex items-center gap-1 rounded border border-blue-800 bg-slate-50 px-3 py-2 text-sm duration-300 hover:bg-blue-800 hover:text-white md:text-base ${mutation.isLoading && "cursor-not-allowed"}`}
        >
          {mutation.isLoading && (
            <PiSpinnerBold className="size-6 animate-spin" />
          )}
          <p> Login</p>
        </button>
      </div>
    </form>
  );
};

export default SignIn;
