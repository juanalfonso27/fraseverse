import { QuoteList } from "@/components/quote-list";
import { Suspense } from "react";
import { DailyQuote } from "@/components/daily-quote";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

//para desactivar el cache, Esto forzará la renderización dinámica.
export const dynamic = 'force-dynamic';

// La página principal de la aplicación, renderizada en la URL raíz.
export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined }}) {
  // Obtiene la categoría inicial de los parámetros de búsqueda de la URL si está presente.
  const category = searchParams.category as string | undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 
        El componente DailyQuote ahora es autosuficiente. Obtiene sus propios datos.
        El límite de Suspense muestra un esqueleto de carga mientras el componente busca datos.
      */}
      <Suspense fallback={<DailyQuoteSkeleton />}>
        <DailyQuote />
      </Suspense>
      
      {/* La lista principal de frases, con capacidades de búsqueda y filtro. Maneja su propia obtención de datos. */}
      <QuoteList initialCategory={category} />
    </div>
  );
}

/**
 * Un componente esqueleto de carga para la tarjeta DailyQuote.
 * Proporciona una interfaz de marcador de posición mientras se selecciona la frase del lado del cliente.
 */
function DailyQuoteSkeleton() {
    return (
        <Card className="my-8 animate-pulse">
            <CardHeader><div className="h-8 w-3/4 rounded-md bg-muted"></div></CardHeader>
            <CardContent><div className="h-6 w-full rounded-md bg-muted"></div></CardContent>
            <CardFooter><div className="h-4 w-1/4 rounded-md bg-muted"></div></CardFooter>
        </Card>
    )
}
