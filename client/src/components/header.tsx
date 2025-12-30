import { Link, useNavigate } from "@tanstack/react-router";
import { Route as SigninRoute } from "../routes/signin";
import { Route as SignupRoute } from "../routes/signup";
import { Route as PostsRoute } from "../routes/posts/index";
import { useAuth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await auth.logout();
    navigate({ to: PostsRoute.to });
  }

  return (
    <header className="flex justify-start items-center bg-primary text-primary-foreground px-6 py-3 sticky top-0 z-50 border-b border-border/40">
      <Link to={PostsRoute.to}>
        <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
          Posts
        </Button>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        {auth.isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                {auth.user?.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="p-2 bg-popover text-popover-foreground border border-border rounded-md shadow-md"
              align="end"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="h-px bg-border my-1" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground outline-none"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link to={SigninRoute.to}>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                Sign In
              </Button>
            </Link>
            <Link to={SignupRoute.to}>
              <Button variant="default" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
