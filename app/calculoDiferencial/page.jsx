import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen, SquareFunction, Infinity, GitBranch } from 'lucide-react';

const iconMap = {
  'Aplicación de la Derivada': SquareFunction,
  'Continuidad': Infinity,
  'Derivadas': GitBranch,
  'Límites': SquareFunction,
  'Integrales Definidas': SquareFunction,
  'Integrales Indefinidas': Infinity,
  'Aplicaciones de la Integral': GitBranch,
  'Métodos de Integración': BookOpen
};

const Calculo = () => {
  const topics = {
    calculoDiferencial: [
      { path: "aplicacionDerivada", display: "Aplicación de la Derivada" },
      { path: "continiudad", display: "Continuidad" },
      { path: "derivadas", display: "Derivadas" },
      { path: "limites", display: "Límites" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Cálculo Diferencial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.calculoDiferencial.map((topic) => {
              const Icon = iconMap[topic.display] || BookOpen;
              return (
                <Card key={topic.path} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                      <CardTitle className="text-lg text-blue-900">
                        {topic.display}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                      Explorar
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Calculo;