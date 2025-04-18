
import { useState } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { Stars } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthSubmit = async (values: { email: string; password: string }) => {
    const { error, data } = isLogin 
      ? await supabase.auth.signInWithPassword(values)
      : await supabase.auth.signUp(values);

    if (error) {
      throw error;
    }

    if (!isLogin && data?.user) {
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Stars background animation */}
      <div className="fixed inset-0 z-0 bg-cosmic-purple">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-3">
            <Stars className="h-16 w-16 text-cosmic-gold" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Astro Love Nexus
          </h1>
          <p className="text-cosmic-lavender">
            Discover your cosmic destiny and connections
          </p>
        </div>
        
        <AuthForm
          onSubmit={handleAuthSubmit}
          isLogin={isLogin}
          switchMode={() => setIsLogin(!isLogin)}
        />
      </div>
      
      {/* Animation styles added to global style sheet instead */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
