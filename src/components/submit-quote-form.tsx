"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addQuote } from "@/app/actions";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schema for form validation using Zod.
const formSchema = z.object({
  text: z.string().min(10, "La frase debe tener al menos 10 caracteres.").max(280, "La frase no puede superar los 280 caracteres."),
  author: z.string().min(3, "El autor debe tener al menos 3 caracteres.").max(50, "El nombre del autor no puede superar los 50 caracteres."),
  category: z.enum(["motivation", "love", "friendship", "success", "reflection"], {
    errorMap: () => ({ message: "Por favor, selecciona una categoría." }),
  }),
});

const categories = [
  { name: 'motivation', label: 'Motivación' },
  { name: 'love', label: 'Amor' },
  { name: 'friendship', label: 'Amistad' },
  { name: 'success', label: 'Éxito' },
  { name: 'reflection', label: 'Reflexión' },
];

/**
 * A form component for submitting new quotes.
 * It uses react-hook-form for state management and Zod for validation.
 */
export function SubmitQuoteForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      author: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await addQuote(values);
        setSubmitted(true);
      } catch (error) {
        toast({
          title: "Error al enviar la frase",
          description: "Hubo un problema al guardar tu frase. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/50 bg-secondary p-12 text-center">
        <CheckCircle className="mb-4 h-16 w-16 text-primary" />
        <h2 className="font-headline text-2xl font-semibold">¡Gracias por tu contribución!</h2>
        <p className="mt-2 text-muted-foreground">
          Tu frase ha sido enviada. Una vez aprobada, aparecerá en el sitio.
        </p>
        <Button onClick={() => {
            form.reset();
            setSubmitted(false);
        }} className="mt-6">
          Enviar otra frase
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Frase</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe aquí la frase inspiradora..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Autor</FormLabel>
              <FormControl>
                <Input placeholder="¿Quién dijo o escribió la frase?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Elige la categoría que mejor se adapte" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full" size="lg">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Frase"
          )}
        </Button>
      </form>
    </Form>
  );
}
