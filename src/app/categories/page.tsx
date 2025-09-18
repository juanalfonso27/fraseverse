import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, Star, Heart, Users, Award, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

// Configuration for the categories, including icons and colors for styling.
const categories = [
  { name: 'motivation', label: 'Motivación', icon: Star, color: 'text-chart-1' },
  { name: 'love', label: 'Amor', icon: Heart, color: 'text-chart-2' },
  { name: 'friendship', label: 'Amistad', icon: Users, color: 'text-chart-3' },
  { name: 'success', label: 'Éxito', icon: Award, color: 'text-chart-4' },
  { name: 'reflection', label: 'Reflexión', icon: BrainCircuit, color: 'text-chart-5' },
];

/**
 * The Categories page displays a grid of all available quote categories.
 * Clicking a category navigates the user to the homepage with that category pre-selected.
 */
export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <LayoutGrid className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold">Categorías</h1>
      </div>
      <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
        Explora frases navegando a través de diferentes categorías de inspiración.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link key={category.name} href={`/?category=${category.name}`} className="group">
            <Card className="transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
              <CardHeader className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
                <category.icon className={cn("h-10 w-10", category.color)} strokeWidth={1.5} />
                <CardTitle className="font-headline text-lg capitalize">{category.label}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
