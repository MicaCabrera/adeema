import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

const InstitutionalSection = lazy(() => import('./components/InstitutionalSection'));
const AcademySection = lazy(() => import('./components/AcademySection'));
const MediaSection = lazy(() => import('./components/MediaSection'));
const FanSection = lazy(() => import('./components/FanSection'));
const SponsorsSection = lazy(() => import('./components/SponsorsSection'));
const NewsSection = lazy(() => import('./components/NewsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

function SectionsFallback() {
  return (
    <div className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 rounded-full bg-white/5 mb-6 animate-pulse" />
        <div className="h-14 max-w-2xl rounded-2xl bg-white/5 mb-4 animate-pulse" />
        <div className="h-24 rounded-3xl bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionsFallback />}>
          <InstitutionalSection />
          <AcademySection />
          <MediaSection />
          <FanSection />
          <SponsorsSection />
          <NewsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
