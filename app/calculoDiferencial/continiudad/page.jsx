"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Equation } from '@/components/ecuacion';
import { 
  BookOpen, 
  Activity, 
  Target, 
  Clock, 
  LineChart,
  MinusCircle, 
  AlertCircle, 
  CheckCircle2, 
  Binary,
  GraduationCap,
  Lightbulb,
  Calculator
} from 'lucide-react';

const GraficaFuncion = ({ tipo, title }) => {
  // Configuración común para todas las gráficas
  const width = 300;
  const height = 200;
  const padding = 20;
  const xScale = (width - 2 * padding) / 10;
  const yScale = (height - 2 * padding) / 10;

  // Función para generar el path según el tipo de función
  const getPath = () => {
    let path = '';
    
    switch(tipo) {
      case 'continua':
        // Función cuadrática
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.pow(x, 2);
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'discontinuidadEvitable':
        // Función (x^2-1)/(x-1)
        for(let x = -5; x <= 5; x += 0.1) {
          if(Math.abs(x - 1) > 0.1) {
            const y = (Math.pow(x, 2) - 1) / (x - 1);
            const px = padding + (x + 5) * xScale;
            const py = height - (padding + y * yScale);
            path += `${path ? 'L' : 'M'}${px},${py}`;
          }
        }
        break;
        
      case 'discontinuidadSalto':
        // Función escalón
        path = `M${padding},${height/2 + padding} H${width/2} ` + // Parte inferior
               `M${width/2},${height/2 - padding} H${width - padding}`; // Parte superior
        break;
        
      case 'discontinuidadEsencial':
        // Función tan(x)
        for(let x = -5; x <= 5; x += 0.1) {
          if(Math.abs(Math.cos(x)) > 0.1) {
            const y = Math.tan(x);
            if(Math.abs(y) < 5) {
              const px = padding + (x + 5) * xScale;
              const py = height - (padding + y * yScale);
              path += `${path ? 'L' : 'M'}${px},${py}`;
            }
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
        {/* Ejes */}
        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="currentColor" />
        <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="currentColor" />
        
        {/* Marcas en los ejes */}
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
        
        {/* Función */}
        <path d={getPath()} stroke="#8884d8" fill="none" strokeWidth="2" />
        
        {/* Punto de discontinuidad si aplica */}
        {tipo === 'discontinuidadEvitable' && (
          <circle 
            cx={padding + 6*xScale} 
            cy={height - (padding + 2*yScale)} 
            r="3" 
            fill="red" 
          />
        )}
      </svg>
    </div>
  );
};

const Continuidad = () => {
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
          texto: 'Una función f(x) es continua en un punto a si y solo si se cumplen estas tres condiciones:',
          ecuaciones: [
            'f(a) \\text{ existe}',
            '\\lim_{x \\to a} f(x) \\text{ existe}',
            'f(a) = \\lim_{x \\to a} f(x)'
          ],
          grafica: {
            tipo: 'continua',
            title: 'Función Continua: f(x) = x²'
          }
        },
        {
          titulo: 'Continuidad en un Intervalo',
          icon: <MinusCircle className="w-8 h-8 mt-1" />,
          texto: 'Una función es continua en un intervalo si es continua en cada punto del intervalo.',
          ejemplos: [
            {
              texto: 'Ejemplo: Función polinómica',
              ecuacion: 'f(x) = x^2 + 2x + 1'
            },
            {
              texto: 'Ejemplo: Función exponencial',
              ecuacion: 'f(x) = e^x'
            }
          ]
        }
      ]
    },
    {
      id: 'tipos',
      titulo: 'Tipos de Discontinuidad',
      icon: <Activity className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Discontinuidad Evitable',
          icon: <CheckCircle2 className="w-8 h-8 mb-4" />,
          texto: 'Se produce cuando existe el límite pero no coincide con el valor de la función.',
          ecuacion: 'f(x) = \\begin{cases} \\frac{x^2-1}{x-1} & x \\neq 1 \\\\ 2 & x = 1 \\end{cases}',
          grafica: {
            tipo: 'discontinuidadEvitable',
            title: 'Discontinuidad Evitable'
          }
        },
        {
          titulo: 'Discontinuidad de Salto',
          icon: <AlertCircle className="w-8 h-8 mb-4" />,
          texto: 'Los límites laterales existen pero son diferentes.',
          ecuacion: 'f(x) = \\begin{cases} 1 & x \\geq 0 \\\\ -1 & x < 0 \\end{cases}',
          grafica: {
            tipo: 'discontinuidadSalto',
            title: 'Discontinuidad de Salto'
          }
        },
        {
          titulo: 'Discontinuidad Esencial',
          icon: <Binary className="w-8 h-8 mb-4" />,
          texto: 'Al menos uno de los límites laterales no existe o es infinito.',
          ecuacion: 'f(x) = \\tan(x) \\text{ en } x = \\frac{\\pi}{2}',
          grafica: {
            tipo: 'discontinuidadEsencial',
            title: 'Discontinuidad Esencial: f(x) = tan(x)'
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
          titulo: 'Teorema del Valor Intermedio',
          icon: <Target className="w-8 h-8 mb-4" />,
          texto: 'Si f es continua en [a,b] y k está entre f(a) y f(b), existe c en [a,b] tal que f(c) = k',
          ecuacion: '\\forall k \\in [f(a),f(b)], \\exists c \\in [a,b] : f(c) = k'
        },
        {
          titulo: 'Teorema de Weierstrass',
          icon: <Lightbulb className="w-8 h-8 mb-4" />,
          texto: 'Si f es continua en un intervalo cerrado [a,b], entonces f alcanza un máximo y un mínimo absoluto.',
          ecuacion: '\\exists x_1,x_2 \\in [a,b] : f(x_1) \\leq f(x) \\leq f(x_2) \\text{ } \\forall x \\in [a,b]'
        }
      ]
    },
    {
      id: 'aplicaciones',
      titulo: 'Aplicaciones Prácticas',
      icon: <Calculator className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Modelado Físico',
          icon: <Clock className="w-8 h-8 mb-4" />,
          texto: 'Movimiento Armónico Simple:',
          ecuacion: 'x(t) = A\\cos(\\omega t + \\phi)',
          ejemplos: [
            'Oscilaciones mecánicas',
            'Circuitos eléctricos',
            'Ondas sonoras'
          ]
        },
        {
          titulo: 'Análisis Económico',
          icon: <Target className="w-8 h-8 mb-4" />,
          texto: 'Función de Costo Marginal:',
          ecuacion: 'C\'(x) = \\lim_{h \\to 0} \\frac{C(x+h) - C(x)}{h}',
          aplicaciones: [
            'Optimización de producción',
            'Análisis de mercado',
            'Predicción de tendencias'
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
            Continuidad de Funciones
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Explorando los conceptos fundamentales del análisis matemático
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
                        
                        {item.ecuaciones && (
                          <div className="space-y-2 my-4">
                            {item.ecuaciones.map((eq, idx) => (
                              <div key={idx} className="p-2 rounded-lg ">
                                <Equation math={eq} />
                              </div>
                            ))}
                          </div>
                        )}

                        {item.ecuacion && (
                          <div className="p-4 rounded-lg  overflow-x-auto">
                            <Equation math={item.ecuacion} />
                          </div>
                        )}

                        {item.grafica && (
                          <GraficaFuncion tipo={item.grafica.tipo} title={item.grafica.title} />
                        )}

                        {item.ejemplos && (
                          <div className="space-y-2 mt-4">
                            {item.ejemplos.map((ejemplo, idx) => (
                              <div key={idx} className="p-2 rounded-lg ">
                                <p className="font-medium">{ejemplo.texto}</p>
                                {ejemplo.ecuacion && (
                                  <div className="mt-1">
                                    <Equation math={ejemplo.ecuacion} />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {item.aplicaciones && (
                          <ul className="list-disc pl-6 space-y-2">
                            {item.aplicaciones.map((aplicacion, idx) => (
                              <li key={idx}>{aplicacion}</li>
                            ))}
                          </ul>
                        )}
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

export default Continuidad;