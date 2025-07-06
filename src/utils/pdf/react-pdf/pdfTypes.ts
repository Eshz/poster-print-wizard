
import { PosterData, DesignSettings } from '@/types/project';

export interface PdfDocumentProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  qrCodeUrl?: string;
}

export interface PdfHeaderProps {
  posterData: PosterData;
  qrCodeUrl?: string;
}

export interface PdfContentProps {
  posterData: PosterData;
  designSettings: DesignSettings;
}

export interface PdfSectionsProps {
  sections: Array<{ title: string; content: string }>;
}

export interface PdfSidebarProps {
  posterData: PosterData;
  visibleKeyPoints: string[];
}
