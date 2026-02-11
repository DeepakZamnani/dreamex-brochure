// // import React from 'react';
// // import { PropertyData } from '../types';

// // interface DynamicBrochurePreviewProps {
// //   data: PropertyData;
// //   selectedTemplate: string;
// // }

// // const Page: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = '#ffffff' }) => (
// //   <div className="page mx-auto my-8 shadow-2xl" style={{ width: '794px', height: '1123px', backgroundColor: bg }}>
// //     {children}
// //   </div>
// // );

// // const DynamicBrochurePreview: React.FC<DynamicBrochurePreviewProps> = ({ data, selectedTemplate }) => {
// //   const getImg = (label: string) => {
// //     const img = data.images.find(i => i.label === label || i.isCover);
// //     return img?.url || data.images[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200';
// //   };

// //   return (
// //     <div className="bg-gray-200 py-12">
// //       {/* Page 1: Cover */}
// //       <Page>
// //         <div className="relative w-full h-full">
// //           <img src={getImg('cover')} alt="Cover" className="w-full h-full object-cover" />
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
// //           <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
// //             <h1 className="text-6xl font-bold mb-4">{data.title}</h1>
// //             <p className="text-2xl mb-2">{data.location}</p>
// //             <p className="text-3xl font-bold text-emerald-400">{data.priceDetails.startingPrice}</p>
// //           </div>
// //         </div>
// //       </Page>

// //       {/* Page 2: Overview */}
// //       <Page>
// //         <div className="p-16">
// //           <h2 className="text-4xl font-bold mb-8 text-gray-900">Property Overview</h2>
          
// //           <div className="grid grid-cols-2 gap-8 mb-12">
// //             <div>
// //               <p className="text-sm text-gray-500 mb-1">Configuration</p>
// //               <p className="text-xl font-bold">{data.configuration.join(', ')}</p>
// //             </div>
// //             <div>
// //               <p className="text-sm text-gray-500 mb-1">Property Type</p>
// //               <p className="text-xl font-bold capitalize">{data.propertyType}</p>
// //             </div>
// //             <div>
// //               <p className="text-sm text-gray-500 mb-1">Status</p>
// //               <p className="text-xl font-bold capitalize">{data.projectStatus.replace('_', ' ')}</p>
// //             </div>
// //             <div>
// //               <p className="text-sm text-gray-500 mb-1">Starting Price</p>
// //               <p className="text-xl font-bold text-emerald-600">{data.priceDetails.startingPrice}</p>
// //             </div>
// //           </div>

// //           <div className="mb-12">
// //             <h3 className="text-2xl font-bold mb-4">Why Choose This Property</h3>
// //             {data.salesIntelligence.keySellingPoints.map((point, i) => (
// //               <div key={i} className="flex items-start gap-3 mb-3">
// //                 <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
// //                   {i + 1}
// //                 </div>
// //                 <p className="text-lg text-gray-700">{point}</p>
// //               </div>
// //             ))}
// //           </div>

// //           {data.salesIntelligence.uniqueFeatures && (
// //             <div className="bg-emerald-50 p-6 rounded-lg">
// //               <p className="text-gray-800 leading-relaxed">{data.salesIntelligence.uniqueFeatures}</p>
// //             </div>
// //           )}
// //         </div>
// //       </Page>

// //       {/* Page 3: Amenities */}
// //       <Page>
// //         <div className="p-16">
// //           <h2 className="text-4xl font-bold mb-8 text-gray-900">World-Class Amenities</h2>
          
