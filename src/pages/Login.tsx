
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Lock, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email) {
      setFormError("Email is required");
      return;
    }

    if (!password) {
      setFormError("Password is required");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-hiveprimary-700">
              Log in to SkillHive
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Connect with others and share skills
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {formError && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {formError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-hiveprimary-600 hover:bg-hiveprimary-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-hiveprimary-600 hover:text-hiveprimary-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
