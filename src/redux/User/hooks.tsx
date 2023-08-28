import { useAsyncCallback } from "@react-hooks-library/core";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import webClient from "../../utils/webclient";
import { setUser } from "../Login/slice";
import { PATHS } from "../../routes";
import { ToastNotification } from "../../components";
import toast from "react-hot-toast";
import { OnboardingStatus } from "../../interface/user.interface";

export const useUpdateUser = () => {
  const dispatch = useDispatch();

  return useAsyncCallback(
    async (values: {
      stageName: string;
      firstName: string;
      lastName: string;
      publicPhone: string;
      publicEmail: string;
      category?: string;
      website?: string;
    }) => {
      try {
        const res = await webClient.put("user", values);
        dispatch(setUser(res.data));
        toast.custom(
          <ToastNotification
            status="success"
            titleId={`toast.success.update-user.title`}
            messageId={`toast.success.update-user.message`}
          />,
          {
            duration: 1500,
            position: "top-right",
          }
        );
      } catch (error: any) {
        const code = error.response.data.code
          ? error.response.data.code.toLowerCase()
          : "default";
        toast.custom(
          <ToastNotification
            status="danger"
            titleId={`toast.error.${code}.title`}
            messageId={`toast.error.${code}.message`}
          />,
          { duration: 1500, position: "top-right" }
        );
        console.error(error);
        return error.response;
      }
    }
  );
};

export const useUpdateOnboardingStatus = () => {
  return useAsyncCallback(async (status: OnboardingStatus) => {
    try {
      await webClient.put(`user/onboarding/${status}`);
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  });
};
