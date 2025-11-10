import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Navbar = () => {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: "Login functionality coming soon!" });
    setIsLoginOpen(false);
    setEmail("");
    setPassword("");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">CollegePredictor</div>
          </Link>
          
          <div className="flex items-center space-x-6 md:space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}>
              Home
            </Link>
            <Link to="/predictor" className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/predictor" ? "text-primary" : "text-muted-foreground"
            }`}>
              Predictor
            </Link>
            {/* smooth-scrolling anchors that work from any route */}
            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("features");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("faq");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex hover:bg-primary/10 transition-colors">
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Welcome Back</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Sign In
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Link to="/predictor">
              <Button size="sm" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg">
                Try Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;