import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Mock authentication hook since we don't have a real backend endpoint yet
export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      // Simulate network latency for realism
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate validation/error scenario
      if (data.email === "error@example.com") {
        throw new Error("Invalid credentials. Please try again.");
      }
      
      return {
        id: "1",
        email: data.email,
        name: "Demo Musician",
        token: "mock_jwt_token_12345",
      };
    },
  });
}
