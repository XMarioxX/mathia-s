"use client";
import * as React from "react";
import { ChevronRight, ChevronLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/toogleTheme";

const calculusData = {
  "calculoDiferencial": [
    { path: "aplicacionDerivada", display: "Aplicación de la Derivada" },
    { path: "continiudad", display: "Continuidad" },
    { path: "derivadas", display: "Derivadas" },
    { path: "limites", display: "Límites" }
  ],
  "calculoIntegral": [
    { path: "integralesDefinidas", display: "Integrales Definidas" },
    { path: "integralesIndefinidas", display: "Integrales Indefinidas" },
    { path: "aplicacionesIntegral", display: "Aplicaciones de la Integral" },
    { path: "metodosIntegracion", display: "Métodos de Integración" }
  ]
};

const displayNames = {
  "calculoDiferencial": "Cálculo Diferencial",
  "calculoIntegral": "Cálculo Integral"
};

export function CalculusSidebar({ children }) {
  const [activePath, setActivePath] = React.useState([]);

  const generateUrl = (pathSegments) => {
    return "/" + pathSegments.map(segment => encodeURIComponent(segment)).join("/");
  };

  const getDisplayName = (path) => {
    if (displayNames[path]) return displayNames[path];
    
    for (const [section, items] of Object.entries(calculusData)) {
      const item = items.find(item => item.path === path);
      if (item) return item.display;
    }
    return path;
  };

  const MenuLinkButton = ({ href, path, display, isActive, onClick }) => (
    <Link href={href} legacyBehavior>
      <SidebarMenuButton isActive={isActive} onClick={onClick}>
        {display}
      </SidebarMenuButton>
    </Link>
  );

  const BreadcrumbLinkWrapper = ({ href, children }) => (
    <Link href={href} legacyBehavior>
      <BreadcrumbLink>{children}</BreadcrumbLink>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex items-center px-4">
            <div className="mt-2">
              <GraduationCap size={48} />
            </div>
            <h2 className="text-xl font-bold p-4">Mathia's</h2>
            <div className="mt-1 ml-auto">
              <ModeToggle />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {Object.entries(calculusData).map(([section, items]) => (
            <SidebarGroup key={section}>
              <SidebarGroupLabel>{getDisplayName(section)}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map(({ path, display }) => (
                    <SidebarMenuItem key={path}>
                      <MenuLinkButton 
                        href={generateUrl([section, path])}
                        path={path}
                        display={display}
                        isActive={activePath[1] === path}
                        onClick={() => setActivePath([section, path])}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="border-b bg-background">
          <div className="px-6 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLinkWrapper href="/">
                    Inicio
                  </BreadcrumbLinkWrapper>
                </BreadcrumbItem>
                {activePath.map((item, index) => (
                  <React.Fragment key={item}>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      {index === activePath.length - 1 ? (
                        <BreadcrumbPage>{getDisplayName(item)}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLinkWrapper href={generateUrl(activePath.slice(0, index + 1))}>
                          {getDisplayName(item)}
                        </BreadcrumbLinkWrapper>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex-1">
          <div className="h-full w-full flex flex-col">
            <div className="px-6 py-4 text-center">
              <h1 className="text-3xl font-bold">
                {activePath.length > 0
                  ? getDisplayName(activePath[activePath.length - 1])
                  : "Bienvenido a Cálculo"}
              </h1>
              {activePath.length > 0 && (
                <Link href={generateUrl(activePath.slice(0, -1))} legacyBehavior>
                  <a className="inline-flex items-center text-blue-500 hover:underline mt-2">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Volver
                  </a>
                </Link>
              )}
            </div>
            <div className="flex-1 w-full h-full flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}