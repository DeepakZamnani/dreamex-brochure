import { TemplateType, TemplateMetadata } from '@/types/templateTypes';

// Template catalog - metadata for all available templates
export const TEMPLATE_CATALOG: TemplateMetadata[] = [
  {
    id: TemplateType.MODERN_LUXURY,
    name: 'Modern Luxury',
    description: 'Sophisticated design with bold typography and premium aesthetics',
    previewImage: '/templates/modern-luxury-preview.jpg',
    tags: ['luxury', 'premium', 'high-end'],
    bestFor: ['luxury_buyers', 'nri_buyers', 'high-end properties'],
    isAIGenerated: false
  },
  {
    id: TemplateType.MINIMALIST_CLEAN,
    name: 'Minimalist Clean',
    description: 'WhatsApp-optimized, clean layouts with essential information',
    previewImage: '/templates/minimalist-preview.jpg',
    tags: ['minimal', 'clean', 'modern'],
    bestFor: ['working_professionals', 'whatsapp sharing', 'quick viewing'],
    isAIGenerated: false
  },
  {
    id: TemplateType.BOLD_EDITORIAL,
    name: 'Bold Editorial',
    description: 'Magazine-style storytelling with dramatic visuals',
    previewImage: '/templates/editorial-preview.jpg',
    tags: ['editorial', 'storytelling', 'bold'],
    bestFor: ['email campaigns', 'presentation', 'investors'],
    isAIGenerated: false
  },
  {
    id: TemplateType.CLASSIC_ELEGANT,
    name: 'Classic Elegant',
    description: 'Timeless design perfect for print and formal presentations',
    previewImage: '/templates/classic-preview.jpg',
    tags: ['classic', 'elegant', 'traditional'],
    bestFor: ['families', 'senior_citizens', 'print brochures'],
    isAIGenerated: false
  },
  {
    id: TemplateType.CONTEMPORARY_CHIC,
    name: 'Contemporary Chic',
    description: 'Trendy and vibrant for modern apartments and urban living',
    previewImage: '/templates/contemporary-preview.jpg',
    tags: ['contemporary', 'trendy', 'vibrant'],
    bestFor: ['working_professionals', 'young buyers', 'urban properties'],
    isAIGenerated: false
  },
  {
    id: TemplateType.AI_GENERATED,
    name: 'Let AI Create Yours',
    description: 'Unique AI-generated design tailored to your property',
    previewImage: '/templates/ai-generated-preview.jpg',
    tags: ['unique', 'ai-powered', 'custom'],
    bestFor: ['unique properties', 'custom branding', 'creative freedom'],
    isAIGenerated: true
  }
];

// Helper to get template metadata by ID
export const getTemplateMetadata = (templateId: TemplateType): TemplateMetadata | undefined => {
  return TEMPLATE_CATALOG.find(t => t.id === templateId);
};

// Helper to get all pre-made templates (excluding AI)
export const getPreMadeTemplates = (): TemplateMetadata[] => {
  return TEMPLATE_CATALOG.filter(t => !t.isAIGenerated);
};