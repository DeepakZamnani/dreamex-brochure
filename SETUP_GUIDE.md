# Quick Setup Guide - Dynamic Layout System

## Step 1: Install Dependencies

```bash
cd dreamex-brochure
npm install
```

This will install the new `@babel/standalone` dependency needed for runtime code compilation.

## Step 2: Configure Environment

Make sure your `.env.local` file has the Gemini API key:

```env
VITE_API_KEY=your_gemini_api_key_here
```

**Important**: The key MUST be prefixed with `VITE_` for Vite to expose it to the client.

## Step 3: Test the System

### Option A: Use Dummy Data (Quick Test)
```bash
npm run dev
```
1. Open http://localhost:5173
2. Click "Create New Brochure"
3. Click "Load Dummy Data" at the bottom of the form
4. Click "Generate My Brochure"
5. Wait ~10-30 seconds for AI generation
6. View your unique brochure!

### Option B: Enter Real Data
1. Fill in all 5 steps of the wizard:
   - Step 1: Property Details (title, location, type, etc.)
   - Step 2: Description & USPs (selling points, target buyers)
   - Step 3: Features & Amenities (project amenities, apartment features)
   - Step 4: Visuals (upload images with labels)
   - Step 5: Contact & Branding (agent info, developer details)
2. Click "Generate My Brochure"
3. Wait for generation
4. View result

## Step 4: Generate Multiple Brochures

To see the variety in layouts:

1. Generate a brochure
2. Click "← Back to Edit"
3. Change some data (e.g., property title or theme)
4. Click "Generate My Brochure" again
5. Compare the layouts - they should be completely different!

## Key Files Modified

### New Files
- `/services/geminiLayoutService.ts` - AI layout code generator
- `/components/DynamicBrochurePreview.tsx` - Dynamic code renderer
- `/DYNAMIC_LAYOUT_SYSTEM.md` - Full documentation

### Updated Files
- `/App.tsx` - Uses new generation service
- `/types.ts` - Added DynamicLayoutResult interface
- `/package.json` - Added @babel/standalone dependency

### Preserved Files (for reference)
- `/services/geminiService.ts` - OLD static template system
- `/components/BrochurePreview.tsx` - OLD static component

## How It Works (Simple Explanation)

### Before:
1. User fills form
2. Gemini chooses: `cover: 'modern-split'`, `ethos: 'magazine-text'`
3. Static React component renders using these choices
4. Result: Predictable layout variations

### Now:
1. User fills form
2. Gemini writes complete React/TSX code for brochure
3. Browser compiles this code in real-time using Babel
4. Unique component renders with custom layout
5. Result: Completely different layout each time

## Troubleshooting

### Issue: "API Key missing" error
**Fix**: Create `.env.local` file with `VITE_API_KEY=your_key`

### Issue: "Layout Compilation Error"
**Fix**: Click "Try Generating Again" - occasionally Gemini returns malformed code

### Issue: Module not found errors
**Fix**: Run `npm install` again to ensure all dependencies are installed

### Issue: Slow generation
**Fix**: Normal! AI code generation takes 10-30 seconds. Be patient.

### Issue: Images not showing
**Fix**: Make sure you uploaded images in Step 4 with appropriate labels

## Verification Checklist

- [ ] Dependencies installed (`node_modules/@babel/standalone` exists)
- [ ] `.env.local` file created with API key
- [ ] Dev server running without errors
- [ ] Dummy data loads successfully
- [ ] Brochure generates (even if slow)
- [ ] Multiple generations produce different layouts
- [ ] Images display correctly when uploaded
- [ ] Print/Download button works

## Next Steps

1. **Test with various property types** (apartment, villa, commercial)
2. **Try different themes** (Luxury, Minimal, Editorial)
3. **Upload real property images** for better results
4. **Compare layout variations** across multiple generations
5. **Share feedback** on design quality and variety

## Advanced: Customizing the AI Prompt

If you want to influence the layout style, edit `/services/geminiLayoutService.ts`:

```typescript
const prompt = `
  // Add specific instructions here, e.g.:
  // - "Create a layout with more emphasis on images"
  // - "Use minimalist design principles"
  // - "Include more white space"
  ...
`;
```

## Performance Notes

- **First generation**: ~15-30 seconds (Gemini API call)
- **Code compilation**: ~1-2 seconds (Babel transformation)
- **Subsequent renders**: Instant (React rendering)

## Support

If you encounter issues:

1. Check console for detailed error messages
2. Verify API key is correct
3. Ensure internet connection is stable
4. Try regenerating 2-3 times (AI can be inconsistent)
5. Review `/DYNAMIC_LAYOUT_SYSTEM.md` for detailed architecture

## What to Expect

### Successful Generation:
- Loading spinner for 10-30 seconds
- Green success banner with image count
- 6-page A4 brochure with unique layout
- Professional design with integrated property data

### Each Page Should Include:
1. **Cover**: Property title + tagline + hero image
2. **Narrative**: Story + configurations + lifestyle image
3. **USPs**: Key selling points + feature highlights
4. **Amenities**: Project amenities in creative grid
5. **Location**: Connectivity + nearby landmarks + map
6. **Contact**: Developer info + agent details + disclaimer

## Developer Notes

### Code Structure:
```
Property Data → Gemini Prompt → TSX Code String → Babel Compiler 
→ JavaScript → React Component → DOM Rendering
```

### Why Babel Standalone?
- Converts TSX to JavaScript in the browser
- No build step required for dynamic code
- Same transformation as development build
- ~200KB additional bundle size

### Security Considerations:
- Code execution is isolated
- No access to sensitive data
- Read-only property data
- No server-side execution

Enjoy creating unique, AI-powered brochures! 🎨✨
