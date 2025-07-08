import React, { useMemo } from "react";
import { PosterData, DesignSettings } from "@/types/project";
import PosterHeader from "./poster-preview/PosterHeader";
import PosterLayoutRenderer from "./poster-preview/PosterLayoutRenderer";
import { usePosterScaling } from "@/hooks/usePosterScaling";
import { getPosterDimensions } from "@/utils/posterConstants";

interface PosterPreviewProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  manualZoom?: number;
  onContainerScaleChange?: (scale: number) => void;
}

const PosterPreview: React.FC<PosterPreviewProps> = React.memo(
  ({ posterData, designSettings, manualZoom = 1, onContainerScaleChange }) => {
    // Get dimensions based on orientation
    const dimensions = useMemo(
      () => getPosterDimensions(designSettings.orientation || "portrait"),
      [designSettings.orientation]
    );

    const { posterRef } = usePosterScaling({
      manualZoom,
      onContainerScaleChange,
      posterUIWidth: dimensions.width,
      posterUIHeight: dimensions.height,
      a0WidthPx: dimensions.a0Width,
      a0HeightPx: dimensions.a0Height,
    });

    // QR Code generation - memoized for performance
    const qrCodeUrl = useMemo(() => {
      if (!posterData.qrCodeUrl || posterData.showQrCode === false) return "";

      return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        posterData.qrCodeUrl
      )}&color=${(posterData.qrCodeColor || "#000000").replace("#", "")}`;
    }, [posterData.qrCodeUrl, posterData.showQrCode, posterData.qrCodeColor]);

    // Check content visibility - memoized for performance

    return (
      <div
        id="poster-content"
        ref={posterRef}
        className="bg-white border border-gray-200 relative overflow-hidden flex flex-col shadow-lg w-full h-full"
        style={{
          transformOrigin: "center",
        }}
      >
        {/* Header Section */}
        <PosterHeader
          title={posterData.title}
          authors={posterData.authors}
          school={posterData.school}
          contact={posterData.contact}
          designSettings={designSettings}
          qrCodeUrl={qrCodeUrl}
          showQrCode={posterData.showQrCode !== false}
          qrCodeCaption={posterData.qrCodeCaption}
        />

        {/* Dynamic Content Layout - adding overflow control */}
        <div className="flex-grow overflow-hidden p-2">
          <PosterLayoutRenderer
            layout={designSettings.layout}
            posterData={posterData}
            designSettings={designSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={posterData.showKeypoints !== false}
            showQrCode={posterData.showQrCode !== false}
          />
        </div>
      </div>
    );
  }
);

PosterPreview.displayName = "PosterPreview";

export default PosterPreview;
