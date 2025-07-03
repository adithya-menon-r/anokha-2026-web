import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { AuthService } from "@/services/auth.service";
import { toast } from "react-hot-toast";


export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      setToken(data.token);
      toast.success("Login successful!");
    },
    onError: () => {
      toast.error("Invalid credentials. Please try again.");
    },
  });
}
