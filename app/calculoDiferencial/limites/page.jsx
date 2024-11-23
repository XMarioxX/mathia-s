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
    
    switch(tipo) {
      case 'discontinua':
        // Función con discontinuidad en x = 0
        for(let x = -5; x <= 5; x += 0.1) {
          if (Math.abs(x) > 0.1) {
            const y = 1/x;
            if (Math.abs(y) < 10) {
              const px = padding + (x + 5) * xScale;
              const py = height - (padding + y * yScale);
              path += `${path ? 'L' : 'M'}${px},${py}`;
            }
          }
        }
        break;
        
      case 'asintota':
        // Función con asíntota horizontal
        for(let x = -5; x <= 5; x += 0.1) {
          const y = 1 - 1/(x*x + 1);
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'lateral':
        // Función para límites laterales
        for(let x = -5; x <= 5; x += 0.1) {
          const y = x < 0 ? x*x : 2*x;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'infinito':
        // Límite al infinito
        for(let x = -5; x <= 5; x += 0.1) {
          const y = 1/x + 2;
          if (Math.abs(y) < 10) {
            const px = padding + (x + 5) * xScale;
            const py = height - (padding + y * yScale);
            path += `${path ? 'L' : 'M'}${px},${py}`;
          }
        }
        break;
    }
    return path;
  };

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
        
        <path d={getPath()} stroke="#8884d8" fill="none" strokeWidth="2" />
      </svg>
    </div>
  );
};

const Limites = () => {
  const [activeTab, setActiveTab] = useState('definicion');

  const secciones = [
    {
      id: 'definicion',
      titulo: 'Definición y Conceptos',
      icon: <BookOpen className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Definición Formal',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'El límite de una función f(x) cuando x tiende a un valor a es L si:',
          ecuacion: '\\lim_{x \\to a} f(x) = L \\iff \\forall \\epsilon > 0, \\exists \\delta > 0 : |x-a| < \\delta \\implies |f(x)-L| < \\epsilon',
          grafica: {
            tipo: 'discontinua',
            title: 'Límite en un punto de discontinuidad'
          }
        },
        {
          titulo: 'Límites Laterales',
          icon: <ChevronRight className="w-8 h-8 mt-1" />,
          texto: 'Un límite existe si y solo si los límites laterales son iguales:',
          ecuacion: '\\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L',
          grafica: {
            tipo: 'lateral',
            title: 'Límites laterales diferentes'
          }
        }
      ]
    },
    {
      id: 'propiedades',
      titulo: 'Propiedades',
      icon: <CircleDot className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Propiedades Algebraicas',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Propiedades fundamentales de los límites:',
          ecuacion: '\\begin{align*} \\lim_{x \\to a} [f(x) ± g(x)] &= \\lim_{x \\to a} f(x) ± \\lim_{x \\to a} g(x) \\\\ \\lim_{x \\to a} [f(x)g(x)] &= \\lim_{x \\to a} f(x) \\cdot \\lim_{x \\to a} g(x) \\\\ \\lim_{x \\to a} \\frac{f(x)}{g(x)} &= \\frac{\\lim_{x \\to a} f(x)}{\\lim_{x \\to a} g(x)} \\end{align*}'
        },
        {
          titulo: 'Límites Especiales',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Límites fundamentales:',
          ecuacion: '\\begin{align*} \\lim_{x \\to 0} \\frac{\\sin x}{x} &= 1 \\\\ \\lim_{x \\to \\infty} (1 + \\frac{1}{x})^x &= e \\end{align*}',
          grafica: {
            tipo: 'asintota',
            title: 'Límite con asíntota horizontal'
          }
        }
      ]
    },
    {
      id: 'teoremas',
      titulo: 'Teoremas Fundamentales',
      icon: <GraduationCap className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Teorema del Sándwich',
          icon: <CircleDot className="w-8 h-8 mb-4" />,
          texto: 'Si g(x) ≤ f(x) ≤ h(x) y los límites de g y h coinciden:',
          ecuacion: '\\lim_{x \\to a} g(x) = \\lim_{x \\to a} h(x) = L \\implies \\lim_{x \\to a} f(x) = L'
        },
        {
          titulo: 'Límites al Infinito',
          icon: <Zap className="w-8 h-8 mb-4" />,
          texto: 'Comportamiento de funciones cuando x tiende a infinito:',
          ecuacion: '\\lim_{x \\to \\infty} \\frac{P(x)}{Q(x)} = \\begin{cases} \\infty & \\text{grado}(P) > \\text{grado}(Q) \\\\ 0 & \\text{grado}(P) < \\text{grado}(Q) \\\\ \\frac{a_n}{b_m} & \\text{grado}(P) = \\text{grado}(Q) \\end{cases}',
          grafica: {
            tipo: 'infinito',
            title: 'Límite al infinito'
          }
        }
      ]
    },
    {
      id: 'aplicaciones',
      titulo: 'Aplicaciones',
      icon: <Calculator className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Continuidad',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Una función es continua en a si:',
          ecuacion: '\\lim_{x \\to a} f(x) = f(a)',
          ejemplos: [
            'Análisis de discontinuidades',
            'Funciones definidas por partes',
            'Continuidad en intervalos'
          ]
        },
        {
          titulo: 'Asíntotas',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Tipos de asíntotas:',
          ecuacion: '\\begin{align*} \\text{Vertical: } & \\lim_{x \\to a} f(x) = \\pm\\infty \\\\ \\text{Horizontal: } & \\lim_{x \\to \\infty} f(x) = L \\\\ \\text{Oblicua: } & \\lim_{x \\to \\infty} [f(x) - (mx + b)] = 0 \\end{align*}',
          grafica: {
            tipo: 'asintota',
            title: 'Asíntotas de una función'
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-br">
      <Card className="border-t-4 border-primary">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Límites
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Fundamentos del cálculo y análisis de funciones
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

export default Limites;