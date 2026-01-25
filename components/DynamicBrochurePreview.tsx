// import React, { useEffect, useState, useRef } from 'react';
// import { PropertyData } from '../types';
// import * as Babel from '@babel/standalone';

// interface DynamicBrochurePreviewProps {
//   data: PropertyData;
//   layoutCode: string;
// }

// // Error Boundary Component
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

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     console.error("🔴 Error Boundary caught error:", error);
//     console.error("Error info:", errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="w-full max-w-4xl mx-auto my-10 p-8 bg-red-50 border-2 border-red-200 rounded-lg">
//           <div className="flex items-start gap-4">
//             <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
//               <span className="text-red-600 text-2xl">⚠</span>
//             </div>
//             <div className="flex-1">
//               <h3 className="font-bold text-red-900 text-lg mb-2">Layout Rendering Error</h3>
//               <p className="text-red-700 text-sm mb-4">
//                 The AI-generated layout tried to access data that doesn't exist. This is a common issue with dynamic code generation.
//               </p>
//               <div className="bg-red-100 p-4 rounded font-mono text-xs text-red-800 overflow-auto max-h-40 mb-4">
//                 {this.state.error?.message || "Unknown error"}
//               </div>
//               <p className="text-red-700 text-sm mb-4">
//                 <strong>Common causes:</strong> The layout is trying to use .map() on undefined data, or accessing nested properties that don't exist.
//               </p>
//               <button 
//                 onClick={() => window.location.reload()}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
//               >
//                 Try Generating Again
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// const DynamicBrochurePreview: React.FC<DynamicBrochurePreviewProps> = ({ data, layoutCode }) => {
//   const [RenderedComponent, setRenderedComponent] = useState<React.ComponentType<any> | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [design, setDesign] = useState<any>(null);

//   // Image getter function to pass to the dynamic component
//   const getImg = (label: string) => {
//     // First try to find exact label match
//     const exactMatch = data.images.find(i => i.label === label);
//     if (exactMatch) return exactMatch.url;
    
//     // If no exact match, try to find cover image
//     const coverImage = data.images.find(i => i.isCover);
//     if (coverImage && ['elevation', 'exterior', 'living_room'].includes(label)) {
//       return coverImage.url;
//     }
    
//     // Try to find any image from uploaded images
//     if (data.images.length > 0) {
//       // For specific labels, try to find related images
//       if (label === 'elevation' || label === 'exterior') {
//         const found = data.images.find(i => ['elevation', 'exterior', 'lobby'].includes(i.label));
//         if (found) return found.url;
//       }
      
//       if (label === 'living_room') {
//         const found = data.images.find(i => ['living_room', 'bedroom', 'balcony'].includes(i.label));
//         if (found) return found.url;
//       }
      
//       if (label === 'bedroom') {
//         const found = data.images.find(i => ['bedroom', 'living_room', 'bathroom'].includes(i.label));
//         if (found) return found.url;
//       }
      
//       if (label === 'amenities') {
//         const found = data.images.find(i => ['amenities', 'lobby', 'exterior'].includes(i.label));
//         if (found) return found.url;
//       }
      
//       if (label === 'location_map') {
//         const found = data.images.find(i => i.label === 'location_map');
//         if (found) return found.url;
//       }
      
//       // Last resort: use first available image
//       return data.images[0].url;
//     }
    
//     // Fallback to placeholder only if no images uploaded at all
//     return `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1600&fit=crop&q=80`;
//   };

//   useEffect(() => {
//     if (!layoutCode) {
//       setError("No layout code provided");
//       return;
//     }

//     try {
//       console.log("🔧 Compiling dynamic layout code...");
      
//       // Remove import statements
//       let cleanedCode = layoutCode
//         .replace(/import\s+React\s+from\s+['"]react['"]\s*;?\s*/g, '')
//         .replace(/import\s+\{[^}]*\}\s+from\s+['"]react['"]\s*;?\s*/g, '')
//         .replace(/import\s+type\s+\{[^}]*\}\s+from\s+['"][^'"]*['"]\s*;?\s*/g, '');
      
