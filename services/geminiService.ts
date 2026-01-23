
import { GoogleGenAI, Type } from "@google/genai";
import { PropertyData } from "../types";

// Access Vite environment variable correctly
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("⚠️ API_KEY not found! Please add VITE_API_KEY to your .env.local file");
}

const ai = new GoogleGenAI({ apiKey });

export const generateBrochureArchitecturalDesign = async (data: PropertyData) => {
  console.log("🚀 Starting Gemini generation...");
  console.log("📝 Property Title:", data.title);
  
  if (!apiKey) {
    console.error("❌ Cannot generate: API key is missing");
    alert("API Key is missing! Please add VITE_API_KEY=your_key to .env.local file");
    return null;
  }

  const prompt = `
    Act as a senior real estate marketing designer. 
    Task: Architect a COMPLETELY NEW and UNIQUE brochure design system for: "${data.title}".
    Theme Choice: ${data.selectedTheme || 'Luxury'}
    Usage Intent: ${data.usageIntent}

    Property Brief:
    - Type: ${data.propertyType}
    - Status: ${data.projectStatus}
    - Configs: ${data.configuration.join(", ")}
    - Price: ${data.priceDetails.startingPrice}
    - Location: ${data.location}
    - Developer: ${data.branding.developerName}
    
    Target Audience: ${data.salesIntelligence.targetBuyer.join(", ")}
    
    Key Selling Points:
    ${data.salesIntelligence.keySellingPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}
    
    Location Advantages:
    - Nearby: ${data.salesIntelligence.locationAdvantages.nearbyLandmarks.join(", ") || "Prime location"}
    ${data.salesIntelligence.locationAdvantages.metroDistance ? `- Metro: ${data.salesIntelligence.locationAdvantages.metroDistance}` : ''}
    ${data.salesIntelligence.locationAdvantages.connectivity ? `- Connectivity: ${data.salesIntelligence.locationAdvantages.connectivity}` : ''}
    
    Amenities & Features:
    - Project: ${data.amenities.projectAmenities.slice(0, 5).join(", ") || "Modern amenities"}
    - Apartment: ${data.amenities.apartmentFeatures.slice(0, 5).join(", ") || "Premium features"}
    ${data.amenities.sustainability.length > 0 ? `- Sustainability: ${data.amenities.sustainability.slice(0, 3).join(", ")}` : ''}
    
    ${data.salesIntelligence.uniqueFeatures ? `Special Features: ${data.salesIntelligence.uniqueFeatures}` : ''}

    EVERY GENERATION MUST BE DIFFERENT. Choose a different architectural strategy each time.

    INSTRUCTIONS:
    1. Visual Identity:
       - 4 Hex colors (primary, secondary, accent, bg).
       - Typography: Pick a unique pair (Select from: 'Playfair Display', 'Montserrat', 'Inter', 'Libre Baskerville', 'Cormorant Garamond', 'Syncopate', 'Bodoni Moda').
    2. Page Layout Blueprint (CRITICAL FOR VARIETY):
       - 'cover': Choose one of ['classic-full', 'modern-split', 'minimalist-center']
       - 'ethos': Choose one of ['magazine-text', 'visual-heavy', 'clean-grid']
       - 'amenities': Choose one of ['dark-gallery', 'light-list', 'iconic-grid']
       - 'location': Choose one of ['map-focus', 'text-focus', 'split-view']
       - 'specs': Choose one of ['tabular', 'artistic-blocks', 'minimal-labels']
    3. Marketing Copy (Use the provided data to inform your creative writing):
       - aiTagline: Create a compelling headline that reflects the key selling points
       - aiNarrative: Write a 3-sentence evocative story about the lifestyle this property offers
       - aiLocationHook: Craft a persuasive paragraph about the location advantages and connectivity

    Return ONLY JSON.
  `;

  try {
    console.log("📡 Sending request to Gemini API...");
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            design: {
              type: Type.OBJECT,
              properties: {
                primaryColor: { type: Type.STRING },
                secondaryColor: { type: Type.STRING },
                accentColor: { type: Type.STRING },
                backgroundColor: { type: Type.STRING },
                headingFont: { type: Type.STRING },
                bodyFont: { type: Type.STRING },
                layoutVariant: { type: Type.STRING },
                pageLayouts: {
                  type: Type.OBJECT,
                  properties: {
                    cover: { type: Type.STRING },
                    ethos: { type: Type.STRING },
                    amenities: { type: Type.STRING },
                    location: { type: Type.STRING },
                    specs: { type: Type.STRING }
                  },
                  required: ["cover", "ethos", "amenities", "location", "specs"]
                },
                copy: {
                  type: Type.OBJECT,
                  properties: {
                    aiTagline: { type: Type.STRING },
                    aiNarrative: { type: Type.STRING },
                    aiLocationHook: { type: Type.STRING }
                  },
                  required: ["aiTagline", "aiNarrative", "aiLocationHook"]
                }
              },
              required: ["primaryColor", "secondaryColor", "accentColor", "backgroundColor", "headingFont", "bodyFont", "pageLayouts", "copy"]
            }
          },
          required: ["design"]
        }
      }
    });

    console.log("✅ Received response from Gemini");
    console.log("📄 Response text:", response.text?.substring(0, 200) + "...");

    const parsed = JSON.parse(response.text || "{}");
    
    if (!parsed.design) {
      console.error("❌ No design in response:", parsed);
      throw new Error("Invalid response format from Gemini");
    }

    console.log("🎨 Design generated successfully!");
    return parsed.design;
    
  } catch (error: any) {
    console.error("❌ AI Blueprint Generation Failed");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    // Show user-friendly error
    alert(`Generation failed: ${error.message || 'Unknown error'}. Please check console for details.`);
    
    return null;
  }
};
