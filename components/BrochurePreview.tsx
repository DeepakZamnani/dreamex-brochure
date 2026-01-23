
import React from 'react';
import { PropertyData, DesignConfig } from '../types';

interface BrochurePreviewProps {
  data: PropertyData;
}

const Page: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = "", style = {} }) => (
  <div className={`page ${className}`} style={style}>
    {children}
  </div>
);

const BrochurePreview: React.FC<BrochurePreviewProps> = ({ data }) => {
  const blueprint = data.design as DesignConfig;
  if (!blueprint) return null;

  // Log image usage for debugging
  React.useEffect(() => {
    console.log("📸 Images available for brochure:", data.images.length);
    if (data.images.length > 0) {
      console.log("✅ Using uploaded images:");
      data.images.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img.label}${img.isCover ? ' (COVER)' : ''}`);
      });
    } else {
      console.warn("⚠️ No images uploaded - using placeholders");
    }
  }, [data.images]);

  const layouts = blueprint.pageLayouts || {
    cover: 'classic-full',
    ethos: 'magazine-text',
    amenities: 'iconic-grid',
    location: 'map-focus',
    specs: 'tabular'
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: `${blueprint.headingFont}, serif`,
    color: blueprint.primaryColor,
    // Fix: selectedTheme is a property of 'data' (PropertyData), not 'blueprint' (DesignConfig)
    textTransform: data.selectedTheme === 'Minimal' ? 'uppercase' : 'none',
    // Fix: selectedTheme is a property of 'data' (PropertyData), not 'blueprint' (DesignConfig)
    letterSpacing: data.selectedTheme === 'Minimal' ? '0.3em' : 'normal'
  };

  const bodyStyle: React.CSSProperties = {
    fontFamily: `${blueprint.bodyFont}, sans-serif`,
    backgroundColor: blueprint.backgroundColor,
  };

  const getImg = (label: string) => {
    // First try to find exact label match
    const exactMatch = data.images.find(i => i.label === label);
    if (exactMatch) return exactMatch.url;
    
    // If no exact match, try to find cover image
    const coverImage = data.images.find(i => i.isCover);
    if (coverImage && ['elevation', 'exterior', 'living_room'].includes(label)) {
      return coverImage.url;
    }
    
    // Try to find any image from uploaded images
    if (data.images.length > 0) {
      // For specific labels, try to find related images
      if (label === 'elevation' || label === 'exterior') {
        const found = data.images.find(i => ['elevation', 'exterior', 'lobby'].includes(i.label));
        if (found) return found.url;
      }
      
      if (label === 'living_room') {
        const found = data.images.find(i => ['living_room', 'bedroom', 'balcony'].includes(i.label));
        if (found) return found.url;
      }
      
      if (label === 'bedroom') {
        const found = data.images.find(i => ['bedroom', 'living_room', 'bathroom'].includes(i.label));
        if (found) return found.url;
      }
      
      if (label === 'amenities') {
        const found = data.images.find(i => ['amenities', 'lobby', 'exterior'].includes(i.label));
        if (found) return found.url;
      }
      
      if (label === 'location_map') {
        const found = data.images.find(i => i.label === 'location_map');
        if (found) return found.url;
      }
      
      // Last resort: use first available image
      return data.images[0].url;
    }
    
    // Fallback to placeholder only if no images uploaded at all
    return `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1600&fit=crop&q=80`;
  };

  return (
    <div id="brochure-root" className="flex flex-col items-center bg-gray-300 py-10 no-scrollbar overflow-x-hidden" style={bodyStyle}>
      
      {/* Image Usage Info Banner (No Print) */}
      {data.images.length > 0 && (
        <div className="no-print w-full max-w-4xl mb-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xl">✓</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-emerald-900 text-sm">Using Your Uploaded Images</h4>
              <p className="text-emerald-700 text-xs">
                {data.images.length} image{data.images.length !== 1 ? 's' : ''} uploaded and integrated into the brochure
              </p>
            </div>
          </div>
        </div>
      )}
      
      {data.images.length === 0 && (
        <div className="no-print w-full max-w-4xl mb-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⚠</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-900 text-sm">No Images Uploaded</h4>
              <p className="text-yellow-700 text-xs">
                Using placeholder images. Go back to Step 4 to upload property images.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* PAGE 1: COVER VARIATIONS */}
      {layouts.cover === 'classic-full' && (
        <Page className="relative flex flex-col justify-end text-white overflow-hidden" style={{ backgroundColor: blueprint.primaryColor }}>
          <div className="absolute inset-0 grayscale-[20%]">
            <img src={getImg('elevation')} className="w-full h-full object-cover" alt="Cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10 p-20 pb-24 text-left">
            <div className="w-20 h-1 mb-8" style={{ backgroundColor: blueprint.accentColor }}></div>
            <h1 className="text-8xl font-light mb-8 leading-none" style={{ ...headingStyle, color: 'inherit' }}>{data.title}</h1>
            <p className="text-2xl italic font-serif opacity-90" style={{ color: blueprint.accentColor }}>{blueprint.copy.aiTagline}</p>
          </div>
        </Page>
      )}

      {layouts.cover === 'modern-split' && (
        <Page className="flex text-white" style={{ backgroundColor: blueprint.primaryColor }}>
          <div className="w-1/2 h-full grayscale-[10%]">
            <img src={getImg('elevation')} className="w-full h-full object-cover" alt="Cover" />
          </div>
          <div className="w-1/2 p-20 flex flex-col justify-center">
            <h1 className="text-7xl font-bold mb-10 leading-tight" style={{ ...headingStyle, color: 'inherit' }}>{data.title}</h1>
            <div className="w-12 h-12 border-2 rounded-full mb-10 flex items-center justify-center" style={{ borderColor: blueprint.accentColor }}>
               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: blueprint.accentColor }}></div>
            </div>
            <p className="text-3xl font-serif italic mb-10" style={{ color: blueprint.accentColor }}>{blueprint.copy.aiTagline}</p>
            <p className="text-xs uppercase tracking-[0.5em] opacity-50">{data.location}</p>
          </div>
        </Page>
      )}

      {layouts.cover === 'minimalist-center' && (
        <Page className="flex flex-col items-center justify-center p-20 text-center" style={{ backgroundColor: blueprint.backgroundColor }}>
          <p className="text-[10px] uppercase tracking-[1em] mb-12 opacity-40">Architectural Signature</p>
          <h1 className="text-7xl font-serif mb-12" style={headingStyle}>{data.title}</h1>
          <div className="w-full h-1/2 max-w-2xl overflow-hidden shadow-2xl mb-12">
             <img src={getImg('elevation')} className="w-full h-full object-cover" alt="Cover" />
          </div>
          <p className="text-xl italic font-light tracking-widest" style={{ color: blueprint.primaryColor }}>{blueprint.copy.aiTagline}</p>
        </Page>
      )}

      {/* PAGE 2: ETHOS / OVERVIEW VARIATIONS */}
      {layouts.ethos === 'magazine-text' && (
        <Page className="p-20 flex gap-16" style={{ backgroundColor: blueprint.secondaryColor }}>
          <div className="w-1/2 flex flex-col justify-center">
            <h2 className="text-6xl mb-10 leading-tight" style={headingStyle}>The Narrative</h2>
            <p className="text-lg font-serif italic leading-relaxed text-gray-500 mb-12">
               {blueprint.copy.aiNarrative}
            </p>
            <div className="grid grid-cols-2 gap-8">
               {data.configuration.map((c, i) => (
                 <div key={i} className="border-t pt-4" style={{ borderColor: blueprint.accentColor }}>
                    <p className="text-[9px] uppercase tracking-widest opacity-40 mb-1">Floorplan</p>
                    <p className="text-xl font-bold">{c}</p>
                 </div>
               ))}
            </div>
          </div>
          <div className="flex-1 relative">
             <img src={getImg('living_room')} className="w-full h-full object-cover rounded-sm shadow-xl" />
          </div>
        </Page>
      )}

      {layouts.ethos === 'visual-heavy' && (
        <Page className="relative overflow-hidden flex flex-col justify-end" style={{ backgroundColor: blueprint.backgroundColor }}>
          <img src={getImg('living_room')} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
          <div className="relative p-20 bg-white/90 m-10 shadow-2xl">
             <h2 className="text-5xl mb-8" style={headingStyle}>Curated Living</h2>
             <p className="text-sm leading-relaxed mb-8">{blueprint.copy.aiNarrative}</p>
             <div className="flex gap-12">
                <div className="border-l-2 pl-6" style={{ borderColor: blueprint.accentColor }}>
                   <p className="text-[8px] uppercase tracking-widest opacity-40">Status</p>
                   <p className="text-sm font-bold uppercase">{data.projectStatus.replace('_', ' ')}</p>
                </div>
                <div className="border-l-2 pl-6" style={{ borderColor: blueprint.accentColor }}>
                   <p className="text-[8px] uppercase tracking-widest opacity-40">Investment</p>
                   <p className="text-sm font-bold uppercase">{data.priceDetails.startingPrice}</p>
                </div>
             </div>
          </div>
        </Page>
      )}

      {/* PAGE 3: USP PERSPECTIVES (DYNAMIC) */}
      <Page className="grid grid-cols-3 gap-px bg-gray-200" style={{ backgroundColor: blueprint.primaryColor }}>
         <div className="col-span-1 p-16 flex flex-col justify-center text-white border-r border-white/5">
            <h2 className="text-4xl mb-12 leading-tight" style={{ ...headingStyle, color: 'inherit' }}>Core <br />Principals.</h2>
            <div className="space-y-12">
               {data.salesIntelligence.keySellingPoints.map((point, i) => (
                 <div key={i} className="space-y-2">
                    <span className="text-2xl font-serif opacity-30" style={{ color: blueprint.accentColor }}>0{i+1}</span>
                    <p className="text-xs font-light uppercase tracking-[0.2em]">{point}</p>
                 </div>
               ))}
            </div>
         </div>
         <div className="col-span-2 relative overflow-hidden">
            <img src={getImg('bedroom')} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10"></div>
         </div>
      </Page>

      {/* PAGE 4: AMENITIES VARIATIONS */}
      {layouts.amenities === 'iconic-grid' && (
        <Page className="p-20" style={{ backgroundColor: blueprint.secondaryColor }}>
           <h2 className="text-5xl mb-16 text-center" style={headingStyle}>The Infrastructure</h2>
           <div className="grid grid-cols-4 gap-4">
              {[...data.amenities.projectAmenities, ...data.amenities.apartmentFeatures].slice(0, 12).map((a, i) => (
                <div key={i} className="aspect-square border p-6 flex flex-col justify-between group hover:bg-black transition-all" style={{ borderColor: `${blueprint.primaryColor}10` }}>
                   <div className="w-4 h-px bg-black group-hover:bg-white transition-all"></div>
                   <p className="text-[10px] uppercase font-bold tracking-widest group-hover:text-white">{a}</p>
                </div>
              ))}
           </div>
        </Page>
      )}

      {layouts.amenities === 'dark-gallery' && (
        <Page className="p-0 flex flex-col bg-black text-white">
           <div className="h-1/2 flex">
              <div className="w-1/2 p-20 flex flex-col justify-center">
                 <h2 className="text-5xl mb-6" style={{ ...headingStyle, color: 'white' }}>Refined <br />Utility.</h2>
                 <p className="text-xs opacity-50 leading-relaxed max-w-xs">A sophisticated suite of features designed for the elite resident.</p>
              </div>
              <div className="w-1/2 grayscale">
                 <img src={getImg('amenities')} className="w-full h-full object-cover" />
              </div>
           </div>
           <div className="flex-1 grid grid-cols-2 gap-px bg-white/10 p-20">
              <div className="p-10">
                 <h4 className="text-[9px] uppercase tracking-widest mb-6 opacity-30">Amenities</h4>
                 <ul className="text-xs space-y-4">
                    {data.amenities.projectAmenities.slice(0, 4).map((a, i) => <li key={i} className="tracking-widest uppercase">{a}</li>)}
                 </ul>
              </div>
              <div className="p-10">
                 <h4 className="text-[9px] uppercase tracking-widest mb-6 opacity-30">Sustainability</h4>
                 <ul className="text-xs space-y-4">
                    {data.amenities.sustainability.slice(0, 4).map((a, i) => <li key={i} className="tracking-widest uppercase">{a}</li>)}
                 </ul>
              </div>
           </div>
        </Page>
      )}

      {/* PAGE 5: LOCATION VARIATIONS */}
      <Page className="flex flex-col" style={{ backgroundColor: blueprint.backgroundColor }}>
         <div className="flex-1 flex">
            <div className="w-1/2 p-20 flex flex-col justify-center border-r" style={{ borderColor: `${blueprint.primaryColor}10` }}>
               <h2 className="text-5xl mb-10" style={headingStyle}>Strategic <br />Convergence.</h2>
               <p className="text-sm italic leading-relaxed text-gray-400 mb-12">
                  {blueprint.copy.aiLocationHook}
               </p>
               <div className="space-y-4">
                  {data.salesIntelligence.locationAdvantages.nearbyLandmarks.slice(0, 4).map((l, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                       <span>{l}</span>
                       <span style={{ color: blueprint.accentColor }}>{2+(i*3)} MINS</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="w-1/2 relative bg-gray-100">
               <img src={getImg('location_map')} className="w-full h-full object-cover opacity-20" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center">
                     <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
                  </div>
               </div>
            </div>
         </div>
      </Page>

      {/* PAGE 6: FINAL PAGE (ALWAYS CLEAN) */}
      <Page className="p-24 flex flex-col items-center justify-center text-center" style={{ backgroundColor: blueprint.backgroundColor }}>
         <div className="mb-24">
            <h1 className="text-7xl font-serif mb-4" style={headingStyle}>{data.branding.developerName}</h1>
            <p className="text-[9px] uppercase tracking-[1em] opacity-40">The Legacy of Design</p>
         </div>

         <div className="w-full max-w-2xl grid grid-cols-2 gap-16 text-left border-y py-16" style={{ borderColor: `${blueprint.primaryColor}20` }}>
            <div>
               <p className="text-[9px] uppercase opacity-40 mb-2">Portfolio Manager</p>
               <p className="text-xl font-bold" style={{ color: blueprint.primaryColor }}>{data.agent.name}</p>
               <p className="text-xs mt-1 text-gray-500">{data.agent.phone}</p>
            </div>
            <div>
               <p className="text-[9px] uppercase opacity-40 mb-2">Digital Portal</p>
               <p className="text-lg font-medium underline underline-offset-8" style={{ color: blueprint.primaryColor }}>{data.branding.websiteUrl || 'luxestate.io'}</p>
            </div>
         </div>

         <div className="mt-24 max-w-3xl">
            <p className="text-[7px] text-gray-400 uppercase tracking-widest leading-loose">
               Unique Blueprint Generated for {data.title}. Configuration: {layouts.cover}-{layouts.ethos}-{layouts.amenities}. Generated by LuxeEstate AI Architect.
            </p>
         </div>
      </Page>
    </div>
  );
};

export default BrochurePreview;
