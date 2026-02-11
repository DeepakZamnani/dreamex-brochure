import React, { useState } from 'react';
import { PropertyData, AppState } from './types';
import InputFormNew from './components/InputFormNew';
import DynamicBrochurePreview from './components/DynamicBrochurePreview';
import Header from './components/Header';
import FeaturesSection from './components/FeaturesSection';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentState, setCurrentState] = useState<AppState>(AppState.INPUT);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern_luxury');
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
      images: [],
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

  const handleGenerate = async (template: string) => {
    console.log('📝 Form submitted with template:', template);
    setSelectedTemplate(template);
    setCurrentState(AppState.PREVIEW);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      const pages = document.querySelectorAll('.page');
      if (pages.length === 0) {
        throw new Error('No brochure pages found');
      }

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
                onClick={handleExportPDF}
                disabled={isExporting}
                className="bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? '🔄 Exporting...' : '📥 Download PDF'}
              </button>
              <button 
                onClick={() => window.print()} 
                className="bg-[#10B981] text-white px-6 py-3 text-sm font-semibold hover:bg-[#059669] transition-all shadow-lg rounded-lg"
              >
                🖨️ Print
              </button>
            </div>
          </div>
          <DynamicBrochurePreview 
            data={data} 
            selectedTemplate={selectedTemplate} 
          />
        </>
      )}
    </div>
  );
};

export default App;