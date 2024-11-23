"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Equation } from '@/components/ecuacion';
import { 
  BookOpen, 
  LineChart,
  ChevronRight,
  CircleDot,
  GraduationCap,
  Zap,
  Calculator
} from 'lucide-react';

const GraficaFuncion = ({ tipo, title }) => {
  const width = 300;
  const height = 200;
  const padding = 20;
  const xScale = (width - 2 * padding) / 10;
  const yScale = (height - 2 * padding) / 10;

  const getPath = () => {
    let path = '';
    const familyCurves = [];
    
    switch(tipo) {
      case 'familia':
        // Familia de antiderivadas
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.pow(x, 2) / 2;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        // Diferentes constantes C
        [-2, -1, 0, 1, 2].forEach(c => {
          let familyPath = '';
          for(let x = -5; x <= 5; x += 0.1) {
            const y = Math.pow(x, 2) / 2 + c;
            const px = padding + (x + 5) * xScale;
            const py = height - (padding + y * yScale);
            familyPath += `${familyPath ? 'L' : 'M'}${px},${py}`;
          }
          familyCurves.push(
            <path 
              key={`curve${c}`} 
              d={familyPath} 
              stroke="#8884d8" 
              strokeOpacity="0.3" 
              fill="none" 
              strokeWidth="1" 
            />
          );
        });
        break;
        
      case 'potencias':
        // Función polinómica
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.pow(x, 3) / 3;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'trigonometrica':
        // Función trigonométrica
        for(let x = -5; x <= 5; x += 0.1) {
          const y = -Math.cos(x);
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'exponencial':
        // Función exponencial
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.exp(x);
          if (y < 10) {
            const px = padding + (x + 5) * xScale;
            const py = height - (padding + y * yScale);
            path += `${path ? 'L' : 'M'}${px},${py}`;
          }
        }
        break;
    }
    return { path, familyCurves };
  };

  const { path, familyCurves } = getPath();

  return (
    <div className="w-full mt-4">
      <p className="text-center text-sm font-medium mb-2">{title}</p>
      <svg width={width} height={height} className="mx-auto">
        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="currentColor" />
        <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="currentColor" />
        
        {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(x => (
          <g key={`x${x}`}>
            <line 
              x1={padding + (x+5)*xScale} 
              y1={height-padding-5} 
              x2={padding + (x+5)*xScale} 
              y2={height-padding+5} 
              stroke="currentColor" 
            />
            <text 
              x={padding + (x+5)*xScale} 
              y={height-padding+15} 
              textAnchor="middle" 
              fontSize="10"
              fill="currentColor"
            >
              {x}
            </text>
          </g>
        ))}
        
        {familyCurves}
        <path d={path} stroke="#8884d8" fill="none" strokeWidth="2" />
      </svg>
    </div>
  );
};

