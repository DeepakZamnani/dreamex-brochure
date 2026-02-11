import React, { useState } from 'react';
import { PropertyData } from '../types';
import { TemplateType } from '../types/templateTypes';
import StepIndicator from './StepIndicator';
import PropertyStep from './PropertyStep';
import DescriptionStep from './DescriptionStep'; // Use the fixed version
import FeaturesStep from './FeaturesStep';
import VisualsStep from './VisualsStep';
import ContactStep from './ContactStep';
import {
  Building2,
  FileText,
  Star,
  Image,
  Phone,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface InputFormProps {
  data: PropertyData;
  onChange: (data: PropertyData) => void;
  onSubmit: (templateType: TemplateType) => void;
  onLoadDummy: () => void;
}

const InputFormNew: React.FC<InputFormProps> = ({
  data,
  onChange,
  onSubmit,
  onLoadDummy
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // FIX: Default to MODERN_LUXURY instead of AI_GENERATED
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(
    TemplateType.MODERN_LUXURY
  );

  // Debug logging
  console.log('🎯 Current template state:', selectedTemplate);

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
        // Step 1: Property Details
        return (
          data.title &&
          data.location &&
          data.priceDetails.startingPrice &&
          data.configuration.length > 0
        );
      case 2:
        // Step 2: Sales Intelligence + Template Selection
        return (
          data.salesIntelligence.targetBuyer.length > 0 &&
          data.salesIntelligence.keySellingPoints.every(p => p.trim() !== '') &&
          selectedTemplate !== null
        );
      case 3:
        // Step 3: Features are optional
        return true;
      case 4:
        // Step 4: At least one image required
        return data.images.length > 0;
      case 5:
        // Step 5: Contact & Branding
        return (
          data.branding.developerName &&
          data.agent.name &&
          data.branding.siteAddress
        );
      default:
        return true;
    }
  };

  const getValidationMessage = () => {
    switch (currentStep) {
      case 1:
        if (!data.title) return 'Property Name is required';
        if (!data.location) return 'Location is required';
        if (!data.priceDetails.startingPrice) return 'Starting Price is required';
        if (data.configuration.length === 0)
          return 'Select at least one configuration';
        return '';
      case 2:
        if (data.salesIntelligence.targetBuyer.length === 0)
          return 'Select at least one target buyer';
        if (
          !data.salesIntelligence.keySellingPoints.every(p => p.trim() !== '')
        )
          return 'Fill in all 3 key selling points';
        if (!selectedTemplate) return 'Select a template';
        return '';
      case 4:
        if (data.images.length === 0) return 'Upload at least one image';
        return '';
      case 5:
        if (!data.branding.developerName) return 'Developer Name is required';
        if (!data.agent.name) return 'Agent Name is required';
        if (!data.branding.siteAddress) return 'Site Address is required';
        return '';
      default:
        return '';
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length && canProceed()) {
      console.log('➡️ Moving to next step');
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      console.log('⬅️ Moving to previous step');
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (canProceed()) {
      console.log('🚀 Submitting with template:', selectedTemplate);
      // Pass the selected template to the parent
      onSubmit(selectedTemplate);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PropertyStep data={data} setData={onChange} />;
      case 2:
        return (
          <DescriptionStep
            data={data}
            setData={onChange}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        );
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
          <div className="p-8 md:p-12">{renderStep()}</div>

          {/* Navigation Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}

              <button
                type="button"
                onClick={onLoadDummy}
                className="px-4 py-3 text-sm text-gray-500 hover:text-[#10B981] transition-all"
              >
                Load Dummy Data
              </button>
            </div>

            <div className="flex items-center gap-4">
              {!canProceed() && (
                <p className="text-sm text-red-600">{getValidationMessage()}</p>
              )}

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-8 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
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

        {/* Template Preview (shown on step 2) */}
        {currentStep === 2 && selectedTemplate && (
          <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                {selectedTemplate === TemplateType.AI_GENERATED ? (
                  <Sparkles className="w-5 h-5 text-[#10B981]" />
                ) : (
                  <FileText className="w-5 h-5 text-[#10B981]" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Selected Template</p>
                <p className="font-bold text-gray-900">
                  {selectedTemplate === TemplateType.AI_GENERATED
                    ? 'AI-Generated Design'
                    : selectedTemplate
                        .split('_')
                        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {selectedTemplate === TemplateType.AI_GENERATED
                ? 'Your brochure will have a completely unique design created by AI'
                : 'Your brochure will use this professional template with your custom content'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFormNew;