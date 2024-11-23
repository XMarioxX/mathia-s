import { Button } from '@/components/ui/button';
import React from 'react';

const Home = () => {
  return (
    <div className="">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenidos a Ciencias Básicas
          </h1>
          <h2 className="text-2xl mb-8">
            Instituto Tecnológico de Morelia
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Formando profesionales con sólidos fundamentos en las ciencias básicas para el desarrollo tecnológico de México.
          </p>
          <div className="space-x-4">
            <Button className="">
              Conocer más
            </Button>
            <Button variant="outline" className="">
              Programas académicos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;