const IntegralesIndefinidas = () => {
  const [activeTab, setActiveTab] = useState('definicion');

  const secciones = [
    {
      id: 'definicion',
      titulo: 'Definición y Conceptos',
      icon: <BookOpen className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Integral Indefinida',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'La integral indefinida representa la familia de antiderivadas:',
          ecuacion: '\\begin{align*} \\int f(x)dx &= F(x) + C \\\\ \\text{donde } &\\frac{d}{dx}F(x) = f(x) \\end{align*}',
          grafica: {
            tipo: 'familia',
            title: 'Familia de antiderivadas'
          }
        },
        {
          titulo: 'Propiedades Básicas',
          icon: <ChevronRight className="w-8 h-8 mt-1" />,
          texto: 'Propiedades fundamentales de la integral indefinida:',
          ecuacion: '\\begin{align*} \\int kf(x)dx &= k\\int f(x)dx \\\\ \\int [f(x) ± g(x)]dx &= \\int f(x)dx ± \\int g(x)dx \\end{align*}'
        }
      ]
    },
    {
      id: 'metodos',
      titulo: 'Métodos de Integración',
      icon: <CircleDot className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Integración Directa',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Fórmulas básicas de integración:',
          ecuacion: '\\begin{align*} \\int x^n dx &= \\frac{x^{n+1}}{n+1} + C, n ≠ -1 \\\\ \\int \\frac{1}{x} dx &= \\ln|x| + C \\\\ \\int e^x dx &= e^x + C \\\\ \\int \\sin x dx &= -\\cos x + C \\end{align*}',
          grafica: {
            tipo: 'potencias',
            title: 'Integral de función potencia'
          }
        },
        {
          titulo: 'Integración por Partes',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Método para productos de funciones:',
          ecuacion: '\\int u dv = uv - \\int v du',
          ejemplos: [
            'Productos con x y e^x',
            'Productos con funciones trigonométricas',
            'Productos con logaritmos'
          ]
        }
      ]
    },
    {
      id: 'especiales',
      titulo: 'Integrales Especiales',
      icon: <GraduationCap className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Funciones Trigonométricas',
          icon: <CircleDot className="w-8 h-8 mb-4" />,
          texto: 'Integrales de funciones trigonométricas:',
          ecuacion: '\\begin{align*} \\int \\sin x dx &= -\\cos x + C \\\\ \\int \\cos x dx &= \\sin x + C \\\\ \\int \\sec^2 x dx &= \\tan x + C \\end{align*}',
          grafica: {
            tipo: 'trigonometrica',
            title: 'Integral de función trigonométrica'
          }
        },
        {
          titulo: 'Funciones Exponenciales',
          icon: <Zap className="w-8 h-8 mb-4" />,
          texto: 'Integrales de funciones exponenciales:',
          ecuacion: '\\begin{align*} \\int e^x dx &= e^x + C \\\\ \\int a^x dx &= \\frac{a^x}{\\ln a} + C \\\\ \\int \\ln x dx &= x\\ln x - x + C \\end{align*}',
          grafica: {
            tipo: 'exponencial',
            title: 'Integral de función exponencial'
          }
        }
      ]
    },
    {
      id: 'tecnicas',
      titulo: 'Técnicas Avanzadas',
      icon: <Calculator className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Sustitución Trigonométrica',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Para expresiones con raíces cuadradas:',
          ecuacion: '\\begin{align*} \\sqrt{a^2-x^2} &\\rightarrow x = a\\sin \\theta \\\\ \\sqrt{a^2+x^2} &\\rightarrow x = a\\tan \\theta \\\\ \\sqrt{x^2-a^2} &\\rightarrow x = a\\sec \\theta \\end{align*}'
        },
        {
          titulo: 'Fracciones Parciales',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Para fracciones racionales:',
          ecuacion: '\\frac{P(x)}{Q(x)} = \\frac{A}{x-a} + \\frac{Bx+C}{x^2+px+q} + ...',
          ejemplos: [
            'Factores lineales simples',
            'Factores lineales repetidos',
            'Factores cuadráticos'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-br">
      <Card className="border-t-4 border-primary">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Integrales Indefinidas
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Antiderivadas y métodos de integración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {secciones.map((seccion) => (
                <TabsTrigger 
                  key={seccion.id} 
                  value={seccion.id}
                  className="flex items-center gap-2 transition-all duration-200"
                >
                  {seccion.icon}
                  <span className="hidden md:inline">{seccion.titulo}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {secciones.map((seccion) => (
              <TabsContent key={seccion.id} value={seccion.id}>
                <div className="grid gap-6 md:grid-cols-2">
                  {seccion.contenido.map((item, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      <CardHeader className="border-b">
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <CardTitle className="text-xl">{item.titulo}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 p-6">
                        <p className="leading-relaxed">
                          {item.texto}
                        </p>
                        
                        {item.ecuacion && (
                          <div className="p-4 rounded-lg overflow-x-auto">
                            <Equation math={item.ecuacion} />
                          </div>
                        )}

                        {item.grafica && (
                          <GraficaFuncion tipo={item.grafica.tipo} title={item.grafica.title} />
                        )}

                        {item.ejemplos && Array.isArray(item.ejemplos) ? (
                          <div className="space-y-2 mt-4">
                            {item.ejemplos.map((ejemplo, idx) => (
                              <div key={idx} className="p-2 rounded-lg">
                                {typeof ejemplo === 'string' ? (
                                  <p className="font-medium">{ejemplo}</p>
                                ) : (
                                  <>
                                    <p className="font-medium">{ejemplo.texto}</p>
                                    {ejemplo.ecuacion && (
                                      <div className="mt-1">
                                        <Equation math={ejemplo.ecuacion} />
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegralesIndefinidas;