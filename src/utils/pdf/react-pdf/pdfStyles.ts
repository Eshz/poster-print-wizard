
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica', // Reliable fallback
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  authors: {
    fontSize: 18,
    color: '#4B5563',
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  school: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  contact: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Helvetica',
  },
  qrCode: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    gap: 30,
  },
  column: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    backgroundColor: '#3B82F6',
    padding: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
  sectionContent: {
    padding: 12,
    backgroundColor: '#F8FAFC',
  },
  sectionText: {
    fontSize: 12,
    lineHeight: 1.4,
    color: '#374151',
    fontFamily: 'Helvetica',
  },
  keyTakeaway: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  keyNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  keyNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
  keyContent: {
    flex: 1,
  },
  keyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  keyDescription: {
    fontSize: 11,
    lineHeight: 1.3,
    color: '#4B5563',
    fontFamily: 'Helvetica',
  },
  referencesSection: {
    marginTop: 20,
  },
  referencesHeader: {
    backgroundColor: '#374151',
    padding: 8,
    marginBottom: 12,
  },
  referencesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
  referencesContent: {
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  referenceItem: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#374151',
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
});
