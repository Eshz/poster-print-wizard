
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#1E3A8A',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1E3A8A',
    fontFamily: 'Merriweather',
    textAlign: 'center',
    marginBottom: 12,
  },
  authors: {
    fontSize: 24,
    color: '#1E3A8A',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 8,
  },
  school: {
    fontSize: 20,
    color: '#1E3A8A',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 8,
  },
  contact: {
    fontSize: 18,
    color: '#1E3A8A',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
    gap: 16,
  },
  section: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Merriweather',
  },
  sectionContent: {
    padding: 16,
    backgroundColor: '#3B82F6',
  },
  sectionText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    lineHeight: 1.6,
  },
  keyTakeaway: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    overflow: 'hidden',
  },
  keyNumber: {
    width: 48,
    height: 48,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Merriweather',
  },
  keyContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  keyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#202B5B',
    fontFamily: 'Merriweather',
    marginBottom: 4,
  },
  keyDescription: {
    fontSize: 10,
    color: '#202B5B',
    fontFamily: 'Roboto',
    lineHeight: 1.4,
  },
  referencesSection: {
    backgroundColor: '#3E3C72',
    borderRadius: 8,
    overflow: 'hidden',
  },
  referencesHeader: {
    backgroundColor: '#3E3C72',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  referencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Merriweather',
  },
  referencesContent: {
    padding: 16,
    backgroundColor: '#3E3C72',
  },
  referenceItem: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    lineHeight: 1.4,
    marginBottom: 8,
  },
  qrCode: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
