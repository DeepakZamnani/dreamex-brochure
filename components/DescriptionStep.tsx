import React from 'react';
import { PropertyData, TargetBuyer, UsageIntent, BrochureStyle } from '../types';
import { FormInput, FormSection } from './FormComponents';
import { FileText, Target, Smartphone, MapPin, Plus, X, Sparkles, Palette, Check } from 'lucide-react';

interface DescriptionStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
  style: BrochureStyle;
  setStyle: React.Dispatch<React.SetStateAction<BrochureStyle>>;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  data,
  setData,
  style,
  setStyle,
  selectedTemplate,
  setSelectedTemplate
}) => {
  
  console.log('✅ DescriptionStep - Selected Template:', selectedTemplate);

  const targetBuyers: { value: TargetBuyer; label: string }[] = [
    { value: 'families', label: 'Families' },
    { value: 'investors', label: 'Investors' },
    { value: 'working_professionals', label: 'Working Professionals' },
    { value: 'luxury_buyers', label: 'Luxury Buyers' },
    { value: 'nri_buyers', label: 'NRI Buyers' },
    { value: 'senior_citizens', label: 'Senior Citizens' }
  ];

  const usageIntents: { value: UsageIntent; label: string; icon: any }[] = [
    { value: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
    { value: 'email', label: 'Email', icon: FileText },
    { value: 'print', label: 'Print', icon: FileText },
    { value: 'presentation', label: 'Presentation', icon: Target },
    { value: 'website', label: 'Website', icon: MapPin }
  ];

  // 6 TEMPLATES - SIMPLE AND CLEAR
  const templates = [
    { 
      id: 'modern_luxury', 
      name: 'Modern Luxury', 
      description: 'Bold typography, dramatic gradients, sophisticated black & gold design',
      bestFor: 'High-end properties, luxury buyers, NRI clients'
    },
    { 
      id: 'minimalist_clean', 
      name: 'Minimalist Clean', 
      description: 'WhatsApp-optimized, lots of white space, simple and fast to load',
      bestFor: 'WhatsApp sharing, quick viewing, working professionals'
    },
    { 
      id: 'bold_editorial', 
      name: 'Bold Editorial', 
      description: 'Magazine-style storytelling, asymmetric layouts, large typography',
      bestFor: 'Email campaigns, presentations, storytelling approach'
    },
    { 
      id: 'classic_elegant', 
      name: 'Classic Elegant', 
      description: 'Traditional serif fonts, centered layouts, timeless design',
      bestFor: 'Print brochures, families, senior citizens'
    },
    { 
      id: 'contemporary_chic', 
      name: 'Contemporary Chic', 
      description: 'Vibrant colors, geometric shapes, trendy modern patterns',
      bestFor: 'Urban properties, young buyers, apartments'
    },
    { 
      id: 'ai_generated', 
      name: 'Let AI Create Yours', 
      description: 'Completely unique AI-generated design tailored to your property',
      bestFor: 'Unique properties, custom branding, creative freedom'
    }
  ];

  const toggleTargetBuyer = (buyer: TargetBuyer) => {
    setData(prev => ({
      ...prev,
      salesIntelligence: {
        ...prev.salesIntelligence,
        targetBuyer: prev.salesIntelligence.targetBuyer.includes(buyer)
          ? prev.salesIntelligence.targetBuyer.filter(b => b !== buyer)
          : [...prev.salesIntelligence.targetBuyer, buyer]
      }
    }));
  };

  const updateKeySellingPoint = (index: number, value: string) => {
    const points = [...data.salesIntelligence.keySellingPoints];
    points[index] = value;
    setData(prev => ({
      ...prev,
      salesIntelligence: {
        ...prev.salesIntelligence,
        keySellingPoints: points as [string, string, string]
      }
    }));
  };

  const addLandmark = (landmark: string) => {
    if (landmark.trim()) {
      setData(prev => ({
        ...prev,
        salesIntelligence: {
          ...prev.salesIntelligence,
          locationAdvantages: {
            ...prev.salesIntelligence.locationAdvantages,
            nearbyLandmarks: [
              ...prev.salesIntelligence.locationAdvantages.nearbyLandmarks,
              landmark.trim()
            ]
          }
        }
      }));
    }
  };

  const removeLandmark = (index: number) => {
    setData(prev => ({
      ...prev,
      salesIntelligence: {
        ...prev.salesIntelligence,
        locationAdvantages: {
          ...prev.salesIntelligence.locationAdvantages,
          nearbyLandmarks: prev.salesIntelligence.locationAdvantages.nearbyLandmarks.filter(
            (_, i) => i !== index
          )
        }
      }
    }));
  };

  const handleTemplateClick = (templateId: string) => {
    console.log('🎯 Template clicked:', templateId);
    setSelectedTemplate(templateId);
    console.log('✅ Template updated');
  };

  return (
    <div className="space-y-8">
      {/* Sales Intelligence Section */}
      <FormSection
        title="Sales Intelligence"
        description="Define your target audience and key selling points"
      >
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Target className="w-4 h-4 text-[#10B981]" />
            Target Buyer(s)
            <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {targetBuyers.map(buyer => (
              <button
                key={buyer.value}
                type="button"
                onClick={() => toggleTargetBuyer(buyer.value)}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  data.salesIntelligence.targetBuyer.includes(buyer.value)
                    ? 'bg-[#10B981] border-[#10B981] text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-300'
                }`}
              >
                {buyer.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Palette className="w-4 h-4 text-[#10B981]" />
            3 Key Selling Points
            <span className="text-red-500">*</span>
          </label>
          {[0, 1, 2].map(index => (
            <FormInput
              key={index}
              label={`Reason ${index + 1}`}
              value={data.salesIntelligence.keySellingPoints[index]}
              onChange={v => updateKeySellingPoint(index, v)}
              placeholder={`e.g., ${
                index === 0
                  ? 'Prime location near IT parks'
                  : index === 1
                  ? 'Best-in-class amenities'
                  : 'Excellent connectivity'
              }`}
              required
            />
          ))}
        </div>
      </FormSection>

      {/* Location Advantages */}
      <FormSection
        title="Location Advantages"
        description="Highlight nearby landmarks and connectivity"
      >
        <LandmarkInput
          landmarks={data.salesIntelligence.locationAdvantages.nearbyLandmarks}
          onAdd={addLandmark}
          onRemove={removeLandmark}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Metro Distance (Optional)"
            value={data.salesIntelligence.locationAdvantages.metroDistance || ''}
            onChange={v =>
              setData(prev => ({
                ...prev,
                salesIntelligence: {
                  ...prev.salesIntelligence,
                  locationAdvantages: {
                    ...prev.salesIntelligence.locationAdvantages,
                    metroDistance: v
                  }
                }
              }))
            }
            placeholder="e.g., 500m from Metro"
            icon={MapPin}
          />

          <FormInput
            label="Connectivity (Optional)"
            value={data.salesIntelligence.locationAdvantages.connectivity || ''}
            onChange={v =>
              setData(prev => ({
                ...prev,
                salesIntelligence: {
                  ...prev.salesIntelligence,
                  locationAdvantages: {
                    ...prev.salesIntelligence.locationAdvantages,
                    connectivity: v
                  }
                }
              }))
            }
            placeholder="e.g., Close to Highway"
            icon={MapPin}
          />
        </div>

        <FormInput
          label="Unique Features (Optional)"
          value={data.salesIntelligence.uniqueFeatures || ''}
          onChange={v =>
            setData(prev => ({
              ...prev,
              salesIntelligence: {
                ...prev.salesIntelligence,
                uniqueFeatures: v
              }
            }))
          }
          placeholder="Any special aspects or unique selling propositions..."
          multiline
          rows={3}
        />
      </FormSection>

      {/* Usage Intent */}
      <FormSection title="Usage Intent" description="How will you use this brochure?">
        <div className="flex flex-wrap gap-3">
          {usageIntents.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setData(prev => ({ ...prev, usageIntent: value }))}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                data.usageIntent === value
                  ? 'bg-[#10B981] border-[#10B981] text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </FormSection>

      {/* ============================================ */}
      {/* TEMPLATE SELECTION - ONLY THIS, NO STYLES! */}
      {/* ============================================ */}
      <FormSection
        title="Choose Your Brochure Template"
        description="Select the design that best fits your property and target audience"
      >
        {/* Debug Panel */}
        <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
          <p className="text-sm text-blue-900 font-mono">
            <strong>Current Selection:</strong> {selectedTemplate}
          </p>
        </div>

        {/* Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map(template => {
            const isSelected = selectedTemplate === template.id;
            
            return (
              <div
                key={template.id}
                onClick={() => handleTemplateClick(template.id)}
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border-[#10B981] shadow-xl ring-4 ring-emerald-100'
                    : 'bg-white border-gray-300 hover:border-emerald-300 hover:shadow-lg'
                }`}
              >
                {/* Selected Badge */}
                {isSelected && (
                  <div className="flex items-center justify-end mb-3">
                    <div className="bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      SELECTED
                    </div>
                  </div>
                )}

                {/* Template Icon/Badge */}
                <div className="mb-4">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    template.id === 'ai_generated'
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                      : isSelected
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-gray-100 text-gray-700'
                  }`}>
                    {template.id === 'ai_generated' ? '🤖 AI POWERED' : '📄 TEMPLATE'}
                  </div>
                </div>

                {/* Template Name */}
                <h3 className={`text-xl font-bold mb-2 ${
                  isSelected ? 'text-[#10B981]' : 'text-gray-900'
                }`}>
                  {template.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {template.description}
                </p>

                {/* Best For */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">✓ Best for:</p>
                  <p className="text-xs font-medium text-gray-700">
                    {template.bestFor}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Template Confirmation */}
        {selectedTemplate && (
          <div className="mt-6 p-5 bg-emerald-50 border-2 border-emerald-200 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg mb-1">
                  {templates.find(t => t.id === selectedTemplate)?.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedTemplate === 'ai_generated'
                    ? '🎨 AI will create a completely unique design when you generate the brochure'
                    : '✓ This professional template will be customized with your property details'}
                </p>
              </div>
            </div>
          </div>
        )}
      </FormSection>
    </div>
  );
};

// Landmark Input Component
const LandmarkInput: React.FC<{
  landmarks: string[];
  onAdd: (landmark: string) => void;
  onRemove: (index: number) => void;
}> = ({ landmarks, onAdd, onRemove }) => {
  const [input, setInput] = React.useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <MapPin className="w-4 h-4 text-[#10B981]" />
        Nearby Landmarks
      </label>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder="Add landmark (e.g., Schools, Malls, etc.)"
          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100 transition-all"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/25"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {landmarks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {landmarks.map((landmark, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg group hover:border-emerald-300 transition-all"
            >
              <span className="text-sm text-gray-900">{landmark}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="p-0.5 hover:bg-red-100 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-500 hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DescriptionStep;