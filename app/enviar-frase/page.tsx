import { SubmitQuoteForm } from "@/components/submit-quote-form";
import { Send } from "lucide-react";

/**
 * Page for users to submit their own quotes.
 * It displays a title, a description, and the form component.
 */
export default function SubmitQuotePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Send className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">Envía tu Frase</h1>
      </div>
      <p className="mb-8 text-center text-lg text-muted-foreground">
        ¿Tienes una frase que te inspira? ¡Compártela con el mundo! Tu frase podría ser
        la próxima en inspirar a miles de personas.
      </p>
      <SubmitQuoteForm />
    </div>
  );
}
