import Navbar from "@/components/Navbar";
import HeightDashboard from "@/components/HeightDashboard";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-bg font-sans text-foreground selection:bg-accent/20 transition-colors duration-500 overflow-x-hidden">

      {/* Global Sticky Navbar */}
      <Navbar activePage="home" />

      {/* FIXED: Changed min-h to h- so the chart knows EXACTLY how tall it should be.
        Added shrink-0 so the HomeContent below doesn't compress this div.
      */}
      <div className="w-full h-[92dvh] shrink-0 relative flex flex-col">
        <HeightDashboard />
      </div>

      {/* SEO Content */}
      <HomeContent />

    </div>
  );
}