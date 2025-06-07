
import React from 'react';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, ChevronDown, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface DesignPanelProps {
  designSettings: {
    layout: string;
    titleFont: string;
    contentFont: string;
    headerBgColor: string;
    headerTextColor: string;
    sectionBgColor: string;
    sectionTitleColor: string;
    sectionTextColor: string;
    keyPointsBgColor: string;
    keyPointsTextColor: string;
  };
  setDesignSettings: React.Dispatch<React.SetStateAction<any>>;
  qrColor: string;
  setQrColor: (color: string) => void;
}

const posterStyles = [
  {
    category: "Modern",
    styles: [
      {
        id: "modern-teal",
        name: "Modern Teal",
        layout: "modern",
        titleFont: "montserrat",
        contentFont: "opensans",
        headerBgColor: "#2DD4BF",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#F0FDFA",
        sectionTitleColor: "#0F766E",
        sectionTextColor: "#134E4A",
        keyPointsBgColor: "#CCFBF1",
        keyPointsTextColor: "#0F766E"
      },
      {
        id: "modern-blue",
        name: "Modern Blue",
        layout: "modern",
        titleFont: "raleway",
        contentFont: "roboto",
        headerBgColor: "#3B82F6",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#EFF6FF",
        sectionTitleColor: "#1E40AF",
        sectionTextColor: "#1E3A8A",
        keyPointsBgColor: "#DBEAFE",
        keyPointsTextColor: "#1E40AF"
      }
    ]
  },
  {
    category: "Elegant",
    styles: [
      {
        id: "elegant-purple",
        name: "Elegant Purple",
        layout: "classic",
        titleFont: "playfair",
        contentFont: "lora",
        headerBgColor: "#8B5CF6",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#FAF5FF",
        sectionTitleColor: "#6B21A8",
        sectionTextColor: "#581C87",
        keyPointsBgColor: "#EDE9FE",
        keyPointsTextColor: "#6B21A8"
      },
      {
        id: "elegant-rose",
        name: "Elegant Rose",
        layout: "focus",
        titleFont: "merriweather",
        contentFont: "lora",
        headerBgColor: "#EC4899",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#FDF2F8",
        sectionTitleColor: "#BE185D",
        sectionTextColor: "#9D174D",
        keyPointsBgColor: "#FCE7F3",
        keyPointsTextColor: "#BE185D"
      }
    ]
  },
  {
    category: "Formal",
    styles: [
      {
        id: "formal-navy",
        name: "Formal Navy",
        layout: "classic",
        titleFont: "merriweather",
        contentFont: "roboto",
        headerBgColor: "#1E3A8A",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#F8FAFC",
        sectionTitleColor: "#1E3A8A",
        sectionTextColor: "#0F172A",
        keyPointsBgColor: "#E2E8F0",
        keyPointsTextColor: "#1E3A8A"
      },
      {
        id: "formal-gray",
        name: "Formal Gray",
        layout: "modern",
        titleFont: "playfair",
        contentFont: "opensans",
        headerBgColor: "#374151",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#F9FAFB",
        sectionTitleColor: "#374151",
        sectionTextColor: "#111827",
        keyPointsBgColor: "#F3F4F6",
        keyPointsTextColor: "#374151"
      }
    ]
  },
  {
    category: "Academic",
    styles: [
      {
        id: "academic-green",
        name: "Academic Green",
        layout: "classic",
        titleFont: "merriweather",
        contentFont: "roboto",
        headerBgColor: "#059669",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#F0FDF4",
        sectionTitleColor: "#047857",
        sectionTextColor: "#064E3B",
        keyPointsBgColor: "#DCFCE7",
        keyPointsTextColor: "#047857"
      },
      {
        id: "academic-indigo",
        name: "Academic Indigo",
        layout: "focus",
        titleFont: "playfair",
        contentFont: "opensans",
        headerBgColor: "#4F46E5",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#F8FAFF",
        sectionTitleColor: "#3730A3",
        sectionTextColor: "#312E81",
        keyPointsBgColor: "#E0E7FF",
        keyPointsTextColor: "#3730A3"
      }
    ]
  },
  {
    category: "Creative",
    styles: [
      {
        id: "creative-orange",
        name: "Creative Orange",
        layout: "modern",
        titleFont: "montserrat",
        contentFont: "raleway",
        headerBgColor: "#EA580C",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#FFF7ED",
        sectionTitleColor: "#C2410C",
        sectionTextColor: "#9A3412",
        keyPointsBgColor: "#FED7AA",
        keyPointsTextColor: "#C2410C"
      },
      {
        id: "creative-cyan",
        name: "Creative Cyan",
        layout: "focus",
        titleFont: "raleway",
        contentFont: "montserrat",
        headerBgColor: "#0891B2",
        headerTextColor: "#FFFFFF",
        sectionBgColor: "#F0F9FF",
        sectionTitleColor: "#0E7490",
        sectionTextColor: "#164E63",
        keyPointsBgColor: "#BAE6FD",
        keyPointsTextColor: "#0E7490"
      }
    ]
  }
];

