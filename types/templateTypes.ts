
// Template system types for combining pre-made templates with AI generation
import { PropertyData } from '@/types';
export enum TemplateType {
  // Pre-made templates
  MODERN_LUXURY = 'modern_luxury',
  MINIMALIST_CLEAN = 'minimalist_clean',
  BOLD_EDITORIAL = 'bold_editorial',
  CLASSIC_ELEGANT = 'classic_elegant',
  CONTEMPORARY_CHIC = 'contemporary_chic',
  
  // AI-generated option
  AI_GENERATED = 'ai_generated'
}

export interface TemplateMetadata {
  id: TemplateType;
  name: string;
  description: string;
  previewImage: string; // Path to preview thumbnail
  tags: string[];
  bestFor: string[]; // e.g., ['luxury_buyers', 'investors', 'families']
  isAIGenerated: boolean;
}

export interface TemplateDesign {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  headingFont: string;
  bodyFont: string;
  copy?: {
    aiTagline?: string;
    aiNarrative?: string;
    aiLocationHook?: string;
  };
}

// Structure that both pre-made and AI templates must follow
export interface BrochureLayoutProps {
  data: PropertyData;
  design: TemplateDesign;
  getImg: (label: string) => string;
}

export type BrochureLayoutComponent = React.FC<BrochureLayoutProps>;