import React from 'react';

/**
 * ABSOLUTE BARE MINIMUM Template Selector
 * 
 * NO dependencies on:
 * - templateTypes (hardcoded values)
 * - templateCatalog (hardcoded templates)
 * - External styles
 * - Complex logic
 * 
 * If this doesn't work, the problem is in React itself or parent component
 */

interface Props {
  selectedTemplate: string;
  setSelectedTemplate: (val: string) => void;
}

const BarebonesTemplateSelector: React.FC<Props> = ({ selectedTemplate, setSelectedTemplate }) => {
  
  const templates = [
    { id: 'modern_luxury', name: 'Modern Luxury' },
    { id: 'minimalist_clean', name: 'Minimalist Clean' },
    { id: 'bold_editorial', name: 'Bold Editorial' },
    { id: 'classic_elegant', name: 'Classic Elegant' },
    { id: 'contemporary_chic', name: 'Contemporary Chic' },
    { id: 'ai_generated', name: 'Let AI Create Yours' }
  ];

  return (
    <div style={{ padding: 20, backgroundColor: '#fafafa' }}>
      
      {/* Debug */}
      <div style={{ 
        padding: 10, 
        backgroundColor: '#fff3cd', 
        marginBottom: 20,
        fontFamily: 'monospace',
        fontSize: 14
      }}>
        Current: <strong>{selectedTemplate}</strong>
      </div>

      {/* Templates */}
      {templates.map((t) => (
        <div
          key={t.id}
          onClick={() => {
            console.log('CLICKED:', t.id);
            setSelectedTemplate(t.id);
          }}
          style={{
            padding: 15,
            margin: 10,
            backgroundColor: selectedTemplate === t.id ? '#4CAF50' : '#fff',
            color: selectedTemplate === t.id ? '#fff' : '#000',
            border: '2px solid ' + (selectedTemplate === t.id ? '#2E7D32' : '#ccc'),
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: selectedTemplate === t.id ? 'bold' : 'normal'
          }}
        >
          {selectedTemplate === t.id && '✓ '}
          {t.name}
          {selectedTemplate === t.id && ' (SELECTED)'}
        </div>
      ))}

      {/* Test Button */}
      <button
        onClick={() => {
          console.log('TEST BUTTON CLICKED');
          setSelectedTemplate('modern_luxury');
        }}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: '#2196F3',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        Force Select Modern Luxury (Test)
      </button>
    </div>
  );
};

export default BarebonesTemplateSelector;

/**
 * HOW TO USE:
 * 
 * // In DescriptionStep.tsx or wherever
 * import BarebonesTemplateSelector from './BarebonesTemplateSelector';
 * 
 * <BarebonesTemplateSelector
 *   selectedTemplate={selectedTemplate}
 *   setSelectedTemplate={setSelectedTemplate}
 * />
 * 
 * 
 * WHAT TO EXPECT:
 * 
 * 1. Click any template div:
 *    - Console logs: "CLICKED: [template_id]"
 *    - Div turns green
 *    - Text turns white and bold
 *    - Checkmark appears
 *    - "Current: [template_id]" updates
 * 
 * 2. Click test button:
 *    - Console logs: "TEST BUTTON CLICKED"
 *    - "modern_luxury" gets selected
 * 
 * 
 * IF THIS DOESN'T WORK:
 * 
 * The problem is NOT in the template component.
 * Check:
 * 1. Is selectedTemplate actually a string?
 * 2. Is setSelectedTemplate actually a function?
 * 3. Does calling setSelectedTemplate directly work?
 * 4. Is this component even rendering?
 * 5. Are there React errors in console?
 */