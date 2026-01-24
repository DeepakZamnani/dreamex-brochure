# Dynamic Brochure Layout Generation System

## Overview

This system transforms the DreamExProp brochure generator from using fixed templates to generating **completely unique React/TSX layouts** for each brochure using AI (Gemini).

## Key Changes

### Before (Static Templates)
- Gemini generated only design parameters (colors, fonts, layout variants)
- All brochures used the same React component with conditional rendering
- Layout variations were limited to predefined options
- Example: `cover: 'classic-full'`, `ethos: 'magazine-text'`

### After (Dynamic Layouts)
- Gemini generates **complete React/TSX component code**
- Each brochure gets a unique layout structure
- Unlimited creative possibilities
- Runtime code compilation and rendering

## Architecture

```
User Input → Gemini AI → TSX Code → Babel Compilation → React Rendering → Unique Brochure
```

### Flow Diagram

```
┌─────────────────────┐
│   User Fills Form   │
│  (Property Data)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Click Generate     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│  geminiLayoutService.ts                     │
│  - Sends property data + reference template │
│  - Gemini generates complete TSX code       │
│  - Returns: { code: string, timestamp }     │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│  App.tsx                                     │
│  - Stores layout code in data.dynamicLayout │
│  - Switches to PREVIEW state                │
└──────────┬──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────┐
│  DynamicBrochurePreview.tsx                 │
│  - Receives layout code                     │
│  - Compiles with Babel                      │
│  - Extracts BrochureLayout component        │
│  - Renders dynamically                      │
└─────────────────────────────────────────────┘
```

## File Structure

```
dreamex-brochure/
├── services/
│   ├── geminiService.ts (OLD - kept for reference)
│   └── geminiLayoutService.ts (NEW - generates TSX code)
├── components/
│   ├── BrochurePreview.tsx (OLD - static template)
│   └── DynamicBrochurePreview.tsx (NEW - dynamic renderer)
├── types.ts (updated with DynamicLayoutResult)
└── App.tsx (updated to use dynamic system)
```

## Key Components

### 1. geminiLayoutService.ts

**Purpose**: Communicates with Gemini to generate complete TSX layout code

**Key Functions**:
- `generateDynamicBrochureLayout(data: PropertyData)`
  - Constructs detailed prompt with property data
  - Includes reference template for structure guidance
  - Requests complete React component code
  - Returns `{ code: string, timestamp: number }`

**Prompt Strategy**:
- Provides property data in JSON format
- Shows reference template structure
- Emphasizes uniqueness requirements
- Specifies exact code structure needed
- Requests design system + component in one output

### 2. DynamicBrochurePreview.tsx

**Purpose**: Compiles and renders AI-generated layout code at runtime

**Key Features**:
- **Runtime Compilation**: Uses Babel to transform TSX to JavaScript
- **Safe Execution**: Creates isolated execution context
- **Component Extraction**: Pulls out `BrochureLayout` and `design` exports
- **Error Handling**: Catches compilation errors with helpful messages
- **Image Integration**: Provides `getImg()` function to access uploaded images

**Process**:
1. Receives layout code as string
2. Transforms with Babel (React + TypeScript presets)
3. Executes in isolated context
4. Extracts exports (design object, BrochureLayout component)
5. Wraps component with necessary props (data, design, getImg)
6. Renders to DOM

### 3. Updated App.tsx

**Changes**:
- Imports `generateDynamicBrochureLayout` instead of old service
- Imports `DynamicBrochurePreview` component
- `handleGenerate()` now calls dynamic layout service
- Stores result in `data.dynamicLayout`
- Conditionally renders `DynamicBrochurePreview`

### 4. Updated types.ts

**New Type**:
```typescript
export interface DynamicLayoutResult {
  code: string;           // Complete TSX code
  timestamp: number;      // Generation timestamp
}
```

**Added to PropertyData**:
```typescript
export interface PropertyData {
  // ... existing fields
  dynamicLayout?: DynamicLayoutResult;
}
```

## Expected Output Format from Gemini

```typescript
import React from 'react';

interface PageProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Page: React.FC<PageProps> = ({ children, className = "", style = {} }) => (
  <div className="page" style={{ width: '794px', height: '1123px', ...style }} className={`${className}`}>
    {children}
  </div>
);

export const design = {
  primaryColor: "#1A202C",
  secondaryColor: "#F7FAFC",
  accentColor: "#D69E2E",
  backgroundColor: "#FFFFFF",
  headingFont: "Playfair Display",
  bodyFont: "Inter",
  copy: {
    aiTagline: "Luxury Redefined by the Sea",
    aiNarrative: "Experience unparalleled coastal living...",
    aiLocationHook: "Strategically positioned in the heart..."
  }
};

export const BrochureLayout = ({ data, design, getImg }) => {
  return (
    <div className="flex flex-col items-center bg-gray-300 py-10">
      {/* 6 unique pages with different layouts */}
      <Page>...</Page>
      <Page>...</Page>
      {/* ... */}
    </div>
  );
};
```

## Dependencies

### New Dependencies
- `@babel/standalone@^7.26.5` - Runtime TypeScript/JSX compilation

