import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { AudioWaveform, ArrowRight, Github, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

import { useLogin, loginSchema, type LoginInput } from "@/hooks/use-auth";
import { AnimatedGlow } from "@/components/animated-glow";
import { SocialProof } from "@/components/social-proof";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const { mutate: login, isPending } = useLogin();
  const [authStatus, setAuthStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    setAuthStatus("idle");
    login(data, {
      onSuccess: () => {
        setAuthStatus("success");
        // In a real app, you would redirect here
      },
      onError: (error) => {
        setAuthStatus("error");
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      <AnimatedGlow />

      {/* Left Column - Visual/Hero (Hidden on smaller screens) */}
      <div className="hidden lg:flex relative w-1/2 flex-col justify-between p-12 lg:p-20 z-10 border-r border-white/5">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-audio.png`} 
            alt="Audio waves" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content over image */}
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <AudioWaveform className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display font-bold text-2xl tracking-wide text-white">
              Crescendo
            </span>
          </motion.div>
        </div>

        <div className="relative z-10 mt-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl xl:text-7xl font-display font-bold leading-[1.1] text-white"
          >
            Find your sound.<br />
            <span className="text-gradient">Connect your soul.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg text-white/70 max-w-md font-sans leading-relaxed"
          >
            The premier network for independent artists, producers, and audio engineers. Drop tracks, find bandmates, and book gigs.
          </motion.p>

          <SocialProof />
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Header (Only visible on small screens) */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <AudioWaveform className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white">
              Crescendo
            </span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">Welcome back</h2>
            <p className="mt-3 text-muted-foreground font-sans">
              Enter your credentials to access your studio.
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button variant="outline" className="glass-input h-12 bg-transparent hover:bg-white/5 no-default-hover-elevate">
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
            <Button variant="outline" className="glass-input h-12 bg-transparent hover:bg-white/5 no-default-hover-elevate">
              <Mail className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-medium tracking-wider">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80 font-medium ml-1">Email address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="artist@studio.com" 
                  className="h-14 glass-input rounded-xl px-4 text-base"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive ml-1 mt-1 font-medium flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-white/80 font-medium">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-foreground transition-colors font-medium">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="h-14 glass-input rounded-xl px-4 text-base tracking-widest placeholder:tracking-normal"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive ml-1 mt-1 font-medium flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {authStatus === "error" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive-foreground">{errorMessage}</p>
                </motion.div>
              )}
              
              {authStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-100">Login successful! Redirecting to your studio...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              type="submit" 
              disabled={isPending || authStatus === "success"}
              className="w-full h-14 rounded-xl font-display font-semibold text-lg tracking-wide shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_-15px_rgba(139,92,246,0.6)] transition-all duration-300 relative overflow-hidden group"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
              
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : authStatus === "success" ? (
                "Connected"
              ) : (
                <div className="flex items-center gap-2">
                  <span>Enter Studio</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <p className="mt-10 text-center text-muted-foreground font-sans text-sm">
            Don't have an account yet?{" "}
            <Link href="/register" className="text-primary hover:text-white transition-colors font-semibold ml-1">
              Sign up as an artist
            </Link>
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