// //           {data.amenities.projectAmenities.length > 0 && (
// //             <div className="mb-8">
// //               <h3 className="text-xl font-bold mb-4 text-emerald-600">Project Amenities</h3>
// //               <div className="grid grid-cols-2 gap-3">
// //                 {data.amenities.projectAmenities.map((amenity, i) => (
// //                   <div key={i} className="flex items-center gap-2">
// //                     <div className="w-2 h-2 bg-emerald-500 rounded-full" />
// //                     <p className="text-gray-700">{amenity}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {data.amenities.apartmentFeatures.length > 0 && (
// //             <div className="mb-8">
// //               <h3 className="text-xl font-bold mb-4 text-emerald-600">Apartment Features</h3>
// //               <div className="grid grid-cols-2 gap-3">
// //                 {data.amenities.apartmentFeatures.map((feature, i) => (
// //                   <div key={i} className="flex items-center gap-2">
// //                     <div className="w-2 h-2 bg-emerald-500 rounded-full" />
// //                     <p className="text-gray-700">{feature}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {data.amenities.securityFeatures.length > 0 && (
// //             <div className="mb-8">
// //               <h3 className="text-xl font-bold mb-4 text-emerald-600">Security</h3>
// //               <div className="grid grid-cols-2 gap-3">
// //                 {data.amenities.securityFeatures.map((feature, i) => (
// //                   <div key={i} className="flex items-center gap-2">
// //                     <div className="w-2 h-2 bg-emerald-500 rounded-full" />
// //                     <p className="text-gray-700">{feature}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {data.amenities.sustainability.length > 0 && (
// //             <div>
// //               <h3 className="text-xl font-bold mb-4 text-emerald-600">Sustainability</h3>
// //               <div className="grid grid-cols-2 gap-3">
// //                 {data.amenities.sustainability.map((feature, i) => (
// //                   <div key={i} className="flex items-center gap-2">
// //                     <div className="w-2 h-2 bg-emerald-500 rounded-full" />
// //                     <p className="text-gray-700">{feature}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </Page>

// //       {/* Page 4: Location */}
// //       <Page>
// //         <div className="p-16">
// //           <h2 className="text-4xl font-bold mb-8 text-gray-900">Prime Location</h2>
          
// //           <div className="mb-8">
// //             <p className="text-2xl text-gray-700 mb-6">{data.location}</p>
            
// //             {data.salesIntelligence.locationAdvantages.nearbyLandmarks.length > 0 && (
// //               <div className="mb-6">
// //                 <h3 className="text-xl font-bold mb-4 text-emerald-600">Nearby Landmarks</h3>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   {data.salesIntelligence.locationAdvantages.nearbyLandmarks.map((landmark, i) => (
// //                     <div key={i} className="flex items-center gap-2">
// //                       <div className="w-2 h-2 bg-emerald-500 rounded-full" />
// //                       <p className="text-gray-700">{landmark}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {data.salesIntelligence.locationAdvantages.metroDistance && (
// //               <div className="bg-emerald-50 p-4 rounded-lg mb-4">
// //                 <p className="font-bold text-emerald-800">Metro: {data.salesIntelligence.locationAdvantages.metroDistance}</p>
// //               </div>
// //             )}

// //             {data.salesIntelligence.locationAdvantages.connectivity && (
// //               <div className="bg-emerald-50 p-4 rounded-lg">
// //                 <p className="font-bold text-emerald-800">{data.salesIntelligence.locationAdvantages.connectivity}</p>
// //               </div>
// //             )}
// //           </div>

// //           {data.images.length > 1 && (
// //             <div className="grid grid-cols-2 gap-4">
// //               {data.images.slice(1, 5).map((img, i) => (
// //                 <div key={i} className="aspect-square rounded-lg overflow-hidden">
// //                   <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </Page>

// //       {/* Page 5: Floor Plans / Specs */}
// //       <Page>
// //         <div className="p-16">
// //           <h2 className="text-4xl font-bold mb-8 text-gray-900">Specifications</h2>
          