### Existing Dependencies
- `@google/genai` - Gemini AI integration
- `react` - Component rendering
- `tailwindcss` (via Vite) - Styling

## Usage

### For Developers

1. **Install Dependencies**:
```bash
npm install
```

2. **Set API Key**:
```bash
# Create .env.local file
VITE_API_KEY=your_gemini_api_key_here
```

3. **Run Dev Server**:
```bash
npm run dev
```

### For Users

1. Fill in property details through the 5-step wizard
2. Click "Generate Brochure"
3. AI creates a unique layout based on your data
4. View the generated brochure
5. Print or download as PDF

## Advantages

### 1. **Unlimited Creativity**
- Each brochure can have completely different layout structure
- Not limited to predefined template variations
- AI can experiment with asymmetric grids, circular elements, diagonal splits, etc.

### 2. **True Personalization**
- Layout adapts to the specific property type and selling points
- Luxury properties get different layouts than affordable housing
- Beachfront properties can have unique ocean-themed layouts

### 3. **Scalability**
- No need to maintain multiple template files
- Easy to add new layout styles - just update the prompt
- AI learns from feedback over time

### 4. **Maintainability**
- Single layout generation service
- Clear separation of concerns
- Easy to debug with error messages

## Testing Strategy

### Unit Tests
- Test Babel compilation with sample code
- Test component extraction logic
- Test error handling for malformed code

### Integration Tests
- Test full generation flow with mock Gemini responses
- Test with various property types
- Test image integration

### Visual Regression Tests
- Compare generated layouts across multiple runs
- Ensure layout variety
- Check design quality

## Potential Issues & Solutions

### Issue 1: Gemini Returns Invalid Code
**Solution**: 
- Validate code structure before compilation
- Retry with modified prompt
- Fall back to static template if multiple failures

### Issue 2: Code Compilation Fails
**Solution**:
- Show user-friendly error message
- Log detailed error for debugging
- Offer "Try Again" button

### Issue 3: Performance Concerns
**Solution**:
- Cache compiled components
- Use React.memo for optimization
- Consider web workers for compilation

### Issue 4: Inconsistent Design Quality
**Solution**:
- Refine prompt with design principles
- Add quality checks before rendering
- Implement rating system for layouts

## Future Enhancements

### 1. **Layout Library**
- Save successful layouts
- Allow users to browse and select from previous layouts
- Rate layouts for quality feedback

### 2. **A/B Testing**
- Generate multiple layout options
- Let user choose preferred design
- Track which layouts perform best

### 3. **Template Refinement**
- Allow users to request changes to specific pages
- Iterative refinement with AI
- Save customized versions

### 4. **Export Options**
- Export layout code for manual editing
- Version control for layouts
- Share layouts with team

### 5. **Advanced Styling**
- Support custom CSS animations
- Advanced typography options
- Integration with design systems

## Configuration

### Gemini Settings
```typescript
config: {
  temperature: 1.2,  // High creativity for variety
  topP: 0.95,
  topK: 40,
}
```

### Babel Settings
```typescript
presets: ['react', 'typescript']
```

### A4 Page Dimensions
```typescript
width: '794px'  // 210mm
height: '1123px' // 297mm
```

## Troubleshooting

### Problem: "Layout Compilation Error"
**Diagnosis**: Generated code has syntax errors
**Fix**: Check console for detailed error, regenerate

### Problem: "No layout generated yet"
**Diagnosis**: API call failed or returned empty
**Fix**: Check API key, network connection, try again

### Problem: Images not showing
**Diagnosis**: Image labels not matching
**Fix**: Verify uploaded images have correct labels

### Problem: Styles not applying
**Diagnosis**: Tailwind classes not available
**Fix**: Use inline styles for colors/fonts from design object

## API Reference

### generateDynamicBrochureLayout
```typescript
async function generateDynamicBrochureLayout(
  data: PropertyData
): Promise<DynamicLayoutResult | null>
```

**Parameters**:
- `data`: Complete property information

**Returns**:
- `DynamicLayoutResult` with code and timestamp, or `null` on failure

**Example**:
```typescript
const result = await generateDynamicBrochureLayout(propertyData);
if (result) {
  console.log("Generated code:", result.code);
  console.log("Timestamp:", result.timestamp);
}
```

### DynamicBrochurePreview Component
```typescript
interface DynamicBrochurePreviewProps {
  data: PropertyData;
  layoutCode: string;
}
```

**Props**:
- `data`: Property data for rendering
- `layoutCode`: TSX code string from Gemini

**Example**:
```typescript
<DynamicBrochurePreview 
  data={propertyData} 
  layoutCode={layoutResult.code} 
/>
```

## Best Practices

1. **Always validate Gemini output** before compilation
2. **Cache compiled components** for performance
3. **Provide fallback UI** for error states
4. **Log generation metrics** for monitoring
5. **Test with various property types** regularly
6. **Keep reference template updated** with best practices
7. **Monitor API usage** to manage costs

## Conclusion

This dynamic layout generation system represents a major evolution in brochure creation, moving from static templates to AI-powered, fully customizable layouts. Each brochure is now truly unique, personalized, and professionally designed based on the specific property's characteristics and target audience.
