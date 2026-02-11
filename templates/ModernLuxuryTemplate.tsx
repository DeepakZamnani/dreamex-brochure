import React from 'react';
import { BrochureLayoutProps, TemplateDesign } from '@/types/templateTypes';

// ===========================================
// EXAMPLE: Modern Luxury Template
// ===========================================
// You'll create 5 templates following this structure

// Design configuration for this template
export const modernLuxuryDesign: TemplateDesign = {
  primaryColor: '#1a1a1a',
  secondaryColor: '#d4af37',
  accentColor: '#ffffff',
  backgroundColor: '#f8f8f8',
  headingFont: 'Playfair Display',
  bodyFont: 'Montserrat'
};

// Page component (794px × 1123px - A4 size)
const Page: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => (
  <div
    className={`page ${className}`}
    style={{ width: '794px', height: '1123px', ...style }}
  >
    {children}
  </div>
);

// The actual template component
export const ModernLuxuryTemplate: React.FC<BrochureLayoutProps> = ({
  data,
  design,
  getImg
}) => {
  const headingStyle = {
    fontFamily: `${design.headingFont}, serif`,
    color: design.primaryColor
  };

  const bodyStyle = {
    fontFamily: `${design.bodyFont}, sans-serif`
  };

  return (
    <div className="flex flex-col items-center bg-gray-300 py-10 gap-6">
      
      {/* PAGE 1: Hero Cover */}
      <Page className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getImg('elevation')}
            alt="Property elevation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end p-16 text-white">
          <div className="mb-8">
            <div
              className="inline-block px-4 py-2 mb-4"
              style={{ backgroundColor: design.secondaryColor }}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-black">
                {data.projectStatus.replace('_', ' ')}
              </span>
            </div>
          </div>
          <h1
            className="text-7xl font-light mb-4 leading-tight"
            style={headingStyle}
          >
            {data.title}
          </h1>
          <p className="text-2xl font-light mb-2">{data.location}</p>
          <p
            className="text-xl italic"
            style={{ color: design.secondaryColor }}
          >
            Starting from {data.priceDetails.startingPrice}
          </p>
        </div>
      </Page>

      {/* PAGE 2: Property Story */}
      <Page className="flex" style={{ backgroundColor: design.backgroundColor }}>
        <div className="w-1/2 p-16 flex flex-col justify-center">
          <div
            className="w-20 h-1 mb-8"
            style={{ backgroundColor: design.secondaryColor }}
          />
          <h2 className="text-5xl mb-8 leading-tight" style={headingStyle}>
            Redefining Luxury Living
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-8" style={bodyStyle}>
            {data.salesIntelligence.keySellingPoints[0]}
          </p>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Configurations
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.configuration.map((config, i) => (
                <div
                  key={i}
                  className="px-6 py-3 border-2"
                  style={{
                    borderColor: design.primaryColor,
                    color: design.primaryColor
                  }}
                >
                  <span className="font-semibold">{config}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img
            src={getImg('living_room')}
            alt="Living room"
            className="w-full h-full object-cover"
          />
        </div>
      </Page>

      {/* PAGE 3: Key Selling Points */}
      <Page className="relative overflow-hidden" style={{ backgroundColor: design.primaryColor }}>
        <div className="absolute inset-0 opacity-20">
          <img
            src={getImg('bedroom')}
            alt="Bedroom"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 p-16 text-white">
          <h2
            className="text-5xl mb-16 text-white"
            style={{ fontFamily: headingStyle.fontFamily }}
          >
            Why Choose {data.branding.developerName}?
          </h2>
          
          <div className="space-y-12">
            {data.salesIntelligence.keySellingPoints.map((point, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div
                  className="text-8xl font-light opacity-40"
                  style={{ color: design.secondaryColor }}
                >
                  0{i + 1}
                </div>
                <div className="flex-1 pt-4">
                  <p className="text-2xl leading-relaxed">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* PAGE 4: Amenities */}
      <Page className="p-16" style={{ backgroundColor: design.backgroundColor }}>
        <div className="mb-12">
          <h2 className="text-5xl mb-4" style={headingStyle}>
            World-Class Amenities
          </h2>
          <div
            className="w-32 h-1"
            style={{ backgroundColor: design.secondaryColor }}
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            ...(data.amenities.projectAmenities || []),
            ...(data.amenities.apartmentFeatures || [])
          ]
            .slice(0, 12)
            .map((amenity, i) => (
              <div
                key={i}
                className="p-6 bg-white border-2 hover:shadow-lg transition-shadow"
                style={{ borderColor: design.primaryColor }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: design.secondaryColor }}
                >
                  <span className="text-2xl">✦</span>
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide">
                  {amenity}
                </p>
              </div>
            ))}
        </div>

        {data.amenities.sustainability && data.amenities.sustainability.length > 0 && (
          <div className="mt-12 p-8 bg-green-50 border-2 border-green-200">
            <h3 className="text-xl font-bold mb-4 text-green-800">
              Sustainable Living
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.amenities.sustainability.map((feature, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </Page>

      {/* PAGE 5: Location & Connectivity */}
      <Page className="flex" style={{ backgroundColor: design.backgroundColor }}>
        <div className="w-1/2 p-16 flex flex-col justify-center">
          <h2 className="text-5xl mb-8" style={headingStyle}>
            Prime Location
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            {data.salesIntelligence.locationAdvantages.connectivity ||
              'Strategically located for seamless connectivity'}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                Nearby Landmarks
              </h3>
              <div className="space-y-3">
                {(data.salesIntelligence.locationAdvantages.nearbyLandmarks || []).map(
                  (landmark, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: design.secondaryColor }}
                      />
                      <span className="text-gray-700">{landmark}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {data.salesIntelligence.locationAdvantages.metroDistance && (
              <div className="pt-6 border-t-2 border-gray-200">
                <p className="text-gray-700">
                  <span className="font-bold">Metro: </span>
                  {data.salesIntelligence.locationAdvantages.metroDistance}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <img
            src={getImg('location_map')}
            alt="Location map"
            className="w-full h-full object-cover"
          />
        </div>
      </Page>

      {/* PAGE 6: Contact & Branding */}
      <Page
        className="flex flex-col justify-between p-16"
        style={{ backgroundColor: design.backgroundColor }}
      >
        <div className="text-center">
          <h2
            className="text-6xl mb-4"
            style={{
              ...headingStyle,
              color: design.primaryColor
            }}
          >
            {data.branding.developerName}
          </h2>
          <div
            className="w-32 h-1 mx-auto mb-8"
            style={{ backgroundColor: design.secondaryColor }}
          />
        </div>

        <div className="bg-white p-12 shadow-2xl">
          <h3 className="text-2xl font-bold mb-8 text-center">Get in Touch</h3>
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xl font-bold mb-2">{data.agent.name}</p>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <a
                href={`tel:${data.agent.phone}`}
                className="text-lg hover:underline"
                style={{ color: design.secondaryColor }}
              >
                {data.agent.phone}
              </a>
              <a
                href={`mailto:${data.agent.email}`}
                className="text-lg hover:underline"
                style={{ color: design.secondaryColor }}
              >
                {data.agent.email}
              </a>
            </div>
          </div>

          {data.branding.siteAddress && (
            <div className="mt-8 pt-8 border-t-2 border-gray-200 text-center">
              <p className="text-sm text-gray-600">Site Address</p>
              <p className="text-gray-800">{data.branding.siteAddress}</p>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-gray-500 mt-8">
          {data.branding.reraNumber && (
            <p className="mb-2">RERA No: {data.branding.reraNumber}</p>
          )}
          
        </div>
      </Page>
    </div>
  );
};

// Export both the design and component
export default {
  design: modernLuxuryDesign,
  component: ModernLuxuryTemplate
};