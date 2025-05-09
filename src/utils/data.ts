
// Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface Artisan {
  id: string;
  name: string;
  profileImage: string;
  category: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  responseTime: string;
  verified: boolean;
  featured: boolean;
  completionRate: number;
  yearsExperience: number;
  portfolio: string[];
  about: string;
  services: string[];
  pricing: {
    min: number;
    max: number;
    currency: string;
  };
}

// Sample data
export const categories: Category[] = [
  {
    id: 'plumbing',
    name: 'Plumbers',
    icon: '🔧',
    description: 'Expert plumbers for all your water system needs',
    count: 27
  },
  {
    id: 'electrical',
    name: 'Electricians',
    icon: '⚡',
    description: 'Licensed electricians for installations and repairs',
    count: 34
  },
  {
    id: 'carpentry',
    name: 'Carpenters',
    icon: '🪚',
    description: 'Skilled carpenters for custom woodwork and repairs',
    count: 19
  },
  {
    id: 'painting',
    name: 'Painters',
    icon: '🎨',
    description: 'Professional painters for interior and exterior work',
    count: 23
  },
  {
    id: 'gardening',
    name: 'Gardeners',
    icon: '🌱',
    description: 'Experienced gardeners for landscape maintenance',
    count: 15
  },
  {
    id: 'cleaning',
    name: 'Cleaners',
    icon: '🧹',
    description: 'Thorough cleaning services for homes and businesses',
    count: 41
  },
  {
    id: 'security',
    name: 'Security',
    icon: '🔒',
    description: 'Security system installation and maintenance',
    count: 12
  },
  {
    id: 'moving',
    name: 'Movers',
    icon: '📦',
    description: 'Reliable movers for home and office relocations',
    count: 9
  }
];

export const artisans: Artisan[] = [
  {
    id: 'a1',
    name: 'John Nkosi',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
    category: 'Plumber',
    categoryId: 'plumbing',
    rating: 4.9,
    reviewCount: 127,
    location: 'Cape Town',
    distance: '3.2 km',
    responseTime: '10 min',
    verified: true,
    featured: true,
    completionRate: 98,
    yearsExperience: 12,
    portfolio: [
      'https://images.unsplash.com/photo-1521207418485-99c705420785?q=80&w=400&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?q=80&w=400&h=300&auto=format&fit=crop'
    ],
    about: 'Certified master plumber with over 12 years of experience in residential and commercial plumbing services.',
    services: ['Leak repairs', 'Pipe installations', 'Bathroom renovations', 'Geyser installations'],
    pricing: {
      min: 350,
      max: 850,
      currency: 'R'
    }
  },
  {
    id: 'a2',
    name: 'Thandi Mbeki',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop',
    category: 'Electrician',
    categoryId: 'electrical',
    rating: 4.8,
    reviewCount: 94,
    location: 'Johannesburg',
    distance: '5.1 km',
    responseTime: '15 min',
    verified: true,
    featured: true,
    completionRate: 96,
    yearsExperience: 8,
    portfolio: [
      'https://images.unsplash.com/photo-1621905251189-08b45249be53?q=80&w=400&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?q=80&w=400&h=300&auto=format&fit=crop'
    ],
    about: 'Licensed electrician specializing in residential wiring, troubleshooting, and smart home installations.',
    services: ['Electrical repairs', 'Installation', 'Lighting', 'Safety inspections'],
    pricing: {
      min: 400,
      max: 950,
      currency: 'R'
    }
  },
  {
    id: 'a3',
    name: 'David Naidoo',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&h=200&auto=format&fit=crop',
    category: 'Carpenter',
    categoryId: 'carpentry',
    rating: 4.7,
    reviewCount: 78,
    location: 'Durban',
    distance: '2.8 km',
    responseTime: '25 min',
    verified: true,
    featured: false,
    completionRate: 94,
    yearsExperience: 15,
    portfolio: [
      'https://images.unsplash.com/photo-1601659406312-63ea9096d398?q=80&w=400&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583600427407-995927c7509f?q=80&w=400&h=300&auto=format&fit=crop'
    ],
    about: 'Master carpenter with expertise in custom furniture, cabinetry, and detailed woodworking projects.',
    services: ['Custom furniture', 'Cabinetry', 'Installations', 'Repairs'],
    pricing: {
      min: 300,
      max: 1200,
      currency: 'R'
    }
  },
  {
    id: 'a4',
    name: 'Sophie van Wyk',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&auto=format&fit=crop',
    category: 'Painter',
    categoryId: 'painting',
    rating: 4.9,
    reviewCount: 112,
    location: 'Pretoria',
    distance: '4.3 km',
    responseTime: '20 min',
    verified: true,
    featured: true,
    completionRate: 99,
    yearsExperience: 10,
    portfolio: [
      'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=400&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&h=300&auto=format&fit=crop'
    ],
    about: 'Professional painter specializing in interior and exterior painting with expertise in decorative techniques.',
    services: ['Interior painting', 'Exterior painting', 'Decorative finishes', 'Color consultation'],
    pricing: {
      min: 250,
      max: 800,
      currency: 'R'
    }
  },
  {
    id: 'a5',
    name: 'Sipho Mthembu',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    category: 'Gardener',
    categoryId: 'gardening',
    rating: 4.6,
    reviewCount: 86,
    location: 'Cape Town',
    distance: '6.7 km',
    responseTime: '30 min',
    verified: true,
    featured: false,
    completionRate: 92,
    yearsExperience: 7,
    portfolio: [
      'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=400&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530331333676-0474d8c36196?q=80&w=400&h=300&auto=format&fit=crop'
    ],
    about: 'Experienced gardener with knowledge of native South African plants and sustainable landscaping practices.',
    services: ['Garden maintenance', 'Landscaping', 'Irrigation systems', 'Tree services'],
    pricing: {
      min: 200,
      max: 600,
      currency: 'R'
    }
  },
  {
    id: 'a6',
    name: 'Lerato Molefe',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    category: 'Cleaner',
    categoryId: 'cleaning',
    rating: 4.8,
    reviewCount: 156,
    location: 'Johannesburg',
    distance: '2.4 km',
    responseTime: '5 min',
    verified: true,
    featured: true,
    completionRate: 97,
    yearsExperience: 5,
    portfolio: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596263576925-11ccb3533d8c?q=80&w=400&h=300&auto=format&fit=crop'
    ],
    about: 'Detail-oriented cleaning professional with eco-friendly cleaning approaches for homes and offices.',
    services: ['Deep cleaning', 'Regular maintenance', 'Move-in/out cleaning', 'Office cleaning'],
    pricing: {
      min: 180,
      max: 450,
      currency: 'R'
    }
  }
];

export const filterArtisansByCategory = (categoryId: string | null): Artisan[] => {
  if (!categoryId) return artisans.filter(a => a.featured);
  return artisans.filter(a => a.categoryId === categoryId);
};

export const getArtisanById = (id: string | null): Artisan | undefined => {
  if (!id) return undefined;
  return artisans.find(a => a.id === id);
};

export const getCategoryById = (id: string | null): Category | undefined => {
  if (!id) return undefined;
  return categories.find(c => c.id === id);
};
