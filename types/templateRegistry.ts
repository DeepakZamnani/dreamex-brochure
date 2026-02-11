import { TemplateType, BrochureLayoutComponent, TemplateDesign } from './templateTypes';

// Import your template components (you'll create these)
import ModernLuxuryTemplate from '../templates/ModernLuxuryTemplate'
// import MinimalistCleanTemplate from './templates/MinimalistCleanTemplate';
// import BoldEditorialTemplate from './templates/BoldEditorialTemplate';
// import ClassicElegantTemplate from './templates/ClassicElegantTemplate';
// import ContemporaryChicTemplate from './templates/ContemporaryChicTemplate';

interface TemplateRegistration {
  design: TemplateDesign;
  component: BrochureLayoutComponent;
}

// Template registry - maps template IDs to their components
const TEMPLATE_REGISTRY: Record<TemplateType, TemplateRegistration | null> = {
  [TemplateType.MODERN_LUXURY]: ModernLuxuryTemplate,
  [TemplateType.MINIMALIST_CLEAN]: null, // You'll create this
  [TemplateType.BOLD_EDITORIAL]: null, // You'll create this
  [TemplateType.CLASSIC_ELEGANT]: null, // You'll create this
  [TemplateType.CONTEMPORARY_CHIC]: null, // You'll create this
  [TemplateType.AI_GENERATED]: null // Special case - handled differently
};

/**
 * Get a template by its ID
 * Returns null for AI_GENERATED or if template not found
 */
export const getTemplate = (
  templateId: TemplateType
): TemplateRegistration | null => {
  if (templateId === TemplateType.AI_GENERATED) {
    return null; // AI templates are generated dynamically
  }
  
  return TEMPLATE_REGISTRY[templateId] || null;
};

/**
 * Check if a template is pre-made (vs AI-generated)
 */
export const isPreMadeTemplate = (templateId: TemplateType): boolean => {
  return templateId !== TemplateType.AI_GENERATED && TEMPLATE_REGISTRY[templateId] !== null;
};

/**
 * Get the design for a template
 */
export const getTemplateDesign = (templateId: TemplateType): TemplateDesign | null => {
  const template = getTemplate(templateId);
  return template?.design || null;
};

/**
 * Get the component for a template
 */
export const getTemplateComponent = (
  templateId: TemplateType
): BrochureLayoutComponent | null => {
  const template = getTemplate(templateId);
  return template?.component || null;
};

export default TEMPLATE_REGISTRY;