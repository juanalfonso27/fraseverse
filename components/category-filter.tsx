"use client";

import { Button } from '@/components/ui/button';
import { Award, BrainCircuit, Heart, Star, Users, List } from 'lucide-react';

// Defines the categories available for filtering.
const categories = [
  { name: 'all', label: 'Todas', icon: List },
  { name: 'motivation', label: 'Motivación', icon: Star },
  { name: 'love', label: 'Amor', icon: Heart },
  { name: 'friendship', label: 'Amistad', icon: Users },
  { name: 'success', label: 'Éxito', icon: Award },
  { name: 'reflection', label: 'Reflexión', icon: BrainCircuit },
];

interface CategoryFilterProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

/**
 * A component that renders a list of category buttons for filtering quotes.
 */
export function CategoryFilter({ activeCategory, setActiveCategory }: CategoryFilterProps) {
  const handleCategoryClick = (categoryName: string) => {
    // Toggle functionality: if the same category is clicked again, show all.
    if (categoryName === activeCategory) {
      setActiveCategory(null);
    } else if (categoryName === 'all') {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={
            (activeCategory === category.name) || (!activeCategory && category.name === 'all')
              ? 'default'
              : 'outline'
          }
          onClick={() => handleCategoryClick(category.name)}
          className="capitalize"
        >
          {category.icon && <category.icon className="mr-2 h-4 w-4" />}
          {category.label}
        </Button>
      ))}
    </div>
  );
}
