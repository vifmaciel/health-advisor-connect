
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Image } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BackgroundControllerProps {
  onBackgroundChange: (background: string) => void;
}

const BackgroundController: React.FC<BackgroundControllerProps> = ({ 
  onBackgroundChange 
}) => {
  const [customColor, setCustomColor] = useState('#f8fafc');
  const [imageUrl, setImageUrl] = useState('');

  const presetColors = [
    { name: 'Cinza Claro', value: '#f8fafc' },
    { name: 'Azul Claro', value: '#eff6ff' },
    { name: 'Verde Claro', value: '#f0fdf4' },
    { name: 'Roxo Claro', value: '#faf5ff' },
    { name: 'Rosa Claro', value: '#fdf2f8' },
    { name: 'Amarelo Claro', value: '#fffbeb' },
  ];

  const gradients = [
    { name: 'Health', value: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)' },
    { name: 'Azul', value: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' },
    { name: 'Verde', value: 'linear-gradient(135deg, #166534 0%, #22c55e 100%)' },
    { name: 'Sunset', value: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)' },
  ];

  const handleColorChange = (color: string) => {
    onBackgroundChange(color);
  };

  const handleGradientChange = (gradient: string) => {
    onBackgroundChange(gradient);
  };

  const handleImageChange = () => {
    if (imageUrl) {
      onBackgroundChange(`url(${imageUrl})`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Palette size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Personalizar Background</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cores Preset */}
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-2 block">
                Cores Sólidas
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {presetColors.map((color) => (
                  <Button
                    key={color.value}
                    variant="outline"
                    size="sm"
                    className="h-12 p-1"
                    onClick={() => handleColorChange(color.value)}
                  >
                    <div 
                      className="w-full h-full rounded"
                      style={{ backgroundColor: color.value }}
                    />
                  </Button>
                ))}
              </div>
            </div>

            {/* Gradientes */}
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-2 block">
                Gradientes
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {gradients.map((gradient) => (
                  <Button
                    key={gradient.name}
                    variant="outline"
                    size="sm"
                    className="h-12 p-1"
                    onClick={() => handleGradientChange(gradient.value)}
                  >
                    <div 
                      className="w-full h-full rounded"
                      style={{ background: gradient.value }}
                    />
                  </Button>
                ))}
              </div>
            </div>

            {/* Cor Personalizada */}
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-2 block">
                Cor Personalizada
              </Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-16 h-8 p-0 border-0"
                />
                <Button 
                  size="sm" 
                  onClick={() => handleColorChange(customColor)}
                  className="flex-1"
                >
                  Aplicar
                </Button>
              </div>
            </div>

            {/* Imagem de Fundo */}
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-2 block">
                Imagem de Fundo
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="URL da imagem..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleImageChange}>
                  <Image size={14} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default BackgroundController;
