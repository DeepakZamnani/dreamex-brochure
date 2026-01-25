// import { GoogleGenAI } from "@google/genai";
// import { PropertyData } from "../types";

// const apiKey = process.env.GEMINI_API_KEY;

// if (!apiKey) {
//   console.error("⚠️ API_KEY not found! Please add VITE_API_KEY to your .env.local file");
// }

// const ai = new GoogleGenAI({ apiKey });

// // Reference template to show Gemini the expected output format
// const REFERENCE_TEMPLATE = `
// // REFERENCE EXAMPLE - This shows the structure you should follow
// // Generate NEW and UNIQUE layouts inspired by this format
// // DO NOT INCLUDE: import React from 'react';
// // React is already available in the execution context

// interface PageProps {
//   children: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties;
// }

// const Page: React.FC<PageProps> = ({ children, className = "", style = {} }) => (
//   <div className="page" style={{ width: '794px', height: '1123px', ...style }} className={\`\${className}\`}>
//     {children}
//   </div>
// );

// export const BrochureLayout = ({ data, design, getImg }) => {
//   const headingStyle = {
//     fontFamily: design.headingFont + ', serif',
//     color: design.primaryColor,
//   };

//   const bodyStyle = {
//     fontFamily: design.bodyFont + ', sans-serif',
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-300 py-10">
      
//       {/* PAGE 1: Cover */}
//       <Page className="relative flex flex-col justify-end text-white overflow-hidden" style={{ backgroundColor: design.primaryColor }}>
//         <div className="absolute inset-0">
//           <img src={getImg('elevation')} className="w-full h-full object-cover" alt="Cover" />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
//         <div className="relative z-10 p-20 pb-24">
//           <h1 className="text-8xl font-light mb-8" style={headingStyle}>{data.title}</h1>
//           <p className="text-2xl italic" style={{ color: design.accentColor }}>{design.copy.aiTagline}</p>
//         </div>
//       </Page>

//       {/* PAGE 2: Narrative */}
//       <Page className="flex" style={{ backgroundColor: design.backgroundColor }}>
//         <div className="w-1/2 p-20 flex flex-col justify-center">
//           <h2 className="text-5xl mb-8" style={headingStyle}>The Vision</h2>
//           <p className="text-lg leading-relaxed text-gray-600">{design.copy.aiNarrative}</p>
//         </div>
//         <div className="w-1/2">
//           <img src={getImg('living_room')} className="w-full h-full object-cover" />
//         </div>
//       </Page>

//       {/* Add more unique pages... */}
      
//     </div>
//   );
// };
// `;

// export const generateDynamicBrochureLayout = async (data: PropertyData) => {
//   console.log("🚀 Starting Dynamic Layout Generation...");
//   console.log("📝 Property Title:", data.title);
  
//   if (!apiKey) {
//     console.error("❌ Cannot generate: API key is missing");
//     alert("API Key is missing! Please add VITE_API_KEY=your_key to .env.local file");
//     return null;
//   }

//   const prompt = `
// You are an elite real estate brochure designer and React/TypeScript expert. Your task is to create a STUNNING, PROFESSIONAL, MUSEUM-QUALITY brochure that will make buyers fall in love with the property.

// PROPERTY: "${data.title}"
// TYPE: ${data.propertyType} | STATUS: ${data.projectStatus}
// LOCATION: ${data.location}
// TARGET BUYERS: ${data.salesIntelligence.targetBuyer.join(", ")}

// FULL PROPERTY DATA:
// ${JSON.stringify({
//   title: data.title,
//   propertyType: data.propertyType,
//   projectStatus: data.projectStatus,
//   configuration: data.configuration,
//   location: data.location,
//   priceDetails: data.priceDetails,
//   developer: data.branding.developerName,
//   targetBuyer: data.salesIntelligence.targetBuyer,
//   keySellingPoints: data.salesIntelligence.keySellingPoints,
//   locationAdvantages: data.salesIntelligence.locationAdvantages,
//   amenities: data.amenities,
//   agent: data.agent,
//   theme: data.selectedTheme || 'Luxury'
// }, null, 2)}

// REFERENCE CODE STRUCTURE (NO IMPORTS):
// ${REFERENCE_TEMPLATE}

// ===========================================
// CRITICAL DESIGN REQUIREMENTS
// ===========================================

// 1. **DESIGN SYSTEM** - Create a cohesive visual identity:
//    - 4 sophisticated hex colors that complement each other
//    - 2 elegant font pairings (heading + body)
//    - Generate compelling marketing copy:
//      * aiTagline: 5-8 word powerful headline
//      * aiNarrative: 3 evocative sentences about the lifestyle
//      * aiLocationHook: Persuasive paragraph on location benefits

// 2. **PAGE-BY-PAGE LAYOUT SPECIFICATIONS** (794px × 1123px each):

