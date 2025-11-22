import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Home from "@/pages/Home";

export default function App() {
  const [showDemo, setShowDemo] = useState(false);
  const [initialFeedUrl, setInitialFeedUrl] = useState<string | undefined>(undefined);

  const handleTryDemo = (url?: string) => {
    setInitialFeedUrl(url);
    setShowDemo(true);
  };

  const handleBackToLanding = () => {
    setShowDemo(false);
    setInitialFeedUrl(undefined);
  };

  if (showDemo) {
    return <Home onBackToLanding={handleBackToLanding} initialFeedUrl={initialFeedUrl} />;
  }

  return <LandingPage onTryDemo={handleTryDemo} />;
}
