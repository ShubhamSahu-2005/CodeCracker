
import { Navbar } from "@/components/navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">About CodeCracker</h1>
            <p className="text-lg text-muted-foreground">
              Your personal competitive programming stats tracker
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">What is CodeCracker?</h2>
            <p>
              CodeCracker is a simple tool designed to help competitive programmers track their progress across multiple platforms.
              By providing a unified dashboard for Codeforces, LeetCode, and CodeChef statistics, CodeCracker makes it easy to
              monitor your growth and identify areas for improvement.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Track stats from Codeforces, LeetCode, and CodeChef in one place</li>
              <li>Visualize your problem-solving distribution across platforms</li>
              <li>Monitor your rating progress over time</li>
              <li>Compare performance metrics between different coding platforms</li>
              <li>Simple, clean interface designed for quick insights</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">How It Works</h2>
            <p>
              Simply enter your handles for the platforms you use, and CodeCracker will fetch and display your stats.
              Your data is cached for performance but refreshed regularly to ensure you always have up-to-date information.
            </p>
            <p>
              We use the public APIs provided by competitive programming platforms where available, and efficient
              web scraping techniques where APIs are not available or limited.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Privacy</h2>
            <p>
              CodeCracker only accesses publicly available information associated with the handles you provide.
              We do not store your personal information or share your data with third parties.
            </p>
          </div>

          <div className="mt-12 p-6 bg-codecracker-indigo/5 rounded-lg border border-codecracker-indigo/10">
            <h3 className="text-xl font-medium mb-4">Get in Touch</h3>
            <p>
              Have suggestions or found a bug? We'd love to hear from you! Please open an issue on our GitHub repository
              or contact us directly.
            </p>
            <div className="mt-4">
              <a 
                href="https://github.com/your-github/codecracker" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-codecracker-indigo hover:underline"
              >
                View the project on GitHub →
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            Built with 💙 for competitive programmers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
