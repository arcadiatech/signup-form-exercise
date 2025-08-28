import { useMutation } from "../../hooks/useMutation.hook";

interface SignUpFormData {
  username: string;
  password: string;
}

export const useSignUpFormMutation = () =>
  useMutation<{ success: boolean }, SignUpFormData>({
    fetchFn: async (data) => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (data?.username === "admin") {
            reject(new Error("Admin is not a valid username"));
          } else {
            resolve({ success: true });
          }
          clearTimeout(timeout);
        }, 2000);
      });
    },
  });