//    📄 PAGE 1 - HERO COVER (Make it BREATHTAKING):
//    - FULL BLEED hero image using getImg('elevation') or getImg('exterior')
//    - Dramatic gradient overlay (top-to-bottom or radial)
//    - Property title: HUGE (text-7xl to text-9xl), bold, positioned creatively
//    - Tagline: Elegant, contrasting accent color
//    - Optional: Subtle geometric shapes, diagonal elements, or decorative lines
//    - Mood: Luxury, aspiration, desire
//    - AVOID: Centered layouts, basic overlays - be CREATIVE!

//    📄 PAGE 2 - THE STORY (Emotional Connection):
//    - Split layout: 50/50 or 60/40 ratio
//    - Left: AI narrative text + configurations in elegant grid
//    - Right: Stunning interior image getImg('living_room')
//    - Typography: Large, readable, luxurious spacing
//    - Include: Price starting from, project status badge
//    - Mood: Sophisticated storytelling
//    - Design elements: Fine lines, subtle backgrounds, premium feel

//    📄 PAGE 3 - KEY SELLING POINTS (Visual Impact):
//    - Showcase 3-5 keySellingPoints dramatically
//    - Use: Large numbers (01, 02, 03), icon-like treatment, or bold typography
//    - Background: Large feature image getImg('bedroom') with overlay
//    - Layout: Asymmetric, modern, magazine-style
//    - Include visual hierarchy: Most important point = largest
//    - Mood: Confidence, exclusivity, premium quality

//    📄 PAGE 4 - AMENITIES SHOWCASE (Lifestyle Vision):
//    - Grid layout: 3x4 or 4x4 cards/tiles
//    - Display: projectAmenities + apartmentFeatures (max 12-16 items)
//    - Each tile: Icon or decorative element + amenity name
//    - Styling: Hover effects, borders, shadows, modern cards
//    - Background: Subtle pattern or amenity image getImg('amenities') with low opacity
//    - Typography: Clean, uppercase for impact
//    - Mood: Modern, upscale, comprehensive

//    📄 PAGE 5 - LOCATION & CONNECTIVITY (Strategic Value):
//    - Two-column layout
//    - Left column: AI location hook + nearby landmarks list with distances
//    - Right column: Map image getImg('location_map') or illustrative design
//    - Show: Schools, hospitals, metro, shopping - with icons or bullets
//    - Include connectivity info prominently
//    - Mood: Practical luxury, smart investment

//    📄 PAGE 6 - CONTACT & CLOSE (Professional Finish):
//    - Top: Developer branding (name in large serif font)
//    - Middle: Agent details in elegant card/box
//    - Bottom: RERA number, disclaimer, website
//    - Layout: Centered, balanced, clean
//    - Use: Plenty of white space, refined typography
//    - Mood: Trust, professionalism, legacy

// 3. **STYLING EXCELLENCE**:
//    - Use sophisticated Tailwind classes: backdrop-blur, mix-blend-mode, gradient-to-br
//    - Add depth: shadows (shadow-2xl), overlays (bg-black/30), borders (border-opacity)
//    - Typography: Varied sizes (text-xs to text-9xl), letter-spacing, line-height
//    - Spacing: Generous padding (p-12, p-20), consistent margins
//    - Colors: Use design.primaryColor, accentColor creatively - not just backgrounds

// 4. **DEFENSIVE CODING** (CRITICAL):
//    - ALWAYS use: (data.amenities?.projectAmenities || []).map(...)
//    - ALWAYS use: data.title || 'Property Name'
//    - ALWAYS use: data.salesIntelligence?.keySellingPoints?.slice(0, 3) || []
//    - NEVER assume arrays exist without || []
//    - ALWAYS use optional chaining ?.

// 5. **IMAGE USAGE**:
//    - getImg('elevation') - for hero/cover
//    - getImg('living_room') - for lifestyle/interior shots
//    - getImg('bedroom') - for feature highlights
//    - getImg('amenities') - for amenities page background
//    - getImg('location_map') - for location page

// ===========================================
// CODE REQUIREMENTS
// ===========================================

// - NO import statements (React is available)
// - Export: design object + BrochureLayout component
// - Use: const Page component for 794x1123px pages
// - Safe data access: Always use || [] and ?.
// - Clean, readable code with comments for each page

// GENERATE STUNNING, PRODUCTION-READY CODE NOW:
// `;

//   try {
//     console.log("📡 Sending request to Gemini API for dynamic layout...");
    
//     const response = await ai.models.generateContent({
//       model: "gemini-3-pro-preview", // Use the most advanced model
//       contents: prompt,
//       config: {
//         temperature: 1.1, // High creativity while maintaining quality
//         topP: 0.95,
//         topK: 64,
//         maxOutputTokens: 8192,
//       }
//     });

//     console.log("✅ Received response from Gemini");
    
//     // Get the text response
//     let code = "";
//     if (response.text) {
//       code = response.text;
//     } else if (response.candidates && response.candidates[0]) {
//       code = response.candidates[0].content?.parts?.[0]?.text || "";
//     }
    
//     console.log("📏 Raw response length:", code.length, "characters");
    
