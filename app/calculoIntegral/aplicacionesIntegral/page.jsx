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
    const areas = [];
    
    switch(tipo) {
      case 'area':
        // Área entre curvas
        const curve1 = [];
        const curve2 = [];
        for(let x = -5; x <= 5; x += 0.1) {
          const y1 = Math.pow(x, 2) / 4;
          const y2 = x + 2;
          const px = padding + (x + 5) * xScale;
          const py1 = height - (padding + y1 * yScale);
          const py2 = height - (padding + y2 * yScale);
          curve1.push(`${curve1.length ? 'L' : 'M'}${px},${py1}`);
          curve2.push(`${curve2.length ? 'L' : 'M'}${px},${py2}`);
        }
        path = curve1.join(' ') + ' ' + curve2.join(' ');
        // Área sombreada entre las curvas
        const areaPath = `${curve1.join(' ')} L${padding + 10*xScale},${height-padding} L${padding},${height-padding} Z`;
        areas.push(<path key="area" d={areaPath} fill="#8884d8" opacity="0.3" />);
        break;
        
      case 'volumen':
        // Volumen de revolución
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.sqrt(4 - Math.pow(x/2, 2));
          if (!isNaN(y)) {
            const px = padding + (x + 5) * xScale;
            const py = height - (padding + y * yScale);
            path += `${path ? 'L' : 'M'}${px},${py}`;
          }
        }
        // Sombreado para indicar revolución
        areas.push(
          <path 
            key="revolution" 
            d={path} 
            strokeDasharray="5,5" 
            stroke="#8884d8" 
            strokeOpacity="0.5" 
            fill="none" 
          />
        );
        break;
        
      case 'trabajo':
        // Función de fuerza para trabajo
        for(let x = -5; x <= 5; x += 0.1) {
          const y = 2 * Math.cos(x/2) + 3;
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        break;
        
      case 'centro':
        // Función para centro de masa
        for(let x = -5; x <= 5; x += 0.1) {
          const y = Math.abs(Math.sin(x));
          const px = padding + (x + 5) * xScale;
          const py = height - (padding + y * yScale);
          path += `${path ? 'L' : 'M'}${px},${py}`;
        }
        // Marca del centro de masa
        areas.push(
          <circle
            key="centroid"
            cx={padding + 5*xScale}
            cy={height - (padding + 0.5*yScale)}
            r="4"
            fill="red"
          />
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
        
        {areas}
        <path d={path} stroke="#8884d8" fill="none" strokeWidth="2" />
      </svg>
    </div>
  );
};

const AplicacionesIntegral = () => {
  const [activeTab, setActiveTab] = useState('areas');

  const secciones = [
    {
      id: 'areas',
      titulo: 'Áreas y Volúmenes',
      icon: <BookOpen className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Áreas entre Curvas',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'El área entre dos curvas se calcula como:',
          ecuacion: '\\begin{align*} A &= \\int_a^b |f(x) - g(x)|dx \\\\ A &= \\int_a^b f(x)dx - \\int_a^b g(x)dx \\end{align*}',
          grafica: {
            tipo: 'area',
            title: 'Área entre dos curvas'
          }
        },
        {
          titulo: 'Volúmenes de Revolución',
          icon: <ChevronRight className="w-8 h-8 mt-1" />,
          texto: 'Volumen generado al rotar una región alrededor de un eje:',
          ecuacion: '\\begin{align*} V &= \\pi\\int_a^b [f(x)]^2dx \\text{ (método del disco)} \\\\ V &= 2\\pi\\int_a^b xf(x)dx \\text{ (método del cascarón)} \\end{align*}',
          grafica: {
            tipo: 'volumen',
            title: 'Volumen de revolución'
          }
        }
      ]
    },
    {
      id: 'fisica',
      titulo: 'Aplicaciones Físicas',
      icon: <CircleDot className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Trabajo y Energía',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'El trabajo realizado por una fuerza variable:',
          ecuacion: '\\begin{align*} W &= \\int_a^b F(x)dx \\text{ (trabajo)} \\\\ P &= F\\cdot v = \\int_a^b F(t)v(t)dt \\text{ (potencia)} \\end{align*}',
          grafica: {
            tipo: 'trabajo',
            title: 'Trabajo de una fuerza variable'
          }
        },
        {
          titulo: 'Presión y Fuerza',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Fuerza ejercida por un fluido:',
          ecuacion: '\\begin{align*} F &= \\int_a^b P(y)w(y)dy \\\\ P(y) &= \\rho gh \\text{ (presión hidrostática)} \\end{align*}',
          ejemplos: [
            'Presión en presas',
            'Fuerza en contenedores',
            'Empuje hidrostático'
          ]
        }
      ]
    },
    {
      id: 'geometria',
      titulo: 'Geometría',
      icon: <GraduationCap className="w-5 h-5" />,
      contenido: [
        {
          titulo: 'Longitud de Arco',
          icon: <CircleDot className="w-8 h-8 mb-4" />,
          texto: 'La longitud de una curva se calcula como:',
          ecuacion: 'L = \\int_a^b \\sqrt{1 + [f\'(x)]^2}dx'
        },
        {
          titulo: 'Centro de Masa',
          icon: <Zap className="w-8 h-8 mb-4" />,
          texto: 'Para una lámina plana:',
          ecuacion: '\\begin{align*} \\bar{x} &= \\frac{\\int_a^b x\\rho(x)dx}{\\int_a^b \\rho(x)dx} \\\\ \\bar{y} &= \\frac{\\int_a^b y\\rho(y)dy}{\\int_a^b \\rho(y)dy} \\end{align*}',
          grafica: {
            tipo: 'centro',
            title: 'Centro de masa'
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
          titulo: 'Excedentes',
          icon: <LineChart className="w-8 h-8 mb-4" />,
          texto: 'Cálculo de excedentes del consumidor y productor:',
          ecuacion: '\\begin{align*} EC &= \\int_0^Q [D(q) - p]dq \\\\ EP &= \\int_0^Q [p - S(q)]dq \\end{align*}',
          ejemplos: [
            'Excedente del consumidor',
            'Excedente del productor',
            'Beneficio social'
          ]
        },
        {
          titulo: 'Ingresos y Costos',
          icon: <ChevronRight className="w-8 h-8 mb-4" />,
          texto: 'Análisis de funciones económicas:',
          ecuacion: '\\begin{align*} I(t) &= \\int_0^t R(x)dx \\text{ (ingreso total)} \\\\ C(t) &= \\int_0^t C\'(x)dx \\text{ (costo total)} \\end{align*}',
          ejemplos: [
            'Funciones de ingreso',
            'Análisis de costos',
            'Beneficio acumulado'
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
            Aplicaciones de la Integral
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Uso práctico del cálculo integral en diferentes campos
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

export default AplicacionesIntegral;