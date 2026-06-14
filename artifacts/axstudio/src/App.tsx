import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import CastingPage from "@/pages/casting";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatusStrip } from "@/components/StatusStrip";
import { ProjectSection } from "@/components/ProjectSection";
import { GameSection } from "@/components/GameSection";
import { CompanySection } from "@/components/CompanySection";
import { SponsorshipSection } from "@/components/SponsorshipSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatusStrip />
        <NewsSection />
        <ProjectSection />
        <GameSection />
        <CompanySection />
        <SponsorshipSection />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/casting" component={CastingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
