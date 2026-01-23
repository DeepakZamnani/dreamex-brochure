
import React, { useState } from 'react';
import { PropertyData, ThemeType, PropertyType, ProjectStatus, Configuration, TargetBuyer, UsageIntent, ImageLabel } from '../types';

interface InputFormProps {
  data: PropertyData;
  onChange: (data: PropertyData) => void;
  onSubmit: () => void;
  onLoadDummy: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ data, onChange, onSubmit, onLoadDummy }) => {
  const [activeStep, setActiveStep] = useState(0);

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...data } as any;
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onChange(newData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, label: ImageLabel) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          url: reader.result as string,
          label,
          order: data.images.length,
          isCover: label === 'elevation',
          caption: ''
        };
        onChange({ ...data, images: [...data.images, newImage] });
      };
      reader.readAsDataURL(file);
    }
  };

  const steps = [
    { title: 'Concept & Branding', id: 'branding' },
    { title: 'Configurations', id: 'specs' },
    { title: 'Visual Assets', id: 'visuals' },
    { title: 'Amenities & Location', id: 'lifestyle' },
    { title: 'Agent & Legal', id: 'legal' }
  ];

  return (
    <div className="max-w-6xl mx-auto my-12 bg-white shadow-2xl overflow-hidden font-light border border-gray-100">
      {/* Sidebar Progress */}
      <div className="flex border-b justify-between items-center bg-gray-50">
        <div className="flex flex-1">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`flex-1 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all border-r last:border-r-0 ${
                activeStep === idx ? 'bg-black text-white border-black' : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              {idx + 1}. {step.title}
            </button>
          ))}
        </div>
        <button 
          onClick={onLoadDummy}
          className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#c5a059] hover:bg-black transition-all border-l"
        >
          Load Dummy Data
        </button>
      </div>

      <div className="p-12 min-h-[500px]">
        {/* STEP 1: BRANDING */}
        {activeStep === 0 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-3 gap-6 mb-12">
               {(['Luxury', 'Minimal', 'Editorial'] as ThemeType[]).map(t => (
                 <button 
                   key={t}
                   onClick={() => updateField('selectedTheme', t)}
                   className={`p-6 border text-center uppercase tracking-widest text-xs font-bold transition-all ${data.selectedTheme === t ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-400'}`}
                 >
                   {t} Theme
                 </button>
               ))}
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black text-gray-400">Project / Property Name</label>
                <input type="text" value={data.title} onChange={e => updateField('title', e.target.value)} className="w-full border-b py-2 text-2xl outline-none focus:border-black" placeholder="e.g. The Imperial Towers" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black text-gray-400">Developer Company</label>
                <input type="text" value={data.branding.developerName} onChange={e => updateField('branding.developerName', e.target.value)} className="w-full border-b py-2 text-2xl outline-none focus:border-black" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black text-gray-400">Property Type</label>
                <select value={data.propertyType} onChange={e => updateField('propertyType', e.target.value)} className="w-full border-b py-2 bg-white outline-none">
                   <option value="apartment">Apartment</option>
                   <option value="villa">Villa</option>
                   <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black text-gray-400">Project Status</label>
                <select value={data.projectStatus} onChange={e => updateField('projectStatus', e.target.value)} className="w-full border-b py-2 bg-white outline-none">
                   <option value="under_construction">Under Construction</option>
                   <option value="ready_to_move">Ready to Move</option>
                   <option value="new_launch">New Launch</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black text-gray-400">Usage Intent</label>
                <select value={data.usageIntent} onChange={e => updateField('usageIntent', e.target.value)} className="w-full border-b py-2 bg-white outline-none">
                   <option value="whatsapp">WhatsApp Sharing</option>
                   <option value="print">High-Quality Print</option>
                   <option value="presentation">Presentation</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CONFIGS & PRICE */}
        {activeStep === 1 && (
          <div className="space-y-12 animate-fadeIn">
             <div className="space-y-4">
                <label className="text-[10px] uppercase font-black text-gray-400 block mb-4">Configurations (Multi-select)</label>
                <div className="flex flex-wrap gap-4">
                   {(['1BHK', '2BHK', '3BHK', '4BHK', 'Penthouse'] as Configuration[]).map(c => (
                     <button 
                       key={c}
                       onClick={() => {
                         const current = data.configuration;
                         const updated = current.includes(c) ? current.filter(x => x !== c) : [...current, c];
                         updateField('configuration', updated);
                       }}
                       className={`px-6 py-2 border text-[10px] font-bold uppercase transition-all ${data.configuration.includes(c) ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-400'}`}
                     >
                       {c}
                     </button>
                   ))}
                </div>
             </div>
             <div className="grid grid-cols-2 gap-12">
               <div className="space-y-6">
                 <h4 className="text-xs font-bold border-l-4 border-black pl-3 mb-6">Price Details</h4>
                 <input type="text" placeholder="Starting Price (e.g. ₹2.5 Cr*)" value={data.priceDetails.startingPrice} onChange={e => updateField('priceDetails.startingPrice', e.target.value)} className="w-full border-b py-2 outline-none" />
                 <input type="text" placeholder="Price Per Sqft (Optional)" value={data.priceDetails.pricePerSqft} onChange={e => updateField('priceDetails.pricePerSqft', e.target.value)} className="w-full border-b py-2 outline-none" />
                 <label className="flex items-center gap-3 text-sm text-gray-500">
                    <input type="checkbox" checked={data.priceDetails.isAllInclusive} onChange={e => updateField('priceDetails.isAllInclusive', e.target.checked)} />
                    Prices are All-Inclusive
                 </label>
               </div>
               <div className="space-y-6">
                 <h4 className="text-xs font-bold border-l-4 border-black pl-3 mb-6">Area Dimensions</h4>
                 <input type="text" placeholder="Carpet Area (e.g. 1200 Sq. Ft.)" value={data.areaDetails.carpetArea} onChange={e => updateField('areaDetails.carpetArea', e.target.value)} className="w-full border-b py-2 outline-none" />
                 <input type="text" placeholder="Super Built-up Area" value={data.areaDetails.superBuiltUpArea} onChange={e => updateField('areaDetails.superBuiltUpArea', e.target.value)} className="w-full border-b py-2 outline-none" />
               </div>
             </div>
          </div>
        )}

        {/* STEP 3: VISUAL ASSETS */}
        {activeStep === 2 && (
          <div className="space-y-8 animate-fadeIn">
             <p className="text-xs text-gray-400 italic mb-8">Upload professional architectural renders. Cover image is mandatory for high-end results.</p>
             <div className="grid grid-cols-3 gap-6">
                {(['elevation', 'living_room', 'bedroom', 'amenities', 'floor_plan', 'location_map'] as ImageLabel[]).map(label => {
                  const img = data.images.find(i => i.label === label);
                  return (
                    <div key={label} className="relative group aspect-square border-2 border-dashed border-gray-100 flex flex-col items-center justify-center hover:border-black transition-all overflow-hidden">
                       {img ? (
                         <>
                           <img src={img.url} className="absolute inset-0 w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                              <button onClick={() => updateField('images', data.images.filter(i => i.label !== label))} className="text-white text-[10px] uppercase font-bold">Remove</button>
                           </div>
                         </>
                       ) : (
                         <>
                           <span className="text-[10px] uppercase font-bold text-gray-400">{label.replace('_', ' ')}</span>
                           <input type="file" onChange={e => handleImageUpload(e, label)} className="absolute inset-0 opacity-0 cursor-pointer" />
                         </>
                       )}
                    </div>
                  );
                })}
             </div>
          </div>
        )}

        {/* STEP 4: AMENITIES & LIFESTYLE */}
        {activeStep === 3 && (
          <div className="space-y-12 animate-fadeIn">
             <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xs font-bold border-l-4 border-black pl-3 mb-6 uppercase tracking-widest">Amenities & Features</h4>
                  <textarea placeholder="Project Amenities (Pool, Clubhouse, Gym...)" value={data.amenities.projectAmenities.join(', ')} onChange={e => updateField('amenities.projectAmenities', e.target.value.split(',').map(s => s.trim()))} className="w-full border p-4 text-sm h-32 focus:border-black outline-none" />
                  <textarea placeholder="Apartment Features (Modular Kitchen, Marble...)" value={data.amenities.apartmentFeatures.join(', ')} onChange={e => updateField('amenities.apartmentFeatures', e.target.value.split(',').map(s => s.trim()))} className="w-full border p-4 text-sm h-32 focus:border-black outline-none" />
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-bold border-l-4 border-black pl-3 mb-6 uppercase tracking-widest">The Pitch (USP)</h4>
                  <p className="text-[10px] text-gray-400 mb-4 uppercase">Give AI 3 main selling points</p>
                  <input type="text" placeholder="Point 1: e.g. Uninterrupted Ocean View" value={data.salesIntelligence.keySellingPoints[0]} onChange={e => {
                    const sp = [...data.salesIntelligence.keySellingPoints];
                    sp[0] = e.target.value;
                    updateField('salesIntelligence.keySellingPoints', sp);
                  }} className="w-full border-b py-2 outline-none" />
                  <input type="text" placeholder="Point 2: e.g. Smart Home Automation" value={data.salesIntelligence.keySellingPoints[1]} onChange={e => {
                    const sp = [...data.salesIntelligence.keySellingPoints];
                    sp[1] = e.target.value;
                    updateField('salesIntelligence.keySellingPoints', sp);
                  }} className="w-full border-b py-2 outline-none" />
                  <input type="text" placeholder="Point 3: e.g. Ultra-Private Elevators" value={data.salesIntelligence.keySellingPoints[2]} onChange={e => {
                    const sp = [...data.salesIntelligence.keySellingPoints];
                    sp[2] = e.target.value;
                    updateField('salesIntelligence.keySellingPoints', sp);
                  }} className="w-full border-b py-2 outline-none" />
                </div>
             </div>
          </div>
        )}

        {/* STEP 5: AGENT & LEGAL */}
        {activeStep === 4 && (
          <div className="space-y-12 animate-fadeIn">
            <div className="grid grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h4 className="text-xs font-bold border-l-4 border-black pl-3 mb-6 uppercase tracking-widest">Agent Details</h4>
                  <input type="text" placeholder="Agent Name" value={data.agent.name} onChange={e => updateField('agent.name', e.target.value)} className="w-full border-b py-2 outline-none" />
                  <input type="text" placeholder="Phone" value={data.agent.phone} onChange={e => updateField('agent.phone', e.target.value)} className="w-full border-b py-2 outline-none" />
                  <input type="text" placeholder="Email" value={data.agent.email} onChange={e => updateField('agent.email', e.target.value)} className="w-full border-b py-2 outline-none" />
               </div>
               <div className="space-y-6">
                  <h4 className="text-xs font-bold border-l-4 border-black pl-3 mb-6 uppercase tracking-widest">Compliance</h4>
                  <input type="text" placeholder="RERA Number" value={data.branding.reraNumber} onChange={e => updateField('branding.reraNumber', e.target.value)} className="w-full border-b py-2 outline-none" />
                  <textarea placeholder="Site Address" value={data.branding.siteAddress} onChange={e => updateField('branding.siteAddress', e.target.value)} className="w-full border-b py-2 outline-none h-20" />
                  <label className="flex items-center gap-3 text-sm text-gray-500">
                    <input type="checkbox" checked={data.branding.includeDisclaimer} onChange={e => updateField('branding.includeDisclaimer', e.target.checked)} />
                    Include Auto-Disclaimer
                  </label>
               </div>
            </div>
            
            <div className="mt-16 flex justify-center">
              <button 
                onClick={onSubmit}
                className="bg-black text-white px-20 py-6 text-xs font-black uppercase tracking-[0.6em] hover:bg-gold-700 transition-all shadow-2xl"
              >
                Launch AI Architect
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-6 flex justify-between border-t">
        <button 
          disabled={activeStep === 0}
          onClick={() => setActiveStep(prev => prev - 1)}
          className="text-[10px] font-bold uppercase tracking-widest text-gray-400 disabled:opacity-30"
        >
          Previous Step
        </button>
        <button 
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep(prev => prev + 1)}
          className="text-[10px] font-bold uppercase tracking-widest text-black"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default InputForm;