//     if (!code || code.length < 500) {
//       console.error("❌ Generated code is too short or empty");
//       console.error("Response object:", JSON.stringify(response, null, 2).substring(0, 1000));
//       throw new Error("Invalid code generated by Gemini - response too short");
//     }

//     // Clean up the code (remove markdown fences if present)
//     let cleanCode = code.trim();
//     if (cleanCode.startsWith('```')) {
//       cleanCode = cleanCode.replace(/^```(?:typescript|tsx|javascript|jsx)?\n/i, '');
//       cleanCode = cleanCode.replace(/\n```$/, '');
//       cleanCode = cleanCode.trim();
//     }

//     console.log("🎨 Dynamic layout generated successfully!");
//     console.log("📏 Clean code length:", cleanCode.length, "characters");
    
//     // Log first 200 chars for debugging
//     console.log("📝 Code preview:", cleanCode.substring(0, 200) + "...");
    
//     return {
//       code: cleanCode,
//       timestamp: Date.now()
//     };
    
//   } catch (error: any) {
//     console.error("❌ Dynamic Layout Generation Failed");
//     console.error("Error details:", error);
//     console.error("Error message:", error.message);
    
//     if (error.message?.includes('too short')) {
//       alert(`Layout generation failed: Gemini returned incomplete code. Please try again.`);
//     } else {
//       alert(`Layout generation failed: ${error.message || 'Unknown error'}. Please check console for details.`);
//     }
    
//     return null;
//   }
// };
import { GoogleGenAI } from "@google/genai";
import { PropertyData } from "../types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("⚠️ API_KEY not found! Please add VITE_API_KEY to your environment variables");
}

const ai = new GoogleGenAI({ apiKey });

export const generateDynamicBrochureLayout = async (data: PropertyData) => {
  console.log("🚀 Starting Dynamic Layout Generation...");
  console.log("📝 Property Title:", data.title);
  
  if (!apiKey) {
    console.error("❌ Cannot generate: API key is missing");
    alert("API Key is missing!");
    return null;
  }

  const prompt = `You are an elite real estate brochure designer. Create a COMPLETELY ORIGINAL 6-page A4 brochure.

PROPERTY: "${data.title}"
TYPE: ${data.propertyType} | STATUS: ${data.projectStatus}
LOCATION: ${data.location}
PRICE: ${data.priceDetails.startingPrice}
CONFIGS: ${data.configuration.join(", ")}
BUYERS: ${data.salesIntelligence.targetBuyer.join(", ")}

KEY POINTS (USE ALL):
${data.salesIntelligence.keySellingPoints.map((p, i) => `${i+1}. ${p}`).join('\n')}

AMENITIES (USE ALL):
Project: ${data.amenities.projectAmenities.join(", ")}
Apartment: ${data.amenities.apartmentFeatures.join(", ")}
Green: ${data.amenities.sustainability.join(", ")}

LOCATION (USE ALL):
${data.salesIntelligence.locationAdvantages.nearbyLandmarks.join(", ")}

DEVELOPER: ${data.branding.developerName}
AGENT: ${data.agent.name} | ${data.agent.phone} | ${data.agent.email}

REQUIREMENTS:
1. Design 6 pages (794px x 1123px each)
2. NO import statements - React available
3. Use ALL data provided above
4. Return TypeScript code with: export const design = {...}; export const BrochureLayout = ({data, design, getImg}) => {...};
5. Be COMPLETELY creative - magazine style, luxury catalog, modern editorial
6. Use getImg('elevation'), getImg('living_room'), getImg('bedroom'), getImg('amenities'), getImg('location_map')
7. Safe data access: (data.amenities?.projectAmenities || []).map(...)
8. Create unique color palette matching property type
9. Choose fonts from: Playfair Display, Montserrat, Inter, Libre Baskerville, Cormorant Garamond
10. Write aiTagline, aiNarrative, aiLocationHook

CODE STRUCTURE:
const Page = ({children, className, style}) => <div className={"page " + (className || "")} style={{width: '794px', height: '1123px', ...style}}>{children}</div>;

export const design = {primaryColor, secondaryColor, accentColor, backgroundColor, headingFont, bodyFont, copy: {aiTagline, aiNarrative, aiLocationHook}};

export const BrochureLayout = ({data, design, getImg}) => <div className="flex flex-col items-center bg-gray-300 py-10">{/* 6 Pages */}</div>;

Generate stunning, original code NOW:`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        temperature: 1.3,
        topP: 0.98,
        topK: 64,
        maxOutputTokens: 8192,
      }
    });

    let code = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (!code || code.length < 500) {
      throw new Error("Generated code too short");
    }

    code = code.trim().replace(/^```(?:typescript|tsx|javascript|jsx)?\n/i, '').replace(/\n```$/, '').trim();

    console.log("🎨 Layout generated!", code.length, "chars");
    
    return { code, timestamp: Date.now() };
    
  } catch (error: any) {
    console.error("❌ Generation failed:", error);
    alert(`Generation failed: ${error.message}`);
    return null;
  }
};