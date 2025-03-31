
import { Code, Github } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex gap-2 items-center font-semibold text-xl mr-4">
          <Code className="h-6 w-6 text-codecracker-indigo" />
          <Link to="/" className="flex items-center">
            <span className="text-codecracker-indigo">Code</span>
            <span>Cracker</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            asChild
          >
            <a 
              href="https://github.com/your-github/codecracker" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
