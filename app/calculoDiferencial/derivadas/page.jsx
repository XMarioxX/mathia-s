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
      case 'lineal':
        for(let x = -5; x <= 5; x += 0.1) {
          const y = 2 * x;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'cuadratica':
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.pow(x, 2);
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'exponencial':
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.exp(x);
          if (y < 10) {
            const px = padding + (x + 5) * xScale;
            const py = height - (padding + y * yScale);
            path += `${path ? 'L' : 'M'}${px},${py}`;
          }
        }
        break;
        
      case 'trigonometrica':
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.sin(x);
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
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

const Derivadas = () => {
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
          texto: 'La derivada de una función en un punto representa la razón de cambio instantánea:',
          ecuacion: '\\begin{align*} f\'(x) &= \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} \\\\ f\'(a) &= \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a} \\end{align*}',
          grafica: {
            tipo: 'lineal',
            title: 'Derivada como pendiente de la recta tangente'
          }
        },
        {
          titulo: 'Interpretación Geométrica',
          icon: <ChevronRight className="w-8 h-8 mt-1" />,
          texto: 'La derivada representa la pendiente de la recta tangente a la curva en un punto.',
          ecuacion: '\\begin{align*} m &= f\'(a) \\\\ y - y_1 &= f\'(a)(x - x_1) \\end{align*}'
        }
      ]
    },
    {
      id: 'reglas',
      titulo: 'Reglas de Derivación',
      icon: <CircleDot className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Reglas Básicas',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Reglas fundamentales para calcular derivadas:',
          ecuacion: '\\begin{align*} \\frac{d}{dx}[c] &= 0 \\\\ \\frac{d}{dx}[x^n] &= nx^{n-1} \\\\ \\frac{d}{dx}[e^x] &= e^x \\\\ \\frac{d}{dx}[\\sin(x)] &= \\cos(x) \\end{align*}',
          grafica: {
            tipo: 'cuadratica',
            title: 'Derivada de función cuadrática'
          }
        },
        {
          titulo: 'Reglas de Operaciones',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Reglas para derivar operaciones entre funciones:',
          ecuacion: '\\begin{align*} \\frac{d}{dx}[f(x) ± g(x)] &= f\'(x) ± g\'(x) \\\\ \\frac{d}{dx}[f(x)g(x)] &= f\'(x)g(x) + f(x)g\'(x) \\\\ \\frac{d}{dx}[\\frac{f(x)}{g(x)}] &= \\frac{f\'(x)g(x) - f(x)g\'(x)}{[g(x)]^2} \\end{align*}'
        }
      ]
    },
    {
      id: 'teoremas',
      titulo: 'Teoremas Fundamentales',
      icon: <GraduationCap className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Teorema de Rolle',
          icon: <CircleDot className="w-8 h-8 mb-4" />,
          texto: 'Si f es continua en [a,b] y derivable en (a,b), con f(a) = f(b), existe c en (a,b) tal que f\'(c) = 0',
          ecuacion: '\\exists c \\in (a,b) : f\'(c) = 0'
        },
        {
          titulo: 'Teorema del Valor Medio',
          icon: <Zap className="w-8 h-8 mb-4" />,
          texto: 'Si f es continua en [a,b] y derivable en (a,b), existe c en (a,b) tal que:',
          ecuacion: 'f\'(c) = \\frac{f(b) - f(a)}{b - a}'
        }
      ]
    },
    {
      id: 'aplicaciones',
      titulo: 'Aplicaciones',
      icon: <Calculator className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Optimización',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Encontrar máximos y mínimos:',
          ecuacion: 'f\'(x) = 0 \\text{ y } f\'\'(x) \\text{ para clasificar}',
          ejemplos: [
            'Maximización de beneficios',
            'Minimización de costos',
            'Problemas de geometría'
          ]
        },
        {
          titulo: 'Razón de Cambio',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Aplicaciones en física y economía:',
          ecuacion: '\\begin{align*} v(t) &= \\frac{ds}{dt} \\text{ (velocidad)} \\\\ a(t) &= \\frac{dv}{dt} \\text{ (aceleración)} \\\\ CM(q) &= \\frac{dC}{dq} \\text{ (costo marginal)} \\end{align*}',
          grafica: {
            tipo: 'exponencial',
            title: 'Crecimiento exponencial y su derivada'
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
            Derivadas
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Fundamentos del cálculo diferencial y sus aplicaciones
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

export default Derivadas;