// //           {data.areaDetails && Object.keys(data.areaDetails).length > 0 && (
// //             <div className="mb-12">
// //               <h3 className="text-xl font-bold mb-4 text-emerald-600">Area Details</h3>
// //               <div className="grid grid-cols-2 gap-6">
// //                 {data.areaDetails.carpetArea && (
// //                   <div className="bg-gray-50 p-4 rounded-lg">
// //                     <p className="text-sm text-gray-500 mb-1">Carpet Area</p>
// //                     <p className="text-2xl font-bold">{data.areaDetails.carpetArea}</p>
// //                   </div>
// //                 )}
// //                 {data.areaDetails.builtUpArea && (
// //                   <div className="bg-gray-50 p-4 rounded-lg">
// //                     <p className="text-sm text-gray-500 mb-1">Built-up Area</p>
// //                     <p className="text-2xl font-bold">{data.areaDetails.builtUpArea}</p>
// //                   </div>
// //                 )}
// //                 {data.areaDetails.superBuiltUpArea && (
// //                   <div className="bg-gray-50 p-4 rounded-lg">
// //                     <p className="text-sm text-gray-500 mb-1">Super Built-up Area</p>
// //                     <p className="text-2xl font-bold">{data.areaDetails.superBuiltUpArea}</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {data.priceDetails.pricePerSqft && (
// //             <div className="bg-emerald-50 p-6 rounded-lg mb-8">
// //               <p className="text-sm text-gray-600 mb-1">Price per Sq. Ft.</p>
// //               <p className="text-3xl font-bold text-emerald-700">{data.priceDetails.pricePerSqft}</p>
// //             </div>
// //           )}

// //           {data.images.find(i => i.label === 'floor_plan') && (
// //             <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
// //               <img 
// //                 src={getImg('floor_plan')} 
// //                 alt="Floor Plan" 
// //                 className="w-full h-auto"
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </Page>

// //       {/* Page 6: Contact */}
// //       <Page bg="#f9fafb">
// //         <div className="p-16 h-full flex flex-col justify-between">
// //           <div>
// //             <h2 className="text-4xl font-bold mb-8 text-gray-900">Get in Touch</h2>
            
// //             <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
// //               <h3 className="text-2xl font-bold mb-6 text-emerald-600">{data.branding.developerName}</h3>
              
// //               <div className="space-y-4 mb-8">
// //                 <p className="text-gray-700">{data.branding.siteAddress}</p>
// //                 {data.branding.websiteUrl && (
// //                   <p className="text-emerald-600 font-bold">{data.branding.websiteUrl}</p>
// //                 )}
// //                 {data.branding.reraNumber && (
// //                   <p className="text-sm text-gray-500">RERA: {data.branding.reraNumber}</p>
// //                 )}
// //               </div>

// //               {data.agent.name && (
// //                 <div className="border-t pt-6">
// //                   <p className="text-sm text-gray-500 mb-2">Contact Agent</p>
// //                   <p className="text-xl font-bold mb-1">{data.agent.name}</p>
// //                   <p className="text-gray-600 mb-3">{data.agent.title}</p>
// //                   <p className="text-emerald-600 font-bold mb-1">{data.agent.phone}</p>
// //                   <p className="text-gray-600">{data.agent.email}</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {data.branding.includeDisclaimer && (
// //             <div className="text-xs text-gray-400 leading-relaxed">
// //               <p>*All specifications, images, and information are indicative and subject to change. Please verify all details before making any decisions. This brochure does not constitute an offer or contract.</p>
// //             </div>
// //           )}
// //         </div>
// //       </Page>
// //     </div>
// //   );
// // };

// // export default DynamicBrochurePreview;
// import React, { useEffect, useState } from 'react';
// import { PropertyData } from '../types';
// import * as Babel from '@babel/standalone';
// import { generateDynamicBrochureLayout } from '../services/geminiLayoutService';

// // Import your Modern Luxury template
// import ModernLuxuryTemplateExport from '../templates/ModernLuxuryTemplate';

// interface DynamicBrochurePreviewProps {
//   data: PropertyData;
//   selectedTemplate: string;
// }

// // Error Boundary
// class ErrorBoundary extends React.Component<
//   { children: React.ReactNode },
//   { hasError: boolean; error: Error | null }
// > {
//   constructor(props: any) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error: Error) {
//     return { hasError: true, error };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="min-h-screen bg-gray-200 flex items-center justify-center p-8">
//           <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-2xl">
//             <h3 className="text-xl font-bold text-red-900 mb-2">Rendering Error</h3>
//             <p className="text-red-700 text-sm">{this.state.error?.message}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Reload
//             </button>
//           </div>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// const DynamicBrochurePreview: React.FC<DynamicBrochurePreviewProps> = ({ data, selectedTemplate }) => {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [aiComponent, setAiComponent] = useState<React.ComponentType<any> | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [regenerateTrigger, setRegenerateTrigger] = useState(0);

