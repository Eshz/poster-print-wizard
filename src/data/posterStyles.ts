
import { DesignSettings } from '@/types/design';

export interface PosterStyle extends DesignSettings {
  id: string;
  name: string;
  category: string;
}

export const posterStyles: PosterStyle[] = [
  // Academic Modern Style (existing)
  {
    id: "academic-modern",
    name: "Academic Modern",
    category: "Academic",
    layout: "modern",
    titleFont: "merriweather",
    contentFont: "roboto",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#1E3A8A",
    sectionBgColor: "#3B82F6",
    sectionTitleColor: "#FFFFFF",
    sectionTextColor: "#FFFFFF",
    keyPointsBgColor: "#EFF6FF",
    keyPointsTextColor: "#1E3A8A"
  },
  
  // New Academic Designs
  {
    id: "academic-sage",
    name: "Academic Sage",
    category: "Academic",
    layout: "modern",
    titleFont: "crimsontext",
    contentFont: "sourceserifpro",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#064E3B",
    sectionBgColor: "#059669",
    sectionTitleColor: "#FFFFFF",
    sectionTextColor: "#FFFFFF",
    keyPointsBgColor: "#ECFDF5",
    keyPointsTextColor: "#064E3B"
  },
  
  {
    id: "academic-burgundy",
    name: "Academic Burgundy",
    category: "Academic",
    layout: "modern",
    titleFont: "ebgaramond",
    contentFont: "inter",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#7C2D12",
    sectionBgColor: "#B91C1C",
    sectionTitleColor: "#FFFFFF",
    sectionTextColor: "#FFFFFF",
    keyPointsBgColor: "#FEF2F2",
    keyPointsTextColor: "#7C2D12"
  },
  
  {
    id: "academic-slate",
    name: "Academic Slate",
    category: "Academic",
    layout: "modern",
    titleFont: "librewilson",
    contentFont: "nunito",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#0F172A",
    sectionBgColor: "#475569",
    sectionTitleColor: "#FFFFFF",
    sectionTextColor: "#FFFFFF",
    keyPointsBgColor: "#F8FAFC",
    keyPointsTextColor: "#0F172A"
  },
  
  {
    id: "academic-navy-gold",
    name: "Academic Navy & Gold",
    category: "Academic",
    layout: "modern",
    titleFont: "cormorantgaramond",
    contentFont: "worksans",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#1E3A8A",
    sectionBgColor: "#1E3A8A",
    sectionTitleColor: "#F59E0B",
    sectionTextColor: "#FFFFFF",
    keyPointsBgColor: "#FEF3C7",
    keyPointsTextColor: "#1E3A8A"
  },
  
  {
    id: "academic-forest",
    name: "Academic Forest",
    category: "Academic",
    layout: "modern",
    titleFont: "oldstandardtt",
    contentFont: "karla",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#14532D",
    sectionBgColor: "#16A34A",
    sectionTitleColor: "#FFFFFF",
    sectionTextColor: "#FFFFFF",
    keyPointsBgColor: "#F0FDF4",
    keyPointsTextColor: "#14532D"
  },
  
  {
    id: "academic-royal",
    name: "Academic Royal",
    category: "Academic",
    layout: "modern",
    titleFont: "spectral",
    contentFont: "publicsans",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#581C87",
    sectionBgColor: "#7C3AED",
    sectionTitleColor: "#FFFFFF",
    sectionTextColor: "#FFFFFF",
    keyPointsBgColor: "#FAF5FF",
    keyPointsTextColor: "#581C87"
  },
  
  {
    id: "academic-charcoal",
    name: "Academic Charcoal",
    category: "Academic",
    layout: "modern",
    titleFont: "sourceserifpro",
    contentFont: "inter",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#1F2937",
    sectionBgColor: "#374151",
    sectionTitleColor: "#FFFFFF",
    sectionTextColor: "#FFFFFF",
    keyPointsBgColor: "#F9FAFB",
    keyPointsTextColor: "#1F2937"
  },
  
  {
    id: "academic-teal",
    name: "Academic Teal",
    category: "Academic",
    layout: "modern",
    titleFont: "vollkorn",
    contentFont: "firasans",
    headerBgColor: "#FFFFFF",
    headerTextColor: "#0F766E",
    sectionBgColor: "#14B8A6",
    sectionTitleColor: "#FFFFFF",
    sectionTextColor: "#FFFFFF",
    keyPointsBgColor: "#F0FDFA",
    keyPointsTextColor: "#0F766E"
  },

  // Modern Category (existing styles)
  {
    id: "modern-teal",
    name: "Modern Teal",
    category: "Modern",
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
    category: "Modern",
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
  },
  
  // Elegant Category (existing styles)
  {
    id: "elegant-purple",
    name: "Elegant Purple",
    category: "Elegant",
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
    category: "Elegant",
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
  },
  
  // Formal Category (existing styles)
  {
    id: "formal-navy",
    name: "Formal Navy",
    category: "Formal",
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
    category: "Formal",
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
  },
  
  // Academic Category (existing styles + new ones above)
  {
    id: "academic-green",
    name: "Academic Green",
    category: "Academic",
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
    category: "Academic",
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
  },
  
  // Creative Category (existing styles)
  {
    id: "creative-orange",
    name: "Creative Orange",
    category: "Creative",
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
    category: "Creative",
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
];