const DesignPanel: React.FC<DesignPanelProps> = ({ 
  designSettings, 
  setDesignSettings, 
  qrColor, 
  setQrColor 
}) => {
  const [openSections, setOpenSections] = React.useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const applyStyle = (style: any) => {
    setDesignSettings({
      layout: style.layout,
      titleFont: style.titleFont,
      contentFont: style.contentFont,
      headerBgColor: style.headerBgColor,
      headerTextColor: style.headerTextColor,
      sectionBgColor: style.sectionBgColor,
      sectionTitleColor: style.sectionTitleColor,
      sectionTextColor: style.sectionTextColor,
      keyPointsBgColor: style.keyPointsBgColor,
      keyPointsTextColor: style.keyPointsTextColor
    });
  };

  const StyleThumbnail = ({ style }: { style: any }) => (
    <Button
      variant="outline"
      className="h-auto p-0 border-2 hover:border-blue-500 transition-all duration-200 overflow-hidden"
      onClick={() => applyStyle(style)}
    >
      <div className="w-full h-24 flex flex-col">
        {/* Header */}
        <div 
          className="h-6 w-full flex items-center justify-center text-xs font-bold"
          style={{ 
            backgroundColor: style.headerBgColor, 
            color: style.headerTextColor,
            fontFamily: style.titleFont === 'playfair' ? 'Playfair Display' : 
                       style.titleFont === 'merriweather' ? 'Merriweather' :
                       style.titleFont === 'montserrat' ? 'Montserrat' :
                       style.titleFont === 'raleway' ? 'Raleway' : 'sans-serif'
          }}
        >
          Title
        </div>
        
        {/* Content Area */}
        <div 
          className="flex-1 p-1 flex gap-1"
          style={{ backgroundColor: style.sectionBgColor }}
        >
          {style.layout === 'classic' && (
            <>
              <div className="w-1/2 h-full bg-gray-200 rounded-sm"></div>
              <div className="w-1/2 h-full bg-gray-200 rounded-sm"></div>
            </>
          )}
          {style.layout === 'modern' && (
            <>
              <div className="w-1/3 h-full bg-gray-200 rounded-sm"></div>
              <div className="w-1/3 h-full bg-gray-200 rounded-sm"></div>
              <div className="w-1/3 h-full bg-gray-200 rounded-sm"></div>
            </>
          )}
          {style.layout === 'focus' && (
            <div className="w-2/3 h-full bg-gray-200 rounded-sm mx-auto"></div>
          )}
        </div>
        
        {/* Style Name */}
        <div className="p-1 text-xs text-center bg-white border-t">
          {style.name}
        </div>
      </div>
    </Button>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 border-b bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Design Styles</h2>
        <p className="text-sm text-gray-600">Choose from pre-designed poster styles</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {posterStyles.map((category) => (
          <div key={category.category} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Palette className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                <Badge variant="secondary" className="ml-auto">
                  {category.styles.length} styles
                </Badge>
              </div>
            </div>
            
            <Collapsible>
              <CollapsibleTrigger
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => toggleSection(category.category)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">View Styles</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${openSections[category.category] ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {category.styles.map((style) => (
                    <StyleThumbnail key={style.id} style={style} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignPanel;
