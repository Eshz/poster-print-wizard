
import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Type, Layout, Palette, ChevronDown } from 'lucide-react';
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
  const [advancedOpen, setAdvancedOpen] = React.useState(false);

  const handleChange = (key: string, value: string) => {
    setDesignSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleColorPairSelect = (pair: {bg: string, fg: string}) => {
    // Update all colors when a color pair is selected
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
    <div className="space-y-6 p-1">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Design Settings</h2>
      </div>
      
      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="layout">
            <Layout className="mr-2 h-4 w-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="typography">
            <Type className="mr-2 h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="colors">
            <Palette className="mr-2 h-4 w-4" />
            Colors
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="layout">Poster Layout</Label>
                <Select 
                  value={designSettings.layout} 
                  onValueChange={(value) => handleChange('layout', value)}
                >
                  <SelectTrigger>
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
                <h3 className="text-sm font-medium mb-2">Layout Preview</h3>
                <div className="h-48 bg-gray-100 rounded-md border flex items-center justify-center">
                  {designSettings.layout === 'classic' && (
                    <div className="w-full h-full p-4">
                      <div className="w-full h-[20%] bg-gray-300 mb-2"></div>
                      <div className="flex h-[75%] gap-2">
                        <div className="w-1/2 bg-gray-200"></div>
                        <div className="w-1/2 bg-gray-200"></div>
                      </div>
                    </div>
                  )}
                  {designSettings.layout === 'modern' && (
                    <div className="w-full h-full p-4">
                      <div className="w-full h-[20%] bg-gray-300 mb-2"></div>
                      <div className="flex h-[75%] gap-2">
                        <div className="w-1/3 bg-gray-200"></div>
                        <div className="w-1/3 bg-gray-200"></div>
                        <div className="w-1/3 bg-gray-200"></div>
                      </div>
                    </div>
                  )}
                  {designSettings.layout === 'focus' && (
                    <div className="w-full h-full p-4">
                      <div className="w-full h-[20%] bg-gray-300 mb-2"></div>
                      <div className="flex h-[75%] justify-center">
                        <div className="w-2/3 bg-gray-200"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="typography" className="space-y-4">
          <Card>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleFont">Title Font</Label>
                <Select 
                  value={designSettings.titleFont} 
                  onValueChange={(value) => handleChange('titleFont', value)}
                >
                  <SelectTrigger>
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
                <Label htmlFor="contentFont">Content Font</Label>
                <Select 
                  value={designSettings.contentFont} 
                  onValueChange={(value) => handleChange('contentFont', value)}
                >
                  <SelectTrigger>
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardContent className="pt-4 space-y-4">
              <h3 className="text-sm font-medium">Accessible Color Combinations</h3>
              <div className="grid grid-cols-2 gap-2">
                {accessibleColorPairs.map((pair, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="h-auto p-2 justify-start"
                    onClick={() => handleColorPairSelect(pair)}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded flex items-center justify-center" 
                        style={{backgroundColor: pair.bg, color: pair.fg}}
                      >
                        Aa
                      </div>
                      <span className="text-xs">{pair.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
              
              <Separator className="my-2" />
              
              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Advanced Color Settings</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${advancedOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowColorChecker(true)}
                    size="sm"
                    className="mb-2"
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Check Contrast
                  </Button>
                
                  {/* QR Code Color */}
                  <div className="space-y-2">
                    <Label htmlFor="qr-color">QR Code Color</Label>
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
                        className="w-28"
                      />
                    </div>
                  </div>
                  
                  {/* Header Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="headerBgColor">Header Background</Label>
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
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="headerTextColor">Header Text</Label>
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
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Section Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sectionBgColor">Section Background</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded border" 
                          style={{backgroundColor: designSettings.sectionBgColor}}
                        ></div>
                        <Input 
                          id="sectionBgColor" 
                          type="text" 
                          value={designSettings.sectionBgColor}
                          onChange={(e) => handleChange('sectionBgColor', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sectionTitleColor">Section Title</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded border" 
                          style={{backgroundColor: designSettings.sectionTitleColor}}
                        ></div>
                        <Input 
                          id="sectionTitleColor" 
                          type="text" 
                          value={designSettings.sectionTitleColor}
                          onChange={(e) => handleChange('sectionTitleColor', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Takeaways Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="keyPointsBgColor">Key Takeaways Background</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded border" 
                          style={{backgroundColor: designSettings.keyPointsBgColor}}
                        ></div>
                        <Input 
                          id="keyPointsBgColor" 
                          type="text" 
                          value={designSettings.keyPointsBgColor}
                          onChange={(e) => handleChange('keyPointsBgColor', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="keyPointsTextColor">Key Takeaways Title</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded border" 
                          style={{backgroundColor: designSettings.keyPointsTextColor}}
                        ></div>
                        <Input 
                          id="keyPointsTextColor" 
                          type="text" 
                          value={designSettings.keyPointsTextColor}
                          onChange={(e) => handleChange('keyPointsTextColor', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Color Contrast Checker Dialog */}
      <Dialog open={showColorChecker} onOpenChange={setShowColorChecker}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Color Contrast Checker</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color1">Background Color</Label>
                <div className="flex gap-2">
                  <Input 
                    id="color1"
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-16 p-1 h-10"
                  />
                  <Input 
                    type="text" 
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color2">Text Color</Label>
                <div className="flex gap-2">
                  <Input 
                    id="color2"
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-16 p-1 h-10"
                  />
                  <Input 
                    type="text" 
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="rounded-md p-4" style={{backgroundColor: color1, color: color2}}>
              <p className="text-xl font-bold">Sample Text</p>
              <p>This is how your text will look with these colors.</p>
            </div>
            
            <div className="pt-2 space-y-2">
              <p className="font-medium">Contrast Ratio: {contrastRatio.toFixed(2)}:1</p>
              
              <div className="flex gap-2">
                <Badge variant={isAA ? "default" : "destructive"}>
                  {isAA ? "✓" : "✗"} AA ({isAA ? "Pass" : "Fail"})
                </Badge>
                
                <Badge variant={isAAA ? "default" : "destructive"}>
                  {isAAA ? "✓" : "✗"} AAA ({isAAA ? "Pass" : "Fail"})
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground pt-2">
                For accessibility, text should have a contrast ratio of at least 4.5:1 (AA) or 7:1 (AAA) 
                against its background.
              </p>
            </div>
            
            <Button 
              onClick={() => {
                setDesignSettings(prev => ({
                  ...prev,
                  headerBgColor: color1,
                  headerTextColor: color2,
                  sectionTitleColor: color1,
                  keyPointsTextColor: color1,
                  sectionBgColor: color2 === '#000000' ? '#e6ebff' : '#f5f7ff',
                  keyPointsBgColor: color2 === '#000000' ? '#e6ebff' : '#f5f7ff'
                }));
                setShowColorChecker(false);
              }}
              disabled={!isAA}
              className="w-full"
            >
              Apply These Colors
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DesignPanel;
