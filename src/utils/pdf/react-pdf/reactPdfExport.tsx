import { pdf } from "@react-pdf/renderer";
import { toast } from "sonner";
import { registerFontsForPDF } from "./fontManager";
import { DesignSettings, PosterData } from "@/types/project";
import { createPdfDocument } from "./PdfDocument";

/**
 * Exports poster using react-pdf with local TTF fonts for high-quality vector-based output
 */
export const exportToReactPDF = async (
  posterData: PosterData,
  designSettings: DesignSettings
) => {
  try {
    toast.info("Loading local font files for high-quality vector PDF...");

    // Register fonts from local TTF files with proper error handling
    await registerFontsForPDF();

    toast.info("Generating high-quality vector PDF...");

    // Generate QR code URL if needed
    const qrCodeUrl = posterData.qrCodeUrl && posterData.showQrCode !== false
      ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(posterData.qrCodeUrl)}&color=${(posterData.qrCodeColor || '#000000').replace('#', '')}`
      : undefined;

    const doc = createPdfDocument(posterData, designSettings, qrCodeUrl);

    // Generate PDF blob with error handling
    const pdfElement = pdf(doc);
    const blob = await pdfElement.toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `conference-poster-A0-${
      designSettings.orientation || "portrait"
    }-vector.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
    toast.success(`High-quality vector PDF exported! File size: ${sizeInMB}MB`);
  } catch (error) {
    console.error("React-PDF export failed:", error);
    toast.error("Failed to export PDF. Please try again.");
    throw error;
  }
};
