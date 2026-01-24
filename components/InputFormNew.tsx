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
        // Step 1: Property Details - only check fields on this step
        return data.title && data.location && data.priceDetails.startingPrice && 
               data.configuration.length > 0;
      case 2:
        // Step 2: Sales Intelligence
        return data.salesIntelligence.targetBuyer.length > 0 &&
               data.salesIntelligence.keySellingPoints.every(p => p.trim() !== '');
      case 3:
        // Step 3: Features are optional
        return true;
      case 4:
        // Step 4: At least one image required
        return data.images.length > 0;
      case 5:
        // Step 5: Contact & Branding - check developer name and agent
        return data.branding.developerName && data.agent.name && data.branding.siteAddress;
      default:
        return true;
    }
  };

  const getValidationMessage = () => {
    switch (currentStep) {
      case 1:
        if (!data.title) return "Property Name is required";
        if (!data.location) return "Location is required";
        if (!data.priceDetails.startingPrice) return "Starting Price is required";
        if (data.configuration.length === 0) return "Select at least one configuration";
        return "";
      case 2:
        if (data.salesIntelligence.targetBuyer.length === 0) return "Select at least one target buyer";
        if (!data.salesIntelligence.keySellingPoints.every(p => p.trim() !== '')) return "Fill in all 3 key selling points";
        return "";
      case 4:
        if (data.images.length === 0) return "Upload at least one image";
        return "";
      case 5:
        if (!data.branding.developerName) return "Developer Name is required";
        if (!data.agent.name) return "Agent Name is required";
        if (!data.branding.siteAddress) return "Site Address is required";
        return "";
      default:
        return "";
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
                  {getValidationMessage()}
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
