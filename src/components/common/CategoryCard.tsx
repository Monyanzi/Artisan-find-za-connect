
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/utils/data';
import { useApp } from '@/contexts/AppContext';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { setSelectedCategory } = useApp();
  
  const handleClick = () => {
    setSelectedCategory(category.id);
  };

  return (
    <Link
      to={`/category/${category.id}`}
      onClick={handleClick}
      className="card p-4 flex flex-col items-center text-center transition-all hover:scale-105"
    >
      <div className="h-16 w-16 flex items-center justify-center bg-primary/10 rounded-full text-2xl mb-3">
        {category.icon}
      </div>
      <h3 className="font-semibold text-base">{category.name}</h3>
      <p className="text-xs text-gray-500 mt-1">{category.count} available</p>
    </Link>
  );
};

export default CategoryCard;
