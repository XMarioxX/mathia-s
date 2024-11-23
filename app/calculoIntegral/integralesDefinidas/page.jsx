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
    const shapes = [];
    
    switch(tipo) {
      case 'area':
        // Función cuadrática con área sombreada
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.pow(x, 2) / 4;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        // Área sombreada entre x=0 y x=2
        let areaPath = `M${padding + 5*xScale},${height-padding}`;
        for(let x = 0; x <= 2; x += 0.1) {
          const y = Math.pow(x, 2) / 4;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          areaPath += ` L${px},${py}`;
        }
        areaPath += ` L${padding + 7*xScale},${height-padding} Z`;
        shapes.push(<path key="area" d={areaPath} fill="#8884d8" opacity="0.3" />);
        break;
        
      case 'riemann':
        // Función con sumas de Riemann
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.sin(x) + 2;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        // Rectángulos de Riemann
        for(let x = 0; x <= 2; x += 0.5) {
          const y = Math.sin(x) + 2;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          const rectWidth = 0.5 * xScale;
          const rectHeight = y * yScale;
          shapes.push(
            <rect 
              key={`rect${x}`}
              x={px}
              y={py}
              width={rectWidth}
              height={rectHeight}
              fill="#8884d8"
              opacity="0.3"
            />
          );
        }
        break;
        
      case 'fundamental':
        // Función antiderivada
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.pow(x, 3) / 6;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'aplicacion':
        // Función para aplicaciones (ej: trabajo)
        for(let x = -5; x <= 5; x += 0.1) {
          const y = 2 * Math.exp(x/3);
          if (y < 10) {
            const px = padding + (x + 5) * xScale;
            const py = height - (padding + y * yScale);
            path += `${path ? 'L' : 'M'}${px},${py}`;
          }
        }
        break;
    }
    return { path, shapes };
  };

  const { path, shapes } = getPath();

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
        
        {shapes}
        <path d={path} stroke="#8884d8" fill="none" strokeWidth="2" />
      </svg>
    </div>
  );
};

const IntegralesDefinidas = () => {
  const [activeTab, setActiveTab] = useState('definicion');

  const secciones = [
    {
      id: 'definicion',
      titulo: 'Definición y Conceptos',
      icon: <BookOpen className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Integral Definida',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'La integral definida representa el área bajo la curva:',
          ecuacion: '\\int_a^b f(x)dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(c_i)\\Delta x',
          grafica: {
            tipo: 'area',
            title: 'Área bajo la curva'
          }
        },
        {
          titulo: 'Sumas de Riemann',
          icon: <ChevronRight className="w-8 h-8 mt-1" />,
          texto: 'Aproximación del área mediante rectángulos:',
          ecuacion: '\\sum_{i=1}^n f(c_i)\\Delta x, \\text{ donde } \\Delta x = \\frac{b-a}{n}',
          grafica: {
            tipo: 'riemann',
            title: 'Sumas de Riemann'
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
          titulo: 'Propiedades Básicas',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Propiedades fundamentales de la integral definida:',
          ecuacion: '\\begin{align*} \\int_a^b [f(x) ± g(x)]dx &= \\int_a^b f(x)dx ± \\int_a^b g(x)dx \\\\ \\int_a^b cf(x)dx &= c\\int_a^b f(x)dx \\\\ \\int_a^b f(x)dx &= -\\int_b^a f(x)dx \\end{align*}'
        },
        {
          titulo: 'Teorema del Valor Medio',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Existe un punto c en [a,b] tal que:',
          ecuacion: '\\int_a^b f(x)dx = f(c)(b-a)'
        }
      ]
    },
    {
      id: 'teoremas',
      titulo: 'Teoremas Fundamentales',
      icon: <GraduationCap className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Primer Teorema Fundamental',
          icon: <CircleDot className="w-8 h-8 mb-4" />,
          texto: 'Si F es una antiderivada de f en [a,b], entonces:',
          ecuacion: '\\frac{d}{dx}\\int_a^x f(t)dt = f(x)',
          grafica: {
            tipo: 'fundamental',
            title: 'Teorema Fundamental del Cálculo'
          }
        },
        {
          titulo: 'Segundo Teorema Fundamental',
          icon: <Zap className="w-8 h-8 mb-4" />,
          texto: 'El cálculo de la integral definida:',
          ecuacion: '\\int_a^b f(x)dx = F(b) - F(a) = [F(x)]_a^b'
        }
      ]
    },
    {
      id: 'aplicaciones',
      titulo: 'Aplicaciones',
      icon: <Calculator className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Áreas y Volúmenes',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Cálculo de áreas y volúmenes:',
          ecuacion: '\\begin{align*} A &= \\int_a^b |f(x) - g(x)|dx \\\\ V &= \\pi\\int_a^b [r(x)]^2dx \\end{align*}',
          ejemplos: [
            'Área entre curvas',
            'Volúmenes de revolución',
            'Áreas de superficies'
          ]
        },
        {
          titulo: 'Aplicaciones Físicas',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Aplicaciones en física:',
          ecuacion: '\\begin{align*} d &= \\int_a^b v(t)dt \\text{ (distancia)} \\\\ W &= \\int_a^b F(x)dx \\text{ (trabajo)} \\\\ P &= \\int_a^b F(x)dx \\text{ (presión)} \\end{align*}',
          grafica: {
            tipo: 'aplicacion',
            title: 'Trabajo como integral de fuerza'
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
            Integrales Definidas
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Conceptos fundamentales y aplicaciones
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

export default IntegralesDefinidas;