//   const getImg = (label: string) => {
//     const img = data.images.find(i => i.label === label || i.isCover);
//     return img?.url || data.images[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200';
//   };

//   // AI Generation
//   useEffect(() => {
//     if (selectedTemplate === 'ai_generated') {
//       const generateAI = async () => {
//         setIsGenerating(true);
//         setError(null);
        
//         try {
//           console.log('🤖 Starting AI generation...');
//           const layoutResult = await generateDynamicBrochureLayout(data);
          
//           if (!layoutResult || !layoutResult.code) {
//             throw new Error('AI generation failed - no code returned');
//           }

//           console.log('✅ AI code received, compiling...');

//           // Clean and compile code
//           let cleanedCode = layoutResult.code
//             .replace(/import\s+React\s+from\s+['"]react['"]\s*;?\s*/g, '')
//             .replace(/import\s+\{[^}]*\}\s+from\s+['"]react['"]\s*;?\s*/g, '')
//             .replace(/import\s+type\s+\{[^}]*\}\s+from\s+['"][^'"]*['"]\s*;?\s*/g, '')
//             .replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =');

//           const designMatch = cleanedCode.match(/const\s+design\s*=/);
//           const layoutMatch = cleanedCode.match(/const\s+BrochureLayout\s*=/);
          
//           if (designMatch && layoutMatch) {
//             cleanedCode += '\nexports.design = design;\nexports.BrochureLayout = BrochureLayout;';
//           }

//           const transformed = Babel.transform(cleanedCode, {
//             presets: [['react', { runtime: 'classic' }], 'typescript'],
//             filename: 'AILayout.tsx',
//           }).code;

//           const exports: any = {};
//           const func = new Function('React', 'exports', transformed || '');
//           func(React, exports);

//           const BrochureLayout = exports.BrochureLayout;
//           const design = exports.design;

//           if (!BrochureLayout) {
//             throw new Error('BrochureLayout component not found in AI code');
//           }

//           // Create wrapper
//           const ComponentWrapper = () => (
//             <ErrorBoundary>
//               <BrochureLayout data={data} design={design} getImg={getImg} />
//             </ErrorBoundary>
//           );

//           setAiComponent(() => ComponentWrapper);
//           setIsGenerating(false);
//           console.log('✅ AI component ready');

//         } catch (err: any) {
//           console.error('❌ AI Generation Error:', err);
//           setError(err.message);
//           setIsGenerating(false);
//         }
//       };

//       generateAI();
//     }
//   }, [selectedTemplate, data, regenerateTrigger]);

//   // Show loading for AI
//   if (selectedTemplate === 'ai_generated' && isGenerating) {
//     return (
//       <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8">
//         <div className="w-32 h-32 border-t-4 border-[#10B981] rounded-full animate-spin mb-8"></div>
//         <h3 className="text-3xl font-bold text-gray-900 mb-4">AI Creating Your Brochure</h3>
//         <p className="text-gray-600">Generating unique design for {data.title}...</p>
//       </div>
//     );
//   }

//   // Show error for AI
//   if (selectedTemplate === 'ai_generated' && error) {
//     return (
//       <div className="min-h-screen bg-gray-200 flex items-center justify-center p-8">
//         <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-2xl">
//           <h3 className="text-xl font-bold text-red-900 mb-2">AI Generation Failed</h3>
//           <p className="text-red-700 text-sm mb-4">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Render AI component
//   if (selectedTemplate === 'ai_generated' && aiComponent) {
//     const AIComponent = aiComponent;
//     return (
//       <>
//         <div className="no-print bg-white border-b sticky top-0 z-50 px-12 py-4 shadow-sm flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl">
//               🤖
//             </div>
//             <div>
//               <p className="font-bold text-gray-900">AI-Generated Design</p>
//               <p className="text-xs text-gray-500">Unique layout created for {data.title}</p>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               setAiComponent(null);
//               setRegenerateTrigger(prev => prev + 1);
//             }}
//             className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-semibold text-sm"
//           >
//             🔄 Regenerate Design
//           </button>
//         </div>
//         <AIComponent />
//       </>
//     );
//   }