//       // Replace export statements BEFORE Babel transformation
//       // This converts: export const X = ... to: const X = ...; exports.X = X;
//       cleanedCode = cleanedCode.replace(
//         /export\s+const\s+(\w+)\s*=/g, 
//         'const $1 ='
//       );
      
//       // Add export assignments at the end
//       // Look for the const declarations we just created
//       const designMatch = cleanedCode.match(/const\s+design\s*=/);
//       const layoutMatch = cleanedCode.match(/const\s+BrochureLayout\s*=/);
      
//       if (designMatch && layoutMatch) {
//         cleanedCode += '\nexports.design = design;\nexports.BrochureLayout = BrochureLayout;';
//       }
      
//       // Transform the code with Babel
//       const transformed = Babel.transform(cleanedCode, {
//         presets: [
//           ['react', { runtime: 'classic' }],
//           'typescript'
//         ],
//         filename: 'DynamicLayout.tsx',
//       }).code;

//       console.log("✅ Code compiled successfully");

//       // Create exports object
//       const exports: any = {};
      
//       // Execute the transformed code with React and exports in scope
//       try {
//         const func = new Function('React', 'exports', transformed || '');
//         func(React, exports);
//       } catch (execError: any) {
//         console.error("Execution error:", execError);
//         console.error("Transformed code sample:", transformed?.substring(0, 500));
//         throw execError;
//       }

//       // Extract the design and component
//       const extractedDesign = exports.design;
//       const BrochureLayout = exports.BrochureLayout;

//       if (!BrochureLayout) {
//         console.error("Available exports:", Object.keys(exports));
//         console.error("Code sample:", cleanedCode.substring(0, 500));
//         throw new Error("BrochureLayout component not found. Available: " + Object.keys(exports).join(', '));
//       }

//       if (!extractedDesign) {
//         console.error("Available exports:", Object.keys(exports));
//         throw new Error("Design object not found. Available: " + Object.keys(exports).join(', '));
//       }

//       console.log("🎨 Design extracted:", extractedDesign);
//       setDesign(extractedDesign);

//       // Create a safe data wrapper with comprehensive defaults
//       const safeData = {
//         title: data.title || 'Property',
//         location: data.location || 'Location',
//         price: data.price || '',
//         propertyType: data.propertyType || 'apartment',
//         projectStatus: data.projectStatus || 'new_launch',
//         configuration: Array.isArray(data.configuration) ? data.configuration : [],
//         areaDetails: data.areaDetails || {},
//         priceDetails: {
//           startingPrice: '',
//           isAllInclusive: false,
//           ...data.priceDetails
//         },
//         specs: {
//           beds: '',
//           baths: '',
//           sqft: '',
//           yearBuilt: '',
//           ...data.specs
//         },
//         images: Array.isArray(data.images) ? data.images : [],
//         amenities: {
//           projectAmenities: Array.isArray(data.amenities?.projectAmenities) ? data.amenities.projectAmenities : [],
//           apartmentFeatures: Array.isArray(data.amenities?.apartmentFeatures) ? data.amenities.apartmentFeatures : [],
//           securityFeatures: Array.isArray(data.amenities?.securityFeatures) ? data.amenities.securityFeatures : [],
//           sustainability: Array.isArray(data.amenities?.sustainability) ? data.amenities.sustainability : []
//         },
//         salesIntelligence: {
//           targetBuyer: Array.isArray(data.salesIntelligence?.targetBuyer) ? data.salesIntelligence.targetBuyer : [],
//           keySellingPoints: Array.isArray(data.salesIntelligence?.keySellingPoints) ? data.salesIntelligence.keySellingPoints : ['', '', ''],
//           locationAdvantages: {
//             nearbyLandmarks: Array.isArray(data.salesIntelligence?.locationAdvantages?.nearbyLandmarks) 
//               ? data.salesIntelligence.locationAdvantages.nearbyLandmarks 
//               : [],
//             metroDistance: data.salesIntelligence?.locationAdvantages?.metroDistance || '',
//             schools: Array.isArray(data.salesIntelligence?.locationAdvantages?.schools)
//               ? data.salesIntelligence.locationAdvantages.schools
//               : [],
//             hospitals: Array.isArray(data.salesIntelligence?.locationAdvantages?.hospitals)
//               ? data.salesIntelligence.locationAdvantages.hospitals
//               : [],
//             itParks: Array.isArray(data.salesIntelligence?.locationAdvantages?.itParks)
//               ? data.salesIntelligence.locationAdvantages.itParks
//               : [],
//             shopping: Array.isArray(data.salesIntelligence?.locationAdvantages?.shopping)
//               ? data.salesIntelligence.locationAdvantages.shopping
//               : [],
//             connectivity: data.salesIntelligence?.locationAdvantages?.connectivity || ''
//           },
//           uniqueFeatures: data.salesIntelligence?.uniqueFeatures || ''
//         },
//         branding: {
//           developerName: data.branding?.developerName || '',
//           siteAddress: data.branding?.siteAddress || '',
//           includeDisclaimer: data.branding?.includeDisclaimer ?? true,
//           reraNumber: data.branding?.reraNumber || '',
//           websiteUrl: data.branding?.websiteUrl || '',
//           logoUrl: data.branding?.logoUrl || ''
//         },
//         agent: {
//           name: data.agent?.name || '',
//           title: data.agent?.title || '',
//           phone: data.agent?.phone || '',
//           email: data.agent?.email || '',
//           photoUrl: data.agent?.photoUrl || ''
//         },
//         usageIntent: data.usageIntent || 'print',
//         selectedTheme: data.selectedTheme || 'Luxury',
//         description: data.description || ''
//       };

