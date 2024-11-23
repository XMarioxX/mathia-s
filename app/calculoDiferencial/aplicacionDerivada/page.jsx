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
      case 'maximos':
        // Función cuadrática para máximos y mínimos
        for(let x = -5; x <= 5; x += 0.1) {
          const y = -0.5 * Math.pow(x, 2) + 2;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'crecimiento':
        // Función para análisis de crecimiento
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.pow(x, 3) / 10;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'concavidad':
        // Función para análisis de concavidad
        for(let x = -5; x <= 5; x += 0.1) {
          const y = 0.2 * Math.pow(x, 3) - x;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'razon':
        // Función para razón de cambio
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.exp(x/2);
          if (y < 10) {
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

const AplicacionesDerivada = () => {
  const [activeTab, setActiveTab] = useState('optimizacion');

  const secciones = [
    {
      id: 'optimizacion',
      titulo: 'Optimización',
      icon: <BookOpen className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Máximos y Mínimos',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Para encontrar máximos y mínimos locales:',
          ecuacion: '\\begin{align*} f\'(x) &= 0 \\text{ (puntos críticos)} \\\\ f\'\'(x) &< 0 \\text{ (máximo local)} \\\\ f\'\'(x) &> 0 \\text{ (mínimo local)} \\end{align*}',
          grafica: {
            tipo: 'maximos',
            title: 'Máximos y mínimos de una función'
          }
        },
        {
          titulo: 'Problemas de Optimización',
          icon: <ChevronRight className="w-8 h-8 mt-1" />,
          texto: 'Aplicaciones prácticas:',
          ecuacion: '\\begin{align*} & \\text{1. Maximizar área/volumen} \\\\ & \\text{2. Minimizar costos} \\\\ & \\text{3. Optimizar tiempo/distancia} \\end{align*}',
          ejemplos: [
            'Diseño de contenedores',
            'Maximización de ganancias',
            'Optimización de recursos'
          ]
        }
      ]
    },
    {
      id: 'analisis',
      titulo: 'Análisis de Funciones',
      icon: <CircleDot className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Crecimiento y Decrecimiento',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Análisis del comportamiento de la función:',
          ecuacion: '\\begin{align*} f\'(x) &> 0 \\text{ → f es creciente} \\\\ f\'(x) &< 0 \\text{ → f es decreciente} \\end{align*}',
          grafica: {
            tipo: 'crecimiento',
            title: 'Análisis de crecimiento'
          }
        },
        {
          titulo: 'Concavidad',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Análisis de la concavidad usando la segunda derivada:',
          ecuacion: '\\begin{align*} f\'\'(x) &> 0 \\text{ → concavidad hacia arriba} \\\\ f\'\'(x) &< 0 \\text{ → concavidad hacia abajo} \\\\ f\'\'(x) &= 0 \\text{ → punto de inflexión} \\end{align*}',
          grafica: {
            tipo: 'concavidad',
            title: 'Análisis de concavidad'
          }
        }
      ]
    },
    {
      id: 'aplicaciones',
      titulo: 'Aplicaciones Físicas',
      icon: <GraduationCap className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Movimiento',
          icon: <CircleDot className="w-8 h-8 mb-4" />,
          texto: 'Análisis del movimiento de partículas:',
          ecuacion: '\\begin{align*} v(t) &= \\frac{ds}{dt} \\text{ (velocidad)} \\\\ a(t) &= \\frac{dv}{dt} = \\frac{d^2s}{dt^2} \\text{ (aceleración)} \\end{align*}',
          ejemplos: [
            'Movimiento rectilíneo',
            'Caída libre',
            'Movimiento de proyectiles'
          ]
        },
        {
          titulo: 'Razones de Cambio',
          icon: <Zap className="w-8 h-8 mb-4" />,
          texto: 'Tasas de variación en fenómenos físicos:',
          ecuacion: '\\begin{align*} \\frac{dT}{dt} &\\text{ (razón de cambio de temperatura)} \\\\ \\frac{dV}{dt} &\\text{ (razón de cambio de volumen)} \\end{align*}',
          grafica: {
            tipo: 'razon',
            title: 'Razón de cambio'
          }
        }
      ]
    },
    {
      id: 'economia',
      titulo: 'Aplicaciones Económicas',
      icon: <Calculator className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Análisis Marginal',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Conceptos económicos fundamentales:',
          ecuacion: '\\begin{align*} CM(q) &= \\frac{dC}{dq} \\text{ (costo marginal)} \\\\ IM(q) &= \\frac{dI}{dq} \\text{ (ingreso marginal)} \\\\ UM(q) &= \\frac{dU}{dq} \\text{ (utilidad marginal)} \\end{align*}',
          ejemplos: [
            'Análisis de costos',
            'Maximización de beneficios',
            'Elasticidad de la demanda'
          ]
        },
        {
          titulo: 'Elasticidad',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Medida de sensibilidad de variables económicas:',
          ecuacion: '\\begin{align*} E_p &= \\frac{dQ}{dP} \\cdot \\frac{P}{Q} \\text{ (elasticidad precio)} \\\\ E_d &= \\frac{dQ}{dI} \\cdot \\frac{I}{Q} \\text{ (elasticidad ingreso)} \\end{align*}',
          ejemplos: [
            'Elasticidad precio-demanda',
            'Elasticidad cruzada',
            'Elasticidad ingreso'
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
            Aplicaciones de la Derivada
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Usos prácticos del cálculo diferencial en diferentes campos
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

export default AplicacionesDerivada;