//   // Render Modern Luxury template
//   if (selectedTemplate === 'modern_luxury') {
//     const ModernLuxuryTemplate = ModernLuxuryTemplateExport.component;
//     return <ModernLuxuryTemplate data={data} design={ModernLuxuryTemplateExport.design} getImg={getImg} />;
//   }

//   // For other templates, render basic brochure
//   return <BasicBrochure data={data} getImg={getImg} templateName={selectedTemplate} />;
// };

// // Basic brochure for templates not created yet
// const BasicBrochure: React.FC<{ data: PropertyData; getImg: (label: string) => string; templateName: string }> = ({ data, getImg, templateName }) => {
//   const Page: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = '#ffffff' }) => (
//     <div className="page mx-auto my-8 shadow-2xl" style={{ width: '794px', height: '1123px', backgroundColor: bg }}>
//       {children}
//     </div>
//   );

//   return (
//     <div className="bg-gray-200 py-12">
//       {/* Cover */}
//       <Page>
//         <div className="relative w-full h-full">
//           <img src={getImg('cover')} alt="Cover" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//           <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
//             <h1 className="text-6xl font-bold mb-4">{data.title}</h1>
//             <p className="text-2xl mb-2">{data.location}</p>
//             <p className="text-3xl font-bold text-emerald-400">{data.priceDetails.startingPrice}</p>
//           </div>
//         </div>
//       </Page>

//       {/* Overview */}
//       <Page>
//         <div className="p-16">
//           <h2 className="text-4xl font-bold mb-8">Property Overview</h2>
//           <div className="grid grid-cols-2 gap-6 mb-8">
//             <div><p className="text-sm text-gray-500">Configuration</p><p className="text-xl font-bold">{data.configuration.join(', ')}</p></div>
//             <div><p className="text-sm text-gray-500">Type</p><p className="text-xl font-bold capitalize">{data.propertyType}</p></div>
//             <div><p className="text-sm text-gray-500">Status</p><p className="text-xl font-bold capitalize">{data.projectStatus.replace('_', ' ')}</p></div>
//             <div><p className="text-sm text-gray-500">Price</p><p className="text-xl font-bold text-emerald-600">{data.priceDetails.startingPrice}</p></div>
//           </div>
//           <h3 className="text-2xl font-bold mb-4">Key Highlights</h3>
//           {data.salesIntelligence.keySellingPoints.map((point, i) => (
//             <div key={i} className="flex gap-3 mb-3">
//               <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">{i + 1}</div>
//               <p className="text-lg">{point}</p>
//             </div>
//           ))}
//         </div>
//       </Page>

//       {/* Amenities */}
//       <Page>
//         <div className="p-16">
//           <h2 className="text-4xl font-bold mb-8">Amenities</h2>
//           {data.amenities.projectAmenities.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-xl font-bold mb-3 text-emerald-600">Project Amenities</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {data.amenities.projectAmenities.map((a, i) => (
//                   <div key={i} className="flex gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"/><p>{a}</p></div>
//                 ))}
//               </div>
//             </div>
//           )}
//           {data.amenities.apartmentFeatures.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-xl font-bold mb-3 text-emerald-600">Apartment Features</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {data.amenities.apartmentFeatures.map((a, i) => (
//                   <div key={i} className="flex gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"/><p>{a}</p></div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </Page>

//       {/* Location */}
//       <Page>
//         <div className="p-16">
//           <h2 className="text-4xl font-bold mb-8">Location</h2>
//           <p className="text-2xl mb-6">{data.location}</p>
//           {data.salesIntelligence.locationAdvantages.nearbyLandmarks.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-xl font-bold mb-3 text-emerald-600">Nearby</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {data.salesIntelligence.locationAdvantages.nearbyLandmarks.map((l, i) => (
//                   <div key={i} className="flex gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"/><p>{l}</p></div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </Page>

