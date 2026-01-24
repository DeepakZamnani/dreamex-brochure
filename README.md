# DreamExProp - Dynamic Brochure Generator

> AI-Powered Real Estate Brochures with Unique Layouts Every Time

## 🎯 What This Is

DreamExProp generates **completely unique, professionally-designed property brochures** using AI. Unlike traditional template-based systems, each brochure gets a custom-coded layout tailored to the specific property.

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add your Gemini API key
echo "VITE_API_KEY=your_key_here" > .env.local

# 3. Start dev server
npm run dev

# 4. Open http://localhost:5173
```

## 🚀 How To Use

1. **Create New Brochure** - Click the button on homepage
2. **Fill 5-Step Form**:
   - Step 1: Property basics (title, location, type)
   - Step 2: Marketing (selling points, target buyers)
   - Step 3: Features (amenities, specifications)
   - Step 4: Images (upload property photos)
   - Step 5: Contact (agent info, developer details)
3. **Generate** - Wait 15-30 seconds for AI magic
4. **View & Download** - Print or save as PDF

### Quick Test with Dummy Data
- Click "Create New Brochure"
- Scroll to bottom → Click "Load Dummy Data"
- Click "Generate My Brochure"
- Done!

## 🎨 What Makes This Special

### Before: Template System
- Choose from predefined layouts
- Limited customization options
- All brochures look similar
- 243 possible combinations

### Now: Dynamic AI System
- AI writes custom React code for each brochure
- **Infinite** unique layouts
- Adapts to property type and target audience
- Every brochure is one-of-a-kind

## 📊 Key Features

- ✨ **Unique Layouts**: Never the same design twice
- 🎨 **AI Design System**: Custom colors, fonts, typography
- 📝 **Smart Copy**: AI-generated taglines and descriptions
- 🖼️ **Image Integration**: Your photos placed artistically
- 📱 **Print-Ready**: A4 format, 6 pages
- ⚡ **Real-Time Generation**: Creates code on the fly

## 🛠 Technical Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **AI**: Google Gemini (gemini-3-flash-preview)
- **Build**: Vite
- **Runtime Compilation**: Babel Standalone
- **Styling**: Utility-first with dynamic inline styles

## 📁 Project Structure

```
dreamex-brochure/
├── services/
│   └── geminiLayoutService.ts    # AI code generator
├── components/
│   ├── DynamicBrochurePreview.tsx # Runtime compiler & renderer
│   ├── InputFormNew.tsx           # 5-step wizard
│   └── [other components]
├── types.ts                       # TypeScript definitions
├── App.tsx                        # Main application
└── docs/
    ├── UPGRADE_SUMMARY.md         # What changed & why
    ├── SETUP_GUIDE.md             # Installation guide
    ├── DYNAMIC_LAYOUT_SYSTEM.md   # Technical deep dive
    └── VISUAL_COMPARISON.md       # Before vs After
```

## 📖 Documentation

### For Users
- **SETUP_GUIDE.md** - Step-by-step installation
- **UPGRADE_SUMMARY.md** - What's new and exciting

### For Developers
- **DYNAMIC_LAYOUT_SYSTEM.md** - Architecture & API reference
- **VISUAL_COMPARISON.md** - Technical comparison

## 🎯 Example Output

Each generation creates:

1. **Custom Design System**
   - 4 unique colors (primary, secondary, accent, background)
   - 2 complementary fonts (heading + body)
   - AI-generated marketing copy

2. **6 Unique Pages**
   - Cover with hero image & title
   - Introduction with narrative & lifestyle
   - Key selling points & features
   - Amenities showcase
   - Location & connectivity
   - Contact & developer info

3. **Complete TSX Code**
   - 500-1500 lines of React/TypeScript
   - Compiled at runtime
   - Fully customized layout structure

## ⚙️ Configuration

### Environment Variables
```env
VITE_API_KEY=your_gemini_api_key
```

### Gemini Settings
```typescript
model: "gemini-3-flash-preview"
temperature: 1.2  // High for creativity
```

### Output Format
- **Size**: A4 (794px × 1123px per page)
- **Pages**: 6 pages
- **Format**: Print-ready PDF

## 🧪 Testing

### Generate Multiple Brochures
1. Generate first brochure with data
2. Back to edit, change property title
3. Generate again
4. Compare - layouts should be completely different!

### Test Checklist
- [ ] Dummy data loads
- [ ] Images upload correctly
- [ ] Generation completes (15-30s)
- [ ] All 6 pages render
- [ ] Print/PDF works
- [ ] Different properties = different layouts

## ⚠️ Known Considerations

### Generation Time
- Takes 15-30 seconds (AI writes custom code)
- Slightly slower than templates
- Worth it for unique results

### Occasional Retries
- AI may produce invalid code ~5-10% of time
- Just click "Try Again"
- System handles gracefully

### Bundle Size
- +200KB for Babel compiler (one-time load)
- Enables infinite layout variations
- Negligible impact on viewing performance

## 🔮 Future Enhancements

- [ ] Layout library (save successful designs)
- [ ] A/B testing (generate 3 options)
- [ ] Layout refinement (adjust specific pages)
- [ ] Multi-language support
- [ ] Brand guideline integration
- [ ] Template marketplace

## 🐛 Troubleshooting

### "API Key missing"
→ Create `.env.local` with `VITE_API_KEY=your_key`

### "Layout Compilation Error"
→ Click "Try Generating Again"

### "Module not found"
→ Run `npm install` again

### Images not showing
→ Upload images in Step 4 with correct labels

### Slow generation
→ Normal! Wait 15-30 seconds for AI

## 📊 Performance

- **Generation**: 15-30 seconds
- **Compilation**: 1-2 seconds
- **Rendering**: 60 FPS smooth
- **Print**: < 1 second

## 💡 Pro Tips

1. **Better input = Better output**: Detailed property info helps AI
2. **Upload quality images**: AI places them creatively
3. **Try different themes**: Luxury, Minimal, Editorial
4. **Don't settle**: Regenerate if not satisfied
5. **Check all pages**: Scroll through before printing

## 📞 Support

Having issues?

1. Check `SETUP_GUIDE.md` for common problems
2. Review console logs for error details
3. Try with dummy data to isolate issues
4. Verify API key is correct
5. Ensure stable internet connection

## 🎉 Credits

- **AI**: Google Gemini
- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Compiler**: Babel Standalone

## 📄 License

This is a proprietary project for real estate marketing automation.

---

## Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
# (Load dummy data in UI for quick test)
```

## System Requirements

- Node.js 18+
- npm 9+
- Modern browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Gemini API)

---

**Ready to create stunning, unique brochures?** 🚀

Extract the archive, follow `SETUP_GUIDE.md`, and start generating!
