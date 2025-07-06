
import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { styles } from '../pdfStyles';
import { PdfHeaderProps } from '../pdfTypes';

export const PdfHeader: React.FC<PdfHeaderProps> = ({ posterData, qrCodeUrl }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{posterData.title}</Text>
      <Text style={styles.authors}>{posterData.authors}</Text>
      <Text style={styles.school}>{posterData.school}</Text>
      <Text style={styles.contact}>{posterData.contact}</Text>
      
      {/* QR Code */}
      {qrCodeUrl && posterData.showQrCode !== false && (
        <Image style={styles.qrCode} src={qrCodeUrl} />
      )}
    </View>
  );
};
