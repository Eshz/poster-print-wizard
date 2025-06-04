
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Type, Layout, Palette, ChevronDown, Edit } from 'lucide-react';
import { isAccessible, accessibleColorPairs, availableFonts } from '@/lib/color-utils';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { HexColorPicker } from "react-colorful";

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

const layoutOptions = [
  { value: 'classic', label: 'Classic (2 Columns)' },
  { value: 'modern', label: 'Modern (Header + 3 Columns)' },
  { value: 'focus', label: 'Focus (Center Content)' },
];

const DesignPanel: React.FC<DesignPanelProps> = ({ 
  designSettings, 
  setDesignSettings, 
  qrColor, 
  setQrColor 
}) => {
  const [showColorChecker, setShowColorChecker] = React.useState(false);
  const [color1, setColor1] = React.useState('#FFFFFF');
  const [color2, setColor2] = React.useState('#000000');
  const [contrastRatio, setContrastRatio] = React.useState(21);
  const [isAA, setIsAA] = React.useState(true);
  const [isAAA, setIsAAA] = React.useState(true);
  const [openSections, setOpenSections] = React.useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleChange = (key: string, value: string) => {
    setDesignSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleColorPairSelect = (pair: {bg: string, fg: string}) => {
    setDesignSettings(prev => ({
      ...prev,
      headerBgColor: pair.bg,
      headerTextColor: pair.fg,
      sectionTitleColor: pair.bg,
      keyPointsTextColor: pair.bg,
      sectionBgColor: pair.fg === '#000000' ? '#e6ebff' : '#f5f7ff',
      keyPointsBgColor: pair.fg === '#000000' ? '#e6ebff' : '#f5f7ff'
    }));
  };

  const checkContrast = () => {
    const ratio = isAccessible(color1, color2, 'AAA') ? 
      (isAccessible(color1, color2, 'AAA', false) ? 7.1 : 4.6) : 
      (isAccessible(color1, color2, 'AA', false) ? 4.6 : 3.1);
    
    setContrastRatio(ratio);
    setIsAA(isAccessible(color1, color2, 'AA'));
    setIsAAA(isAccessible(color1, color2, 'AAA'));
  };

  React.useEffect(() => {
    checkContrast();
  }, [color1, color2]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 border-b bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Design</h2>
        <p className="text-sm text-gray-600">Customize your poster appearance</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Layout Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Layout className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Layout</h3>
            </div>
          </div>
          
          <div 
            className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200"
            onClick={() => toggleSection('layout')}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Edit Layout</span>
              <Edit className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {openSections['layout'] && (
            <div className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="layout">Poster Layout</Label>
                  <Select 
                    value={designSettings.layout} 
                    onValueChange={(value) => handleChange('layout', value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      {layoutOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-gray-900">Layout Preview</h4>
                  <div className="h-48 bg-gray-100 rounded-md border flex items-center justify-center">
                    {designSettings.layout === 'classic' && (
                      <div className="w-full h-full p-4">
                        <div className="w-full h-[20%] bg-gray-300 mb-2 rounded"></div>
                        <div className="flex h-[75%] gap-2">
                          <div className="w-1/2 bg-gray-200 rounded"></div>
                          <div className="w-1/2 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    )}
                    {designSettings.layout === 'modern' && (
                      <div className="w-full h-full p-4">
                        <div className="w-full h-[20%] bg-gray-300 mb-2 rounded"></div>
                        <div className="flex h-[75%] gap-2">
                          <div className="w-1/3 bg-gray-200 rounded"></div>
                          <div className="w-1/3 bg-gray-200 rounded"></div>
                          <div className="w-1/3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    )}
                    {designSettings.layout === 'focus' && (
                      <div className="w-full h-full p-4">
                        <div className="w-full h-[20%] bg-gray-300 mb-2 rounded"></div>
                        <div className="flex h-[75%] justify-center">
                          <div className="w-2/3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Typography Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <Type className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Typography</h3>
            </div>
          </div>
          
          <div 
            className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200"
            onClick={() => toggleSection('typography')}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Edit Fonts</span>
              <Edit className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {openSections['typography'] && (
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleFont" className="text-sm font-medium text-gray-900">Title Font</Label>
                <Select 
                  value={designSettings.titleFont} 
                  onValueChange={(value) => handleChange('titleFont', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFonts.map(font => (
                      <SelectItem 
                        key={font.value} 
                        value={font.value}
                        className={`font-${font.value}`}
                      >
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentFont" className="text-sm font-medium text-gray-900">Content Font</Label>
                <Select 
                  value={designSettings.contentFont} 
                  onValueChange={(value) => handleChange('contentFont', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFonts.map(font => (
                      <SelectItem 
                        key={font.value} 
                        value={font.value}
                        className={`font-${font.value}`}
                      >
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Colors Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Palette className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Colors</h3>
            </div>
          </div>
          
          <div 
            className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-200"
            onClick={() => toggleSection('colors')}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Edit Colors</span>
              <Edit className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {openSections['colors'] && (
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Color Combinations</h4>
                <div className="grid grid-cols-2 gap-2">
                  {accessibleColorPairs.map((pair, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="h-auto p-3 justify-start border-gray-300 hover:border-blue-500"
                      onClick={() => handleColorPairSelect(pair)}
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded flex items-center justify-center text-xs font-medium" 
                          style={{backgroundColor: pair.bg, color: pair.fg}}
                        >
                          Aa
                        </div>
                        <span className="text-xs text-gray-900">{pair.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowColorChecker(true)}
                  size="sm"
                  className="mb-4 border-gray-300 hover:border-blue-500"
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Advanced Color Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Color Contrast Checker Dialog */}
      <Dialog open={showColorChecker} onOpenChange={setShowColorChecker}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Advanced Color Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            {/* QR Code Color */}
            <div className="space-y-2">
              <Label htmlFor="qr-color" className="text-sm font-medium text-gray-900">QR Code Color</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-10 h-10 p-0 border-2"
                      style={{
                        backgroundColor: qrColor,
                        borderColor: qrColor === '#ffffff' ? '#e2e8f0' : qrColor
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3">
                    <HexColorPicker color={qrColor} onChange={setQrColor} />
                  </PopoverContent>
                </Popover>
                <Input
                  id="qr-color"
                  type="text"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            {/* Header Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="headerBgColor" className="text-sm font-medium text-gray-900">Header Background</Label>
                <div className="flex gap-2">
                  <div 
                    className="w-10 h-10 rounded border" 
                    style={{backgroundColor: designSettings.headerBgColor}}
                  ></div>
                  <Input 
                    id="headerBgColor" 
                    type="text" 
                    value={designSettings.headerBgColor}
                    onChange={(e) => handleChange('headerBgColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headerTextColor" className="text-sm font-medium text-gray-900">Header Text</Label>
                <div className="flex gap-2">
                  <div 
                    className="w-10 h-10 rounded border" 
                    style={{backgroundColor: designSettings.headerTextColor}}
                  ></div>
                  <Input 
                    id="headerTextColor" 
                    type="text" 
                    value={designSettings.headerTextColor}
                    onChange={(e) => handleChange('headerTextColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DesignPanel;
