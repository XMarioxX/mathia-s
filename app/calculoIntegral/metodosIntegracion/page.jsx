"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Equation } from '@/components/ecuacion';
import { 
  BookOpen, 
  FunctionSquare,
  ChevronRight,
  CircleDot,
  LayoutGrid,
  HashIcon
} from 'lucide-react';

const GraficaMetodo = ({ tipo, title }) => {
  const width = 300;
  const height = 200;
  const padding = 20;
  const xScale = (width - 2 * padding) / 10;
  const yScale = (height - 2 * padding) / 10;

  const getPath = () => {
    let path = '';
    const areas = [];
    
    switch(tipo) {
      case 'sustitucion':
        // Curva para sustitución trigonométrica
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.sqrt(4 - Math.pow(x, 2));
          if (!isNaN(y)) {
            const px = padding + (x + 5) * xScale;
            const py = height - (padding + y * yScale);
            path += `${path ? 'L' : 'M'}${px},${py}`;
          }
        }
        areas.push(
          <path
            key="angle"
            d={`M${padding + 5*xScale},${height-padding} A40,40 0 0 1 ${padding + 6*xScale},${height-padding-20}`}
            fill="none"
            stroke="#8884d8"
            strokeDasharray="5,5"
          />
        );
        break;
        
      case 'partes':
        // Función para integración por partes
        for(let x = -5; x <= 5; x += 0.1) {
          const y = x * Math.exp(x/5);
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'fracciones':
        // Función para fracciones parciales
        for(let x = -5; x <= 5; x += 0.1) {
          if (x !== 0 && x !== 2) {
            const y = 1/(x * (x-2));
            const px = padding + (x + 5) * xScale;
            const py = height - (padding + y * yScale);
            if (Math.abs(y) < 5) {
              path += `${path ? 'L' : 'M'}${px},${py}`;
            }
          }
        }
        // Asíntotas verticales - Ahora cada elemento del array tiene su propia key
        areas.push(
          [
            <line 
              key="asintota1"
              x1={padding + 5*xScale}
              y1={padding}
              x2={padding + 5*xScale}
              y2={height-padding}
              stroke="#ff0000"
              strokeDasharray="5,5"
            />,
            <line
              key="asintota2"
              x1={padding + 7*xScale}
              y1={padding}
              x2={padding + 7*xScale}
              y2={height-padding}
              stroke="#ff0000"
              strokeDasharray="5,5"
            />
          ]
        );
        break;
    }
    return { path, areas };
  };

  const { path, areas } = getPath();

  return (
    <div className="w-full mt-4">
      <p className="text-center text-sm font-medium mb-2">{title}</p>
      <svg width={width} height={height} className="mx-auto">
        {/* Ejes */}
        <line 
          key="eje-x"
          x1={padding} 
          y1={height-padding} 
          x2={width-padding} 
          y2={height-padding} 
          stroke="currentColor" 
        />
        <line 
          key="eje-y"
          x1={padding} 
          y1={padding} 
          x2={padding} 
          y2={height-padding} 
          stroke="currentColor" 
        />
        
        {/* Marcas en el eje X */}
        {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(x => (
          <g key={`tick-${x}`}>
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
        
        {/* Renderizar las áreas - Ahora maneja tanto arrays como elementos individuales */}
        {areas.flat().map((area, index) => 
          React.cloneElement(area, { key: area.key || `area-${index}` })
        )}
        
        {/* La curva principal */}
        <path 
          key="curva-principal"
          d={path} 
          stroke="#8884d8" 
          fill="none" 
          strokeWidth="2" 
        />
      </svg>
    </div>
  );
};

const MetodosIntegracion = () => {
  const [activeTab, setActiveTab] = useState('basicos');

  const secciones = [
    {
      id: 'basicos',
      titulo: 'Métodos Básicos',
      icon: <BookOpen className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Integración Directa',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Aplicación directa de fórmulas de integración:',
          ecuacion: '\\begin{align*} \\int x^n dx &= \\frac{x^{n+1}}{n+1} + C \\\\ \\int e^x dx &= e^x + C \\\\ \\int \\frac{1}{x} dx &= \\ln|x| + C \\end{align*}',
          ejemplos: [
            'Potencias: ∫x² dx',
            'Exponenciales: ∫e^x dx',
            'Logarítmicas: ∫1/x dx'
          ]
        },
        {
          titulo: 'Regla de la Cadena',
          icon: <HashIcon className="w-8 h-8 mb-4" />,
          texto: 'Integración usando sustitución simple:',
          ecuacion: '\\int f(g(x))g\'(x)dx = \\int f(u)du \\text{ donde } u = g(x)',
          ejemplos: [
            'Potencias compuestas',
            'Funciones trigonométricas',
            'Exponenciales compuestas'
          ]
        }
      ]
    },
    {
      id: 'avanzados',
      titulo: 'Métodos Avanzados',
      icon: <FunctionSquare className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Integración por Partes',
          icon: <LayoutGrid className="w-8 h-8 mb-4" />,
          texto: 'Para productos de funciones:',
          ecuacion: '\\int u dv = uv - \\int v du',
          grafica: {
            tipo: 'partes',
            title: 'Ejemplo: ∫x·eˣ dx'
          },
          ejemplos: [
            'Productos con polinomios',
            'Funciones exponenciales',
            'Funciones trigonométricas'
          ]
        },
        {
          titulo: 'Sustitución Trigonométrica',
          icon: <CircleDot className="w-8 h-8 mb-4" />,
          texto: 'Para expresiones con raíces cuadradas:',
          ecuacion: '\\begin{align*} \\sqrt{a^2-x^2} &\\rightarrow x = a\\sin\\theta \\\\ \\sqrt{x^2-a^2} &\\rightarrow x = a\\sec\\theta \\\\ \\sqrt{x^2+a^2} &\\rightarrow x = a\\tan\\theta \\end{align*}',
          grafica: {
            tipo: 'sustitucion',
            title: 'Sustitución trigonométrica'
          }
        }
      ]
    },
    {
      id: 'especiales',
      titulo: 'Casos Especiales',
      icon: <HashIcon className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Fracciones Parciales',
          icon: <LayoutGrid className="w-8 h-8 mb-4" />,
          texto: 'Para fracciones racionales:',
          ecuacion: '\\frac{P(x)}{Q(x)} = \\sum \\frac{A}{(x-a)^n} + \\sum \\frac{Bx+C}{x^2+px+q}',
          grafica: {
            tipo: 'fracciones',
            title: 'Ejemplo: 1/(x(x-2))'
          },
          ejemplos: [
            'Raíces lineales simples',
            'Raíces lineales repetidas',
            'Factores cuadráticos'
          ]
        },
        {
          titulo: 'Integración de Potencias Trigonométricas',
          icon: <CircleDot className="w-8 h-8 mb-4" />,
          texto: 'Para potencias de seno y coseno:',
          ecuacion: '\\begin{align*} \\int \\sin^n x dx &\\text{ (usar fórmulas de reducción)} \\\\ \\int \\cos^n x dx &\\text{ (usar identidades trigonométricas)} \\end{align*}',
          ejemplos: [
            'Reducción de potencias pares',
            'Reducción de potencias impares',
            'Productos mixtos'
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
            Métodos de Integración
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Técnicas y estrategias para resolver integrales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
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
                          <GraficaMetodo tipo={item.grafica.tipo} title={item.grafica.title} />
                        )}

                        {item.ejemplos && (
                          <div className="space-y-2 mt-4">
                            <p className="font-medium">Ejemplos:</p>
                            {item.ejemplos.map((ejemplo, idx) => (
                              <div key={idx} className="p-2 rounded-lg">
                                <p>{ejemplo}</p>
                              </div>
                            ))}
                          </div>
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

export default MetodosIntegracion;