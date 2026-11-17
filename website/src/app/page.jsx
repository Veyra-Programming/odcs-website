import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StarSovereignUI from '../components/StarSovereignUI';
import MilestoneOneCompleted from '../components/MilestoneOneCompleted';
import Real3DDiagramODCS from '../components/Real3DDiagramODCS';
import DocumentationCenter from '../components/DocumentationCenter';
import ArticlesReader from '../components/ArticlesReader';
import ModelSandbox from '../components/ModelSandbox';
import DualEngines from '../components/DualEngines';
import CRDTPlayground from '../components/CRDTPlayground';
import EnglishStudio from '../components/EnglishStudio';
import PerformanceBenchmarks from '../components/PerformanceBenchmarks';
import ArchitectureLayers from '../components/ArchitectureLayers';
import OfflinePillars from '../components/OfflinePillars';
import RFCViewer from '../components/RFCViewer';
import ConsoleHUD from '../components/ConsoleHUD';
import DownloadsVault from '../components/DownloadsVault';
import Footer from '../components/Footer';
import MobileBottomDock from '../components/MobileBottomDock';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="page-container">
        <Hero />
        <StarSovereignUI />
        <MilestoneOneCompleted />
        <Real3DDiagramODCS />
        <DocumentationCenter />
        <ArticlesReader />
        <ModelSandbox />
        <DualEngines />
        <CRDTPlayground />
        <EnglishStudio />
        <PerformanceBenchmarks />
        <ArchitectureLayers />
        <OfflinePillars />
        <RFCViewer />
        <ConsoleHUD />
        <DownloadsVault />
        <Footer />
      </main>
      <MobileBottomDock />
    </>
  );
}