//       // Create a wrapper component
//       const ComponentWrapper = () => (
//         <ErrorBoundary>
//           <BrochureLayout 
//             data={safeData} 
//             design={extractedDesign}
//             getImg={getImg}
//           />
//         </ErrorBoundary>
//       );

//       setRenderedComponent(() => ComponentWrapper);
//       setError(null);
      
//     } catch (err: any) {
//       console.error("❌ Error compiling layout code:", err);
//       console.error("Error stack:", err.stack);
//       setError(err.message || "Failed to compile layout");
//       setRenderedComponent(null);
//     }
//   }, [layoutCode, data]);

//   if (error) {
//     return (
//       <div className="w-full max-w-4xl mx-auto my-10 p-8 bg-red-50 border-2 border-red-200 rounded-lg">
//         <div className="flex items-start gap-4">
//           <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
//             <span className="text-red-600 text-2xl">⚠</span>
//           </div>
//           <div className="flex-1">
//             <h3 className="font-bold text-red-900 text-lg mb-2">Layout Compilation Error</h3>
//             <p className="text-red-700 text-sm mb-4">
//               The AI-generated layout code encountered an error. This can happen occasionally.
//             </p>
//             <div className="bg-red-100 p-4 rounded font-mono text-xs text-red-800 overflow-auto max-h-40">
//               {error}
//             </div>
//             <button 
//               onClick={() => window.location.reload()}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
//             >
//               Try Generating Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!RenderedComponent) {
//     return (
//       <div className="w-full max-w-4xl mx-auto my-10 p-8 bg-blue-50 border-2 border-blue-200 rounded-lg">
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
//             <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//           <div>
//             <h3 className="font-bold text-blue-900 text-lg">Compiling Layout...</h3>
//             <p className="text-blue-700 text-sm">Processing AI-generated brochure design</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div id="brochure-root">
//       {/* Info Banner */}
//       {data.images.length > 0 ? (
//         <div className="no-print w-full max-w-4xl mx-auto mb-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
//               <span className="text-emerald-600 text-xl">✓</span>
//             </div>
//             <div className="flex-1">
//               <h4 className="font-semibold text-emerald-900 text-sm">Dynamic Layout Generated</h4>
//               <p className="text-emerald-700 text-xs">
//                 Unique design created with {data.images.length} uploaded image{data.images.length !== 1 ? 's' : ''}
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="no-print w-full max-w-4xl mx-auto mb-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
//               <span className="text-yellow-600 text-xl">⚠</span>
//             </div>
//             <div className="flex-1">
//               <h4 className="font-semibold text-yellow-900 text-sm">Using Placeholder Images</h4>
//               <p className="text-yellow-700 text-xs">
//                 No images uploaded. Go back to Step 4 to add property images.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Design Info (Development Only) */}
//       {design && process.env.NODE_ENV === 'development' && (
//         <div className="no-print w-full max-w-4xl mx-auto mb-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
//           <details className="cursor-pointer">
//             <summary className="font-semibold text-gray-700 text-sm">Design System (Dev Info)</summary>
//             <div className="mt-2 text-xs text-gray-600 space-y-1">
//               <p><strong>Colors:</strong> {design.primaryColor} / {design.secondaryColor} / {design.accentColor}</p>
//               <p><strong>Fonts:</strong> {design.headingFont} / {design.bodyFont}</p>
//               <p><strong>Tagline:</strong> {design.copy?.aiTagline}</p>
//             </div>
//           </details>
//         </div>
//       )}

