import React, { useState } from 'react';
import { PropertyData, BrochureStyle } from '../types';
import StepIndicator from './StepIndicator';
import PropertyStep from './PropertyStep';
import DescriptionStep from './DescriptionStep';
import FeaturesStep from './FeaturesStep';
import VisualsStep from './VisualsStep';
import ContactStep from './ContactStep';
import { Building2, FileText, Star, Image, Phone, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface InputFormProps {
  data: PropertyData;
  onChange: (data: PropertyData) => void;
  onSubmit: () => void;
  onLoadDummy: () => void;
}

const InputFormNew: React.FC<InputFormProps> = ({ data, onChange, onSubmit, onLoadDummy }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [style, setStyle] = useState<BrochureStyle>(BrochureStyle.LUXURY);

  const steps = [
    { id: 1, label: 'Property', icon: <Building2 className="w-6 h-6" /> },
    { id: 2, label: 'Description', icon: <FileText className="w-6 h-6" /> },
    { id: 3, label: 'Features', icon: <Star className="w-6 h-6" /> },
    { id: 4, label: 'Visuals', icon: <Image className="w-6 h-6" /> },
    { id: 5, label: 'Contact', icon: <Phone className="w-6 h-6" /> }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.title && data.location && data.priceDetails.startingPrice && 
               data.configuration.length > 0 && data.branding.developerName;
      case 2:
        return data.salesIntelligence.targetBuyer.length > 0 &&
               data.salesIntelligence.keySellingPoints.every(p => p.trim() !== '');
      case 3:
        return true; // Features are optional
      case 4:
        return data.images.length > 0; // At least one image required
      case 5:
        return data.agent.name && data.branding.siteAddress;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length && canProceed()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (canProceed()) {
      // Map BrochureStyle to ThemeType for backward compatibility
      const themeMap: Record<BrochureStyle, 'Luxury' | 'Minimal' | 'Editorial'> = {
        [BrochureStyle.LUXURY]: 'Luxury',
        [BrochureStyle.MINIMALIST]: 'Minimal',
        [BrochureStyle.ARCHITECTURAL]: 'Minimal',
        [BrochureStyle.EDITORIAL]: 'Editorial',
        [BrochureStyle.AVANT_GARDE]: 'Luxury'
      };
      
      onChange({ ...data, selectedTheme: themeMap[style] });
      onSubmit();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PropertyStep data={data} setData={onChange} />;
      case 2:
        return <DescriptionStep data={data} setData={onChange} style={style} setStyle={setStyle} />;
      case 3:
        return <FeaturesStep data={data} setData={onChange} />;
      case 4:
        return <VisualsStep data={data} setData={onChange} />;
      case 5:
        return <ContactStep data={data} setData={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8 md:p-12">
            {renderStep()}
          </div>

          {/* Navigation Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
              
              <button
                onClick={onLoadDummy}
                className="px-4 py-3 text-sm text-gray-500 hover:text-[#10B981] transition-all"
              >
                Load Dummy Data
              </button>
            </div>

            <div className="flex items-center gap-4">
              {!canProceed() && (
                <p className="text-sm text-red-600">
                  Please fill in all required fields
                </p>
              )}
              
              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-8 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-8 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Brochure
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputFormNew;
