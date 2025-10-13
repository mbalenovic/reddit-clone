import { Link, useNavigate } from "@tanstack/react-router";
import { Route as SigninRoute } from "../routes/signin";
import { Route as SignupRoute } from "../routes/signup";
import { useAuth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await auth.logout();
    navigate({ to: "/" });
  }

  return (
    <div className="flex justify-end">
      {auth.isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-4">
            {auth.user?.username}
          </DropdownMenuTrigger>{" "}
          <DropdownMenuContent
            className="p-4 bg-popover text-popover-foreground border border-border rounded-md shadow-md"
            align="end"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link to={SigninRoute.to}>Sign In</Link>
          <Link to={SignupRoute.to} className="ml-4">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