//       {/* Render the dynamic component */}
//       <RenderedComponent />
//     </div>
//   );
// };

// export default DynamicBrochurePreview;
import React, { useEffect, useState, useRef } from 'react';
import { PropertyData } from '../types';
import * as Babel from '@babel/standalone';

interface DynamicBrochurePreviewProps {
  data: PropertyData;
  layoutCode: string;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null; errorInfo: React.ErrorInfo | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🔴 Error Boundary caught error:", error);
    console.error("Error info:", errorInfo);
    console.error("Component stack:", errorInfo.componentStack);
    
    // Log specific error types for debugging
    if (error.message.includes("Cannot read properties of undefined")) {
      console.error("❌ DATA ACCESS ERROR: AI tried to access undefined data");
    } else if (error.message.includes("map")) {
      console.error("❌ MAP ERROR: AI tried to .map() over non-array data");
    } else if (error.message.includes("is not a function")) {
      console.error("❌ FUNCTION ERROR: AI tried to call something that's not a function");
    }
    
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || "Unknown error";
      let errorType = "Rendering Error";
      let errorExplanation = "The AI-generated layout encountered an error while rendering.";
      let suggestion = "Try regenerating to get better code from the AI.";
      
      // Categorize errors and provide specific guidance
      if (errorMessage.includes("Cannot read properties of undefined")) {
        errorType = "Data Access Error";
        errorExplanation = "The AI tried to access data that doesn't exist (reading properties of undefined).";
        suggestion = "The AI's code is trying to access nested properties without checking if they exist. Regenerate for safer code.";
      } else if (errorMessage.includes("Cannot read property 'map'") || errorMessage.includes("map is not a function")) {
        errorType = "Array Error";
        errorExplanation = "The AI tried to use .map() on data that isn't an array.";
        suggestion = "The AI forgot to check if the data is an array before using .map(). Regenerate for defensive code.";
      } else if (errorMessage.includes("is not a function")) {
        errorType = "Function Call Error";
        errorExplanation = "The AI tried to call something that isn't a function.";
        suggestion = "There's a syntax error in the generated code. Regenerate for correct syntax.";
      } else if (errorMessage.includes("undefined is not an object")) {
        errorType = "Null Reference Error";
        errorExplanation = "The AI tried to use a value that is null or undefined.";
        suggestion = "The AI's code needs better null checks. Regenerate for safer code.";
      }
      
