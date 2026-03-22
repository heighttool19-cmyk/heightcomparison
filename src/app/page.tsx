import Navbar from "@/components/Navbar";
import HeightDashboard from "@/components/HeightDashboard";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg">

      {/* 1. Global Sticky Navbar */}
      <Navbar activePage="home" />

      {/* 2. Interactive Dashboard (Calculates remaining screen height minus the 70px navbar) */}
      <div className="w-full h-[calc(100vh-70px)] relative">
        <HeightDashboard />
      </div>

      {/* 3. SEO Content (Users can just naturally scroll down to this) */}
      <HomeContent />

    </div>
  );
}