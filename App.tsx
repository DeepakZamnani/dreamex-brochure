import React, { useState } from 'react';
import { PropertyData, AppState, DesignConfig } from './types';
import InputFormNew from './components/InputFormNew';
import BrochurePreview from './components/BrochurePreview';
import DynamicBrochurePreview from './components/DynamicBrochurePreview';
import Header from './components/Header';
import FeaturesSection from './components/FeaturesSection';
// Corrected import name to match the export in services/geminiService.ts
import { generateBrochureArchitecturalDesign } from './services/geminiService';
import { generateDynamicBrochureLayout } from './services/geminiLayoutService';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentState, setCurrentState] = useState<AppState>(AppState.INPUT);
  const [data, setData] = useState<PropertyData>({
    price: '',
    title: '',
    location: '',
    propertyType: 'apartment',
    projectStatus: 'new_launch',
    configuration: [],
    areaDetails: {},
    priceDetails: { startingPrice: '', isAllInclusive: false },
    specs: { beds: '', baths: '', sqft: '', yearBuilt: '' },
    images: [],
    amenities: { projectAmenities: [], apartmentFeatures: [], securityFeatures: [], sustainability: [] },
    salesIntelligence: { 
      targetBuyer: [], 
      keySellingPoints: ['', '', ''], 
      locationAdvantages: { nearbyLandmarks: [] } 
    },
    branding: { developerName: '', siteAddress: '', includeDisclaimer: true },
    agent: { name: '', title: '', phone: '', email: '', photoUrl: '' },
    usageIntent: 'print',
    selectedTheme: 'Luxury',
    advancedOptions: {
      includeFloorPlan: true,
      includeAmenitiesPage: true,
      includeLocationMap: true,
      includePriceDisclaimer: true,
      includeQRCode: false,
      includePaymentPlan: false,
      includeSpecifications: true
    }
  });

  const loadDummyData = () => {
    setData({
      price: '12.5 Cr',
      title: 'The Azure Pavilion',
      location: 'Marine Drive, Mumbai',
      propertyType: 'apartment',
      projectStatus: 'ready_to_move',
      configuration: ['3BHK', '4BHK', 'Penthouse'],
      areaDetails: {
        carpetArea: '2400 Sq. Ft.',
        builtUpArea: '2800 Sq. Ft.',
        superBuiltUpArea: '3200 Sq. Ft.'
      },
      priceDetails: {
        startingPrice: '₹12.50 Cr*',
        pricePerSqft: '₹42,000',
        isAllInclusive: true,
        priceRange: { min: '₹12 Cr', max: '₹18 Cr' }
      },
      specs: { beds: '4', baths: '4', sqft: '2400', yearBuilt: '2024' },
      images: [], // Images are hard to dummy without external URLs, keeping empty for user upload
      amenities: {
        projectAmenities: ['Infinity Edge Pool', 'Sky Bar & Lounge', 'Private Cinema', 'Temperature Controlled Gym'],
        apartmentFeatures: ['Italian Marble Flooring', 'Smart Home Automation', 'Walk-in Wardrobes', 'Double Height Balcony'],
        securityFeatures: ['3-Tier Security', 'Biometric Access', 'Video Door Phone'],
        sustainability: ['Solar Water Heating', 'Rainwater Harvesting', 'EV Charging Stations']
      },
      salesIntelligence: {
        targetBuyer: ['luxury_buyers', 'nri_buyers'],
        keySellingPoints: [
          'Uninterrupted Panoramic Arabian Sea Views',
          'Private Elevator Access to Every Suite',
          'Platinum Rated Green Building Architecture'
        ],
        locationAdvantages: {
          nearbyLandmarks: ['Trident Hotel', 'Wankhede Stadium', 'CCI Club', 'Colaba Causeway'],
          metroDistance: '800m',
          connectivity: 'Close to Coastal Road'
        },
        uniqueFeatures: 'Exclusive beachfront property with private beach access and world-class amenities'
      },
      branding: {
        developerName: 'Everest Global Realty',
        siteAddress: 'Block 4, Marine Drive Promenade, South Mumbai - 400021',
        reraNumber: 'P51900088231',
        includeDisclaimer: true,
        websiteUrl: 'www.azurepavilion.com'
      },
      agent: {
        name: 'Siddharth Malhotra',
        title: 'Senior Portfolio Manager',
        phone: '+91 98765 43210',
        email: 'sales@everestglobal.com',
        photoUrl: ''
      },
      usageIntent: 'print',
      selectedTheme: 'Luxury',
      advancedOptions: {
        includeFloorPlan: true,
        includeAmenitiesPage: true,
        includeLocationMap: true,
        includePriceDisclaimer: true,
        includeQRCode: true,
        qrCodeUrl: 'https://virtualtour.azurepavilion.com',
        includePaymentPlan: false,
        includeSpecifications: true
      }
    });
  };

  const [isExporting, setIsExporting] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleGenerate = async () => {
    setCurrentState(AppState.GENERATING);
    try {
      // Generate dynamic layout with AI
      const layoutResult = await generateDynamicBrochureLayout(data);
      
      if (layoutResult) {
        setData(prev => ({ ...prev, dynamicLayout: layoutResult }));
        setCurrentState(AppState.PREVIEW);
      } else {
        throw new Error("Layout Generation Failed");
      }
    } catch (err) {
      alert("Generation failed. Please check console and try again.");
      setCurrentState(AppState.INPUT);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const layoutResult = await generateDynamicBrochureLayout(data);
      
      if (layoutResult) {
        setData(prev => ({ ...prev, dynamicLayout: layoutResult }));
      } else {
        throw new Error("Layout Generation Failed");
      }
    } catch (err) {
      alert("Regeneration failed. Please try again.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // Dynamically import html2pdf
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Create a container with only the brochure pages (exclude banners)
      const pages = document.querySelectorAll('.page');
      if (pages.length === 0) {
        throw new Error('No brochure pages found');
      }

      // Create a temporary container with just the pages
      const tempContainer = document.createElement('div');
      tempContainer.style.backgroundColor = '#e5e7eb';
      tempContainer.style.padding = '40px 0';
      
      pages.forEach(page => {
        const clone = page.cloneNode(true) as HTMLElement;
        tempContainer.appendChild(clone);
      });

      const opt = {
        margin: 0,
        filename: `${data.title.replace(/[^a-z0-9]/gi, '_')}_Brochure.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 794,
          windowHeight: 1123
        },
        jsPDF: { 
          unit: 'px' as const, 
          format: [794, 1123] as [number, number], 
          orientation: 'portrait' as const,
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'] as ('avoid-all' | 'css' | 'legacy')[],
          after: '.page'
        }
      };

      await html2pdf().set(opt).from(tempContainer).save();
      
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert('PDF export failed. Please try using Print > Save as PDF instead.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!showForm && currentState === AppState.INPUT && (
        <>
          <Header />
          <FeaturesSection onCreateClick={() => setShowForm(true)} />
        </>
      )}

      {showForm && currentState === AppState.INPUT && (
        <>
          <Header currentStep={1} totalSteps={5} />
          <InputFormNew 
            data={data} 
            onChange={setData} 
            onSubmit={handleGenerate} 
            onLoadDummy={loadDummyData} 
          />
        </>
      )}

      {currentState === AppState.GENERATING && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="relative mb-16">
            <div className="w-32 h-32 border border-emerald-200 rounded-full animate-ping absolute inset-0"></div>
            <div className="w-32 h-32 border-t-4 border-[#10B981] rounded-full animate-spin"></div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Creating Your Brochure</h3>
          <p className="text-gray-600 text-sm max-w-md text-center leading-relaxed">
            AI is designing a unique brochure for {data.title}. This will take just a moment...
          </p>
        </div>
      )}

      {currentState === AppState.PREVIEW && (
        <>
          <div className="no-print bg-white border-b sticky top-0 z-50 flex justify-between items-center px-12 py-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#10B981] text-white flex items-center justify-center font-bold text-2xl rounded-lg">D</div>
              <div>
                <h2 className="font-bold text-xl">DreamExProp</h2>
                <p className="text-xs text-gray-500">Property Brochure Generator</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => {
                  setShowForm(true);
                  setCurrentState(AppState.INPUT);
                }} 
                className="text-sm text-gray-600 hover:text-[#10B981] transition-all font-medium"
              >
                ← Back to Edit
              </button>
              <button 
                onClick={handleRegenerate}
                disabled={isRegenerating || isExporting}
                className="bg-gray-100 text-gray-700 px-6 py-3 text-sm font-semibold hover:bg-gray-200 transition-all rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRegenerating ? '🔄 Regenerating...' : '🔄 Regenerate Layout'}
              </button>
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? '📄 Exporting...' : '📥 Download PDF'}
              </button>
              <button 
                onClick={() => window.print()} 
                className="bg-[#10B981] text-white px-6 py-3 text-sm font-semibold hover:bg-[#059669] transition-all shadow-lg rounded-lg"
              >
                🖨️ Print
              </button>
            </div>
          </div>
          {data.dynamicLayout ? (
            <DynamicBrochurePreview data={data} layoutCode={data.dynamicLayout.code} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">No layout generated yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;