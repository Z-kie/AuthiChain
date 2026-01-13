import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  PlusCircle, 
  LogOut, 
  Menu,
  X,
  Scan
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen bg-background text-foreground bg-gradient-mesh font-sans">
      <nav className="border-b border-border/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all" />
                <ShieldCheck className="h-8 w-8 text-primary relative z-10" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight">
                Authi<span className="text-primary">Chain</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant={isActive("/dashboard") ? "secondary" : "ghost"}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/products/new">
                    <Button variant={isActive("/products/new") ? "secondary" : "ghost"}>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </Link>
                  <div className="h-6 w-px bg-border/50" />
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground font-medium">
                      {user.username}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => logout()}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/verify">
                    <Button variant="ghost">
                      <Scan className="w-4 h-4 mr-2" />
                      Verify Product
                    </Button>
                  </Link>
                  <Button onClick={() => window.location.href = "/api/login"}>
                    Login
                  </Button>
                </>
              )}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/products/new" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => logout()}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout ({user.username})
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/verify" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Scan className="w-4 h-4 mr-2" />
                      Verify Product
                    </Button>
                  </Link>
                  <Button 
                    className="w-full" 
                    onClick={() => window.location.href = "/api/login"}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
