/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Home, Search, Map, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type User = {
  email_id: string;
  first_name: string;
  last_name: string;
  user_type: string;
};

const Navbar = () => {
  const isMobile = useIsMobile();
  const [user, setUser] = useState<User>({
    email_id: "",
    first_name: "",
    last_name: "",
    user_type: "",
  });

  const toggleLogout = () => {
    const redirectURL = "/app";
    const auth = (window as any).catalyst.auth;
    auth.signOut(redirectURL);
  };

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const userManagement = catalyst.userManagement;
    const currentUserPromise = userManagement.getCurrentProjectUser();
    currentUserPromise
      .then((response) => {
        setUser(response.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 blur-backdrop py-4 px-6 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 animate-fade-in">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
            <Home size={16} />
          </div>
          {!isMobile && (
            <span className="font-semibold text-xl tracking-tight">
              Estatify
            </span>
          )}
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/properties"
            className="transition-colors hover:text-primary animate-fade-in"
          >
            <span className={isMobile ? "sr-only" : "flex items-center gap-2"}>
              {!isMobile && "Listings"}
              {isMobile && <Search size={20} />}
            </span>
          </Link>

          <Link
            to="/schedules"
            className="transition-colors hover:text-primary animate-fade-in"
          >
            <span className={isMobile ? "sr-only" : "flex items-center gap-2"}>
              {!isMobile && "My Schedules"}
              {isMobile && <Map size={20} />}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 bg-muted"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[310px] rounded-xl bg-white text-center p-6 shadow-lg"
              >
                <DropdownMenuLabel className="text-xl font-semibold mb-2">
                  My Account
                </DropdownMenuLabel>
                <p className="text-sm text-gray-600 mb-2 w-full text-center">
                  {user.email_id}
                </p>

                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-xl flex items-center justify-center">
                  <User className="text-gray-500 w-8 h-8" />
                </div>

                <p className="mt-4 text-lg font-medium">
                  Hi, {user.first_name ? `${user.first_name} ` : ""}{" "}
                  {user.last_name ? `${user.last_name} ` : ""}
                </p>
                <button
                  onClick={toggleLogout}
                  className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
                >
                  Logout
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
