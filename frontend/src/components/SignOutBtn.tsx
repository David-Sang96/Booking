import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

const SignOutBtn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.logOut, {
    onSuccess: async (data) => {
      // force validateToken function to run again
      await queryClient.invalidateQueries("validateToken");
      toast.success(data.message);
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="rounded bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