//       {/* Contact */}
//       <Page bg="#f9fafb">
//         <div className="p-16">
//           <h2 className="text-4xl font-bold mb-8">Contact</h2>
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <h3 className="text-2xl font-bold mb-4 text-emerald-600">{data.branding.developerName}</h3>
//             <p className="mb-2">{data.branding.siteAddress}</p>
//             {data.branding.websiteUrl && <p className="text-emerald-600 font-bold mb-4">{data.branding.websiteUrl}</p>}
//             {data.agent.name && (
//               <div className="border-t pt-6 mt-6">
//                 <p className="text-xl font-bold mb-1">{data.agent.name}</p>
//                 <p className="text-gray-600 mb-2">{data.agent.title}</p>
//                 <p className="text-emerald-600 font-bold">{data.agent.phone}</p>
//                 <p className="text-gray-600">{data.agent.email}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </Page>
//     </div>
//   );
// };

// export default DynamicBrochurePreview;
import React, { useEffect, useState } from 'react';
import { PropertyData } from '../types';
import * as Babel from '@babel/standalone';
import { generateDynamicBrochureLayout } from '../services/geminiLayoutService';

// Import your Modern Luxury template
import ModernLuxuryTemplateExport from '../templates/ModernLuxuryTemplate';

interface DynamicBrochurePreviewProps {
  data: PropertyData;
  selectedTemplate: string;
}

// Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-2xl">
            <h3 className="text-xl font-bold text-red-900 mb-2">Rendering Error</h3>
            <p className="text-red-700 text-sm">{this.state.error?.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const DynamicBrochurePreview: React.FC<DynamicBrochurePreviewProps> = ({ data, selectedTemplate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiComponent, setAiComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [regenerateTrigger, setRegenerateTrigger] = useState(0);

  const getImg = (label: string) => {
    const img = data.images.find(i => i.label === label || i.isCover);
    return img?.url || data.images[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200';
  };

  // AI Generation
  useEffect(() => {
    if (selectedTemplate === 'ai_generated') {
      const generateAI = async () => {
        setIsGenerating(true);
        setError(null);
        
        try {
          console.log('🤖 Starting AI generation...');
          const layoutResult = await generateDynamicBrochureLayout(data);
          
          if (!layoutResult || !layoutResult.code) {
            throw new Error('AI generation failed - no code returned');
          }

          console.log('✅ AI code received, compiling...');

          // Clean and compile code
          let cleanedCode = layoutResult.code
            .replace(/import\s+React\s+from\s+['"]react['"]\s*;?\s*/g, '')
            .replace(/import\s+\{[^}]*\}\s+from\s+['"]react['"]\s*;?\s*/g, '')
            .replace(/import\s+type\s+\{[^}]*\}\s+from\s+['"][^'"]*['"]\s*;?\s*/g, '')
            .replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =');

          const designMatch = cleanedCode.match(/const\s+design\s*=/);
          const layoutMatch = cleanedCode.match(/const\s+BrochureLayout\s*=/);
          
          if (designMatch && layoutMatch) {
            cleanedCode += '\nexports.design = design;\nexports.BrochureLayout = BrochureLayout;';
          }

          const transformed = Babel.transform(cleanedCode, {
            presets: [['react', { runtime: 'classic' }], 'typescript'],
            filename: 'AILayout.tsx',
          }).code;

          const exports: any = {};
          const func = new Function('React', 'exports', transformed || '');
          func(React, exports);

          const BrochureLayout = exports.BrochureLayout;
          const design = exports.design;

          if (!BrochureLayout) {
            throw new Error('BrochureLayout component not found in AI code');
          }

          // Create SAFE data wrapper with comprehensive defaults
          const safeData = {
            title: data.title || 'Property',
            location: data.location || 'Location',
            price: data.price || '',
            propertyType: data.propertyType || 'apartment',
            projectStatus: data.projectStatus || 'new_launch',
            configuration: Array.isArray(data.configuration) ? data.configuration : [],
            areaDetails: data.areaDetails || {},
            priceDetails: {
              startingPrice: data.priceDetails?.startingPrice || '',
              pricePerSqft: data.priceDetails?.pricePerSqft || '',
              isAllInclusive: data.priceDetails?.isAllInclusive ?? false,
              priceRange: data.priceDetails?.priceRange || {}
            },
            specs: {
              beds: data.specs?.beds || '',
              baths: data.specs?.baths || '',
              sqft: data.specs?.sqft || '',
              yearBuilt: data.specs?.yearBuilt || ''
            },
            images: Array.isArray(data.images) ? data.images : [],
            amenities: {
              projectAmenities: Array.isArray(data.amenities?.projectAmenities) ? data.amenities.projectAmenities : [],
              apartmentFeatures: Array.isArray(data.amenities?.apartmentFeatures) ? data.amenities.apartmentFeatures : [],
              securityFeatures: Array.isArray(data.amenities?.securityFeatures) ? data.amenities.securityFeatures : [],
              sustainability: Array.isArray(data.amenities?.sustainability) ? data.amenities.sustainability : []
            },
            salesIntelligence: {
              targetBuyer: Array.isArray(data.salesIntelligence?.targetBuyer) ? data.salesIntelligence.targetBuyer : [],
              keySellingPoints: Array.isArray(data.salesIntelligence?.keySellingPoints) ? data.salesIntelligence.keySellingPoints : ['', '', ''],
              locationAdvantages: {
                nearbyLandmarks: Array.isArray(data.salesIntelligence?.locationAdvantages?.nearbyLandmarks) ? data.salesIntelligence.locationAdvantages.nearbyLandmarks : [],
                metroDistance: data.salesIntelligence?.locationAdvantages?.metroDistance || '',
                connectivity: data.salesIntelligence?.locationAdvantages?.connectivity || ''
              },
              uniqueFeatures: data.salesIntelligence?.uniqueFeatures || ''
            },
            branding: {
              developerName: data.branding?.developerName || '',
              siteAddress: data.branding?.siteAddress || '',
              includeDisclaimer: data.branding?.includeDisclaimer ?? true,
              reraNumber: data.branding?.reraNumber || '',
              websiteUrl: data.branding?.websiteUrl || '',
              logoUrl: data.branding?.logoUrl || ''
            },
            agent: {
              name: data.agent?.name || '',
              title: data.agent?.title || '',
              phone: data.agent?.phone || '',
              email: data.agent?.email || '',
              photoUrl: data.agent?.photoUrl || ''
            },
            usageIntent: data.usageIntent || 'print',
            selectedTheme: data.selectedTheme || 'Luxury',
            description: data.description || ''
          };

          // Create wrapper with Error Boundary and safe data
          const ComponentWrapper = () => (
            <ErrorBoundary>
              <BrochureLayout 
                data={safeData} 
                design={design}
                getImg={getImg}
              />
            </ErrorBoundary>
          );

          setAiComponent(() => ComponentWrapper);
          setIsGenerating(false);
          console.log('✅ AI component ready');

        } catch (err: any) {
          console.error('❌ AI Generation Error:', err);
          setError(err.message);
          setIsGenerating(false);
        }
      };

      generateAI();
    }
  }, [selectedTemplate, data, regenerateTrigger]);

  // Show loading for AI
  if (selectedTemplate === 'ai_generated' && isGenerating) {
    return (
      <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8">
        <div className="w-32 h-32 border-t-4 border-[#10B981] rounded-full animate-spin mb-8"></div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">AI Creating Your Brochure</h3>
        <p className="text-gray-600">Generating unique design for {data.title}...</p>
      </div>
    );
  }

  // Show error for AI
  if (selectedTemplate === 'ai_generated' && error) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center p-8">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-2xl">
          <h3 className="text-xl font-bold text-red-900 mb-2">AI Generation Failed</h3>
          <p className="text-red-700 text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render AI component
  if (selectedTemplate === 'ai_generated' && aiComponent) {
    const AIComponent = aiComponent;
    return (
      <>
        <div className="no-print bg-white border-b sticky top-0 z-50 px-12 py-4 shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <p className="font-bold text-gray-900">AI-Generated Design</p>
              <p className="text-xs text-gray-500">Unique layout created for {data.title}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setAiComponent(null);
              setRegenerateTrigger(prev => prev + 1);
            }}
            className="px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-lg font-semibold text-sm"
          >
            🔄 Regenerate Design
          </button>
        </div>
        <AIComponent />
      </>
    );
  }

  // Render Modern Luxury template
  if (selectedTemplate === 'modern_luxury') {
    const ModernLuxuryTemplate = ModernLuxuryTemplateExport.component;
    return <ModernLuxuryTemplate data={data} design={ModernLuxuryTemplateExport.design} getImg={getImg} />;
  }

  // For other templates, render basic brochure
  return <BasicBrochure data={data} getImg={getImg} templateName={selectedTemplate} />;
};

// Basic brochure for templates not created yet
const BasicBrochure: React.FC<{ data: PropertyData; getImg: (label: string) => string; templateName: string }> = ({ data, getImg, templateName }) => {
  const Page: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = '#ffffff' }) => (
    <div className="page mx-auto my-8 shadow-2xl" style={{ width: '794px', height: '1123px', backgroundColor: bg }}>
      {children}
    </div>
  );

  return (
    <div className="bg-gray-200 py-12">
      {/* Cover */}
      <Page>
        <div className="relative w-full h-full">
          <img src={getImg('cover')} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
            <h1 className="text-6xl font-bold mb-4">{data.title}</h1>
            <p className="text-2xl mb-2">{data.location}</p>
            <p className="text-3xl font-bold text-emerald-400">{data.priceDetails.startingPrice}</p>
          </div>
        </div>
      </Page>

      {/* Overview */}
      <Page>
        <div className="p-16">
          <h2 className="text-4xl font-bold mb-8">Property Overview</h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div><p className="text-sm text-gray-500">Configuration</p><p className="text-xl font-bold">{data.configuration.join(', ')}</p></div>
            <div><p className="text-sm text-gray-500">Type</p><p className="text-xl font-bold capitalize">{data.propertyType}</p></div>
            <div><p className="text-sm text-gray-500">Status</p><p className="text-xl font-bold capitalize">{data.projectStatus.replace('_', ' ')}</p></div>
            <div><p className="text-sm text-gray-500">Price</p><p className="text-xl font-bold text-emerald-600">{data.priceDetails.startingPrice}</p></div>
          </div>
          <h3 className="text-2xl font-bold mb-4">Key Highlights</h3>
          {data.salesIntelligence.keySellingPoints.map((point, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">{i + 1}</div>
              <p className="text-lg">{point}</p>
            </div>
          ))}
        </div>
      </Page>

      {/* Amenities */}
      <Page>
        <div className="p-16">
          <h2 className="text-4xl font-bold mb-8">Amenities</h2>
          {data.amenities.projectAmenities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-emerald-600">Project Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {data.amenities.projectAmenities.map((a, i) => (
                  <div key={i} className="flex gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"/><p>{a}</p></div>
                ))}
              </div>
            </div>
          )}
          {data.amenities.apartmentFeatures.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-emerald-600">Apartment Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {data.amenities.apartmentFeatures.map((a, i) => (
                  <div key={i} className="flex gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"/><p>{a}</p></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Page>

      {/* Location */}
      <Page>
        <div className="p-16">
          <h2 className="text-4xl font-bold mb-8">Location</h2>
          <p className="text-2xl mb-6">{data.location}</p>
          {data.salesIntelligence.locationAdvantages.nearbyLandmarks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-emerald-600">Nearby</h3>
              <div className="grid grid-cols-2 gap-2">
                {data.salesIntelligence.locationAdvantages.nearbyLandmarks.map((l, i) => (
                  <div key={i} className="flex gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"/><p>{l}</p></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Page>

      {/* Contact */}
      <Page bg="#f9fafb">
        <div className="p-16">
          <h2 className="text-4xl font-bold mb-8">Contact</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-emerald-600">{data.branding.developerName}</h3>
            <p className="mb-2">{data.branding.siteAddress}</p>
            {data.branding.websiteUrl && <p className="text-emerald-600 font-bold mb-4">{data.branding.websiteUrl}</p>}
            {data.agent.name && (
              <div className="border-t pt-6 mt-6">
                <p className="text-xl font-bold mb-1">{data.agent.name}</p>
                <p className="text-gray-600 mb-2">{data.agent.title}</p>
                <p className="text-emerald-600 font-bold">{data.agent.phone}</p>
                <p className="text-gray-600">{data.agent.email}</p>
              </div>
            )}
          </div>
        </div>
      </Page>
    </div>
  );
};

export default DynamicBrochurePreview;