      return (
        <div className="w-full max-w-4xl mx-auto my-10 p-8 bg-red-50 border-2 border-red-200 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <span className="text-red-600 text-2xl">⚠</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 text-lg mb-2">{errorType}</h3>
              <p className="text-red-700 text-sm mb-3">
                {errorExplanation}
              </p>
              <div className="bg-red-100 p-4 rounded font-mono text-xs text-red-800 overflow-auto max-h-40 mb-4">
                <div className="font-bold mb-1">Error Details:</div>
                {errorMessage}
              </div>
              <p className="text-red-700 text-sm font-medium mb-4">
                💡 {suggestion}
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => window.location.reload()}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold shadow-md"
                >
                  🔄 Regenerate Layout
                </button>
                <button 
                  onClick={() => {
                    console.log("Full error details:", this.state);
                    alert("Check browser console (F12) for detailed error information");
                  }}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-semibold"
                >
                  🐛 View Debug Info
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-red-200">
                <details className="text-xs text-red-600">
                  <summary className="cursor-pointer font-semibold hover:text-red-800">Why does this happen?</summary>
                  <div className="mt-2 space-y-2 text-red-700">
                    <p>• The AI generates code dynamically, and sometimes it makes mistakes</p>
                    <p>• It might try to access data without checking if it exists first</p>
                    <p>• It might use incorrect syntax or call functions that don't exist</p>
                    <p>• Regenerating usually produces better, error-free code</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const DynamicBrochurePreview: React.FC<DynamicBrochurePreviewProps> = ({ data, layoutCode }) => {
  const [RenderedComponent, setRenderedComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [design, setDesign] = useState<any>(null);

  // Image getter function to pass to the dynamic component
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

  useEffect(() => {
    if (!layoutCode) {
      setError("No layout code provided");
      return;
    }

    try {
      console.log("🔧 Compiling dynamic layout code...");
      
      // Step 1: Remove import statements
      let cleanedCode = layoutCode
        .replace(/import\s+React\s+from\s+['"]react['"]\s*;?\s*/g, '')
        .replace(/import\s+\{[^}]*\}\s+from\s+['"]react['"]\s*;?\s*/g, '')
        .replace(/import\s+type\s+\{[^}]*\}\s+from\s+['"][^'"]*['"]\s*;?\s*/g, '');
      
      // Step 2: Convert export statements BEFORE Babel
      cleanedCode = cleanedCode.replace(
        /export\s+const\s+(\w+)\s*=/g, 
        'const $1 ='
      );
      
      // Step 3: Check if design and BrochureLayout exist in code
      const hasDesign = cleanedCode.match(/const\s+design\s*=/);
      const hasLayout = cleanedCode.match(/const\s+BrochureLayout\s*=/);
      
      if (!hasDesign) {
        throw new Error("Generated code is missing 'design' object export. The AI didn't follow the required structure.");
      }
      
      if (!hasLayout) {
        throw new Error("Generated code is missing 'BrochureLayout' component export. The AI didn't follow the required structure.");
      }
      
      // Step 4: Add export assignments at the end
      cleanedCode += '\nexports.design = design;\nexports.BrochureLayout = BrochureLayout;';
      
      // Step 5: Transform with Babel
      let transformed: string;
      try {
        const babelResult = Babel.transform(cleanedCode, {
          presets: [
            ['react', { runtime: 'classic' }],
            'typescript'
          ],
          filename: 'DynamicLayout.tsx',
        });
        
        transformed = babelResult.code || '';
        
        if (!transformed) {
          throw new Error("Babel transformation resulted in empty code");
        }
        
      } catch (babelError: any) {
        console.error("❌ Babel compilation error:", babelError);
        console.error("Code causing error:", cleanedCode.substring(0, 1000));
        throw new Error(`Babel compilation failed: ${babelError.message}. The AI generated invalid TypeScript/JSX syntax.`);
      }

      console.log("✅ Code compiled successfully");

      // Step 6: Execute the code safely
      const exports: any = {};
      
      try {
        const func = new Function('React', 'exports', transformed);
        func(React, exports);
      } catch (execError: any) {
        console.error("❌ Code execution error:", execError);
        console.error("Transformed code sample:", transformed.substring(0, 500));
        
        // Provide specific error messages based on common issues
        if (execError.message.includes('is not defined')) {
          throw new Error(`Runtime error: ${execError.message}. The AI used variables or functions that don't exist.`);
        } else if (execError.message.includes('Cannot read property')) {
          throw new Error(`Runtime error: ${execError.message}. The AI tried to access properties on undefined objects.`);
        } else {
          throw new Error(`Code execution failed: ${execError.message}. The AI generated code with runtime errors.`);
        }
      }

      // Step 7: Validate extracted exports
      const extractedDesign = exports.design;
      const BrochureLayout = exports.BrochureLayout;

      if (!BrochureLayout) {
        console.error("❌ BrochureLayout not found in exports");
        console.error("Available exports:", Object.keys(exports));
        console.error("Code sample:", cleanedCode.substring(0, 500));
        throw new Error(`BrochureLayout component not found. Available exports: ${Object.keys(exports).join(', ')}. The AI didn't properly export the component.`);
      }

      if (typeof BrochureLayout !== 'function') {
        throw new Error(`BrochureLayout is not a function (it's a ${typeof BrochureLayout}). The AI didn't create a valid React component.`);
      }

      if (!extractedDesign) {
        console.error("❌ Design object not found in exports");
        console.error("Available exports:", Object.keys(exports));
        throw new Error(`Design object not found. Available exports: ${Object.keys(exports).join(', ')}. The AI didn't properly export the design.`);
      }

      // Step 8: Validate design object structure
      const requiredDesignKeys = ['primaryColor', 'secondaryColor', 'accentColor', 'backgroundColor', 'headingFont', 'bodyFont', 'copy'];
      const missingKeys = requiredDesignKeys.filter(key => !(key in extractedDesign));
      
      if (missingKeys.length > 0) {
        console.warn("⚠️ Design object is missing keys:", missingKeys);
        // Don't throw, just warn - we can work with partial design
      }

      if (extractedDesign.copy) {
        const requiredCopyKeys = ['aiTagline', 'aiNarrative', 'aiLocationHook'];
        const missingCopyKeys = requiredCopyKeys.filter(key => !(key in extractedDesign.copy));
        if (missingCopyKeys.length > 0) {
          console.warn("⚠️ Design copy is missing keys:", missingCopyKeys);
        }
      }

      console.log("🎨 Design extracted:", extractedDesign);
      setDesign(extractedDesign);

      // Step 9: Create safe data wrapper with comprehensive defaults
      const safeData = {
        title: data.title || 'Property',
        location: data.location || 'Location',
        price: data.price || '',
        propertyType: data.propertyType || 'apartment',
        projectStatus: data.projectStatus || 'new_launch',
        configuration: Array.isArray(data.configuration) ? data.configuration : [],
        areaDetails: data.areaDetails || {},
        priceDetails: {
          startingPrice: '',
          isAllInclusive: false,
          ...data.priceDetails
        },
        specs: {
          beds: '',
          baths: '',
          sqft: '',
          yearBuilt: '',
          ...data.specs
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
            nearbyLandmarks: Array.isArray(data.salesIntelligence?.locationAdvantages?.nearbyLandmarks) 
              ? data.salesIntelligence.locationAdvantages.nearbyLandmarks 
              : [],
            metroDistance: data.salesIntelligence?.locationAdvantages?.metroDistance || '',
            schools: Array.isArray(data.salesIntelligence?.locationAdvantages?.schools)
              ? data.salesIntelligence.locationAdvantages.schools
              : [],
            hospitals: Array.isArray(data.salesIntelligence?.locationAdvantages?.hospitals)
              ? data.salesIntelligence.locationAdvantages.hospitals
              : [],
            itParks: Array.isArray(data.salesIntelligence?.locationAdvantages?.itParks)
              ? data.salesIntelligence.locationAdvantages.itParks
              : [],
            shopping: Array.isArray(data.salesIntelligence?.locationAdvantages?.shopping)
              ? data.salesIntelligence.locationAdvantages.shopping
              : [],
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

      // Step 10: Test render the component to catch any immediate errors
      let testRenderError = null;
      try {
        // Try a basic render test
        const TestWrapper = () => (
          <BrochureLayout 
            data={safeData} 
            design={extractedDesign}
            getImg={getImg}
          />
        );
        // If this doesn't throw, we're good
        TestWrapper;
      } catch (testError: any) {
        console.warn("⚠️ Component test render detected potential issue:", testError);
        testRenderError = testError;
        // Don't throw yet - let ErrorBoundary handle it
      }

      // Step 11: Create wrapper with Error Boundary
      const ComponentWrapper = () => (
        <ErrorBoundary>
          <BrochureLayout 
            data={safeData} 
            design={extractedDesign}
            getImg={getImg}
          />
        </ErrorBoundary>
      );

      setRenderedComponent(() => ComponentWrapper);
      setError(null);
      
      if (testRenderError) {
        console.warn("⚠️ Component may have rendering issues. Error Boundary will catch them.");
      }
      
    } catch (err: any) {
      console.error("❌ Error compiling layout code:", err);
      console.error("Error stack:", err.stack);
      
      // Provide user-friendly error messages
      let userMessage = "Failed to compile the AI-generated layout. ";
      
      if (err.message.includes('Babel')) {
        userMessage += "The AI generated invalid TypeScript syntax. ";
      } else if (err.message.includes('not found')) {
        userMessage += "The AI didn't generate the required components. ";
      } else if (err.message.includes('execution failed')) {
        userMessage += "The AI generated code that won't run. ";
      } else if (err.message.includes('not a function')) {
        userMessage += "The AI generated an invalid component structure. ";
      } else {
        userMessage += err.message + " ";
      }
      
      userMessage += "Try regenerating to get better code from the AI.";
      
      setError(userMessage);
      setRenderedComponent(null);
    }
  }, [layoutCode, data]);

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto my-10 p-8 bg-red-50 border-2 border-red-200 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-red-900 text-lg mb-2">Layout Compilation Error</h3>
            <p className="text-red-700 text-sm mb-4">
              The AI-generated layout code encountered an error. This can happen occasionally.
            </p>
            <div className="bg-red-100 p-4 rounded font-mono text-xs text-red-800 overflow-auto max-h-40">
              {error}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Try Generating Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!RenderedComponent) {
    return (
      <div className="w-full max-w-4xl mx-auto my-10 p-8 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="font-bold text-blue-900 text-lg">Compiling Layout...</h3>
            <p className="text-blue-700 text-sm">Processing AI-generated brochure design</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="brochure-root">
      {/* Info Banner */}
      {data.images.length > 0 ? (
        <div className="no-print w-full max-w-4xl mx-auto mb-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xl">✓</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-emerald-900 text-sm">Dynamic Layout Generated</h4>
              <p className="text-emerald-700 text-xs">
                Unique design created with {data.images.length} uploaded image{data.images.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-print w-full max-w-4xl mx-auto mb-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⚠</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-900 text-sm">Using Placeholder Images</h4>
              <p className="text-yellow-700 text-xs">
                No images uploaded. Go back to Step 4 to add property images.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Design Info (Development Only) */}
      {design && process.env.NODE_ENV === 'development' && (
        <div className="no-print w-full max-w-4xl mx-auto mb-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <details className="cursor-pointer">
            <summary className="font-semibold text-gray-700 text-sm">Design System (Dev Info)</summary>
            <div className="mt-2 text-xs text-gray-600 space-y-1">
              <p><strong>Colors:</strong> {design.primaryColor} / {design.secondaryColor} / {design.accentColor}</p>
              <p><strong>Fonts:</strong> {design.headingFont} / {design.bodyFont}</p>
              <p><strong>Tagline:</strong> {design.copy?.aiTagline}</p>
            </div>
          </details>
        </div>
      )}

      {/* Render the dynamic component */}
      <RenderedComponent />
    </div>
  );
};

export default DynamicBrochurePreview;