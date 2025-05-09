import { Home, ShoppingBag, Calendar, MessageSquare, Users, BarChart, Settings, Star, Construction, Brush, Scissors, Music, Monitor, Camera, Utensils, BookOpen, Truck, Paintbrush, Code, Cloud, Heart, Leaf, Lightbulb, GlassWater, Snowflake, Mountain, TreeDeciduous, Sun, Moon, Umbrella, Coffee, Beer, Wine } from 'lucide-react';

// Type definitions
export interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  count: number;
}

export interface ArtisanReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

export interface Artisan {
  id: string;
  name: string;
  category: string;
  skills: string[];
  location: string;
  rating: number;
  description: string;
  image: string;
  services: string[];
  yearsOfExperience: number;
  hourlyRate: number;
  contact: string;
  availability: string;
  reviews: ArtisanReview[];
  featured?: boolean;
  profileImage?: string;
  verified?: boolean;
  reviewCount?: number;
  yearsExperience?: number;
  distance?: string;
  responseTime?: string;
  about?: string;
  pricing?: {
    currency: string;
    min: number;
    max: number;
  };
  completionRate?: number;
  joinedDate?: string;
  specialties?: string[];
}

export const categories = [
  {
    id: 'home-services',
    name: 'Home Services',
    icon: Home,
    description: 'Plumbers, electricians, cleaners, and more.',
    count: 28,
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingBag,
    description: 'Unique handmade crafts and goods.',
    count: 15,
  },
  {
    id: 'events',
    name: 'Events',
    icon: Calendar,
    description: 'Photographers, caterers, and event planners.',
    count: 10,
  },
  {
    id: 'lessons',
    name: 'Lessons',
    icon: BookOpen,
    description: 'Learn new skills from local artisans.',
    count: 7,
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: Truck,
    description: 'Reliable transport and delivery services.',
    count: 5,
  },
  {
    id: 'design',
    name: 'Design',
    icon: Paintbrush,
    description: 'Graphic design, web design, and more.',
    count: 12,
  },
  {
    id: 'tech',
    name: 'Tech',
    icon: Code,
    description: 'Web development, app development, and IT support.',
    count: 9,
  },
  {
    id: 'other',
    name: 'Other',
    icon: Cloud,
    description: 'Miscellaneous services and skills.',
    count: 20,
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    icon: Heart,
    description: 'Massage therapists, personal trainers, and more.',
    count: 14,
  },
  {
    id: 'nature',
    name: 'Nature & Outdoors',
    icon: Leaf,
    description: 'Landscaping, gardening, and outdoor services.',
    count: 8,
  },
  {
    id: 'energy',
    name: 'Energy & Utilities',
    icon: Lightbulb,
    description: 'Solar panel installation, energy audits, and more.',
    count: 6,
  },
  {
    id: 'innovation',
    name: 'Innovation & Tech',
    icon: Lightbulb,
    description: 'Cutting-edge tech solutions and innovations.',
    count: 11,
  },
  {
    id: 'water-services',
    name: 'Water Services',
    icon: GlassWater,
    description: 'Plumbing, water purification, and more.',
    count: 4,
  },
  {
    id: 'winter-services',
    name: 'Winter Services',
    icon: Snowflake,
    description: 'Snow removal, winter maintenance, and more.',
    count: 3,
  },
  {
    id: 'mountain-adventures',
    name: 'Mountain Adventures',
    icon: Mountain,
    description: 'Hiking guides, mountain climbing, and more.',
    count: 2,
  },
  {
    id: 'tree-services',
    name: 'Tree Services',
    icon: TreeDeciduous,
    description: 'Tree trimming, tree removal, and more.',
    count: 9,
  },
  {
    id: 'sun-services',
    name: 'Sun Services',
    icon: Sun,
    description: 'Solar panel installation, sun tanning, and more.',
    count: 7,
  },
  {
    id: 'moon-services',
    name: 'Moon Services',
    icon: Moon,
    description: 'Night photography, astronomy tours, and more.',
    count: 5,
  },
  {
    id: 'umbrella-services',
    name: 'Umbrella Services',
    icon: Umbrella,
    description: 'Umbrella repair, umbrella rental, and more.',
    count: 10,
  },
  {
    id: 'coffee-services',
    name: 'Coffee Services',
    icon: Coffee,
    description: 'Coffee brewing, coffee tasting, and more.',
    count: 12,
  },
  {
    id: 'beer-services',
    name: 'Beer Services',
    icon: Beer,
    description: 'Beer brewing, beer tasting, and more.',
    count: 8,
  },
  {
    id: 'wine-services',
    name: 'Wine Services',
    icon: Wine,
    description: 'Wine making, wine tasting, and more.',
    count: 6,
  },
  {
    id: 'cocktail-services',
    name: 'Cocktail Services',
    icon: GlassWater, // Changed from Cocktail to GlassWater
    description: 'Cocktail making, cocktail tasting, and more.',
    count: 11,
  },
];

export const artisans = [
  {
    id: 'art1',
    name: 'John Carpenter',
    category: 'home-services',
    skills: ['carpentry', 'furniture repair', 'woodworking'],
    location: 'Sandton, Johannesburg',
    rating: 4.5,
    description: 'Experienced carpenter specializing in custom furniture and repairs.',
    image: '/images/artisans/carpenter.jpg',
    profileImage: '/placeholder.svg',
    services: ['Furniture Repair', 'Custom Furniture', 'Woodworking'],
    yearsOfExperience: 15,
    yearsExperience: 15,
    hourlyRate: 350,
    contact: '+27 82 123 4567',
    availability: 'Mon-Fri, 8am-5pm',
    featured: true,
    verified: true,
    reviewCount: 24,
    distance: '3.2 km',
    responseTime: '2 hrs',
    about: 'Professional carpenter with 15 years of experience specializing in custom furniture and repairs.',
    pricing: {
      currency: 'R',
      min: 300,
      max: 500
    },
    completionRate: 98,
    joinedDate: 'Jan 2020',
    specialties: ['Custom Furniture', 'Reclaimed Wood', 'Bespoke Designs'],
    reviews: [
      { id: 'rev1', author: 'Samantha J.', rating: 5, comment: 'John did an amazing job fixing my antique chair!' },
      { id: 'rev2', author: 'Peter K.', rating: 4, comment: 'Good work, but slightly expensive.' },
    ],
  },
  {
    id: 'art2',
    name: 'Mary Plumber',
    category: 'home-services',
    skills: ['plumbing', 'pipe fitting', 'drain cleaning'],
    location: 'Rosebank, Johannesburg',
    rating: 4.8,
    description: 'Reliable plumber for all your plumbing needs.',
    image: '/images/artisans/plumber.jpg',
    profileImage: '/placeholder.svg',
    services: ['Pipe Repair', 'Drain Cleaning', 'Geyser Installation'],
    yearsOfExperience: 10,
    yearsExperience: 10,
    hourlyRate: 400,
    contact: '+27 73 987 6543',
    availability: '24/7 Emergency Services',
    featured: true,
    verified: true,
    reviewCount: 42,
    distance: '4.7 km',
    responseTime: '1 hr',
    about: 'Reliable plumber for all your plumbing needs with 24/7 emergency services available.',
    pricing: {
      currency: 'R',
      min: 350,
      max: 550
    },
    completionRate: 97,
    joinedDate: 'Mar 2019',
    specialties: ['Geyser Expert', '24/7 Emergency', 'Drain Cleaning'],
    reviews: [
      { id: 'rev3', author: 'Linda M.', rating: 5, comment: 'Mary was quick to respond and fixed my burst pipe in no time!' },
      { id: 'rev4', author: 'George L.', rating: 5, comment: 'Excellent service and very professional.' },
    ],
  },
  {
    id: 'art3',
    name: 'David Electrician',
    category: 'home-services',
    skills: ['electrical wiring', 'light installation', 'fault finding'],
    location: 'Braamfontein, Johannesburg',
    rating: 4.2,
    description: 'Certified electrician for residential and commercial properties.',
    image: '/images/artisans/electrician.jpg',
    profileImage: '/placeholder.svg',
    services: ['Electrical Wiring', 'Light Installation', 'Fault Finding'],
    yearsOfExperience: 8,
    yearsExperience: 8,
    hourlyRate: 380,
    contact: '+27 60 234 5678',
    availability: 'Mon-Sat, 9am-6pm',
    featured: false,
    verified: false,
    reviewCount: 18,
    distance: '2.1 km',
    responseTime: '3 hrs',
    about: 'Certified electrician for residential and commercial properties with extensive experience in electrical wiring and fault finding.',
    pricing: {
      currency: 'R',
      min: 320,
      max: 480
    },
    completionRate: 95,
    joinedDate: 'Sep 2021',
    specialties: ['Electrical Installations', 'Lighting Design', 'Emergency Repairs'],
    reviews: [
      { id: 'rev5', author: 'Karen P.', rating: 4, comment: 'David was punctual and did a great job installing my new lights.' },
      { id: 'rev6', author: 'Tom S.', rating: 3, comment: 'Average service, but got the job done.' },
    ],
  },
  {
    id: 'art4',
    name: 'Samantha Photographer',
    category: 'events',
    skills: ['photography', 'event photography', 'portrait photography'],
    location: 'Pretoria, Gauteng',
    rating: 4.9,
    description: 'Professional photographer for weddings, events, and portraits.',
    image: '/images/artisans/photographer.jpg',
    profileImage: '/placeholder.svg',
    services: ['Wedding Photography', 'Event Photography', 'Portrait Photography'],
    yearsOfExperience: 7,
    yearsExperience: 7,
    hourlyRate: 500,
    contact: '+27 84 345 6789',
    availability: 'Weekends and Public Holidays',
    featured: true,
    verified: true,
    reviewCount: 63,
    distance: '55 km',
    responseTime: '45 mins',
    about: 'Professional photographer for weddings, events, and portraits, capturing your special moments with artistic flair.',
    pricing: {
      currency: 'R',
      min: 450,
      max: 700
    },
    completionRate: 99,
    joinedDate: 'Jun 2018',
    specialties: ['Wedding Photography', 'Portrait Photography', 'Event Coverage'],
    reviews: [
      { id: 'rev7', author: 'Jessica B.', rating: 5, comment: 'Samantha captured our wedding day perfectly! Highly recommended.' },
      { id: 'rev8', author: 'Michael D.', rating: 5, comment: 'Amazing photos and very easy to work with.' },
    ],
  },
  {
    id: 'art5',
    name: 'Thando Caterer',
    category: 'events',
    skills: ['catering', 'event catering', 'food preparation'],
    location: 'Durban, KwaZulu-Natal',
    rating: 4.6,
    description: 'Delicious catering services for all types of events.',
    image: '/images/artisans/caterer.jpg',
    profileImage: '/placeholder.svg',
    services: ['Event Catering', 'Corporate Catering', 'Private Catering'],
    yearsOfExperience: 12,
    yearsExperience: 12,
    hourlyRate: 450,
    contact: '+27 79 456 7890',
    availability: 'Flexible, contact for availability',
    featured: false,
    verified: false,
    reviewCount: 31,
    distance: '540 km',
    responseTime: '1 day',
    about: 'Delicious catering services for all types of events, offering a wide range of menu options to suit your needs.',
    pricing: {
      currency: 'R',
      min: 400,
      max: 600
    },
    completionRate: 96,
    joinedDate: 'Nov 2020',
    specialties: ['Gourmet Cuisine', 'Custom Menus', 'Dietary Options'],
    reviews: [
      { id: 'rev9', author: 'Nadia R.', rating: 5, comment: 'Thando provided the most delicious food for our corporate event.' },
      { id: 'rev10', author: 'Brian H.', rating: 4, comment: 'Great food, but a bit pricey.' },
    ],
  },
  {
    id: 'art6',
    name: 'Aisha Seamstress',
    category: 'shopping',
    skills: ['sewing', 'tailoring', 'clothing design'],
    location: 'Cape Town, Western Cape',
    rating: 4.7,
    description: 'Custom sewing and tailoring services for all your clothing needs.',
    image: '/images/artisans/seamstress.jpg',
    profileImage: '/placeholder.svg',
    services: ['Custom Sewing', 'Tailoring', 'Clothing Design'],
    yearsOfExperience: 10,
    yearsExperience: 10,
    hourlyRate: 300,
    contact: '+27 76 567 8901',
    availability: 'Mon-Fri, 10am-6pm',
    featured: false,
    verified: true,
    reviewCount: 28,
    distance: '1400 km',
    responseTime: '2 days',
    about: 'Custom sewing and tailoring services for all your clothing needs, creating unique and stylish garments.',
    pricing: {
      currency: 'R',
      min: 250,
      max: 450
    },
    completionRate: 97,
    joinedDate: 'Apr 2022',
    specialties: ['Bridal Alterations', 'Custom Designs', 'Clothing Repairs'],
    reviews: [
      { id: 'rev11', author: 'Leah C.', rating: 5, comment: 'Aisha did an amazing job altering my wedding dress!' },
      { id: 'rev12', author: 'Richard F.', rating: 4, comment: 'Good quality work and reasonable prices.' },
    ],
  },
  {
    id: 'art7',
    name: 'Zola Potter',
    category: 'shopping',
    skills: ['pottery', 'ceramics', 'handmade crafts'],
    location: 'Johannesburg, Gauteng',
    rating: 4.5,
    description: 'Unique handmade pottery and ceramics for your home.',
    image: '/images/artisans/potter.jpg',
    profileImage: '/placeholder.svg',
    services: ['Pottery', 'Ceramics', 'Handmade Crafts'],
    yearsOfExperience: 5,
    yearsExperience: 5,
    hourlyRate: 250,
    contact: '+27 83 678 9012',
    availability: 'Weekends, 10am-4pm',
    featured: false,
    verified: false,
    reviewCount: 15,
    distance: '6.8 km',
    responseTime: '4 hrs',
    about: 'Unique handmade pottery and ceramics for your home, adding a touch of artistry to your living space.',
    pricing: {
      currency: 'R',
      min: 200,
      max: 350
    },
    completionRate: 94,
    joinedDate: 'Jul 2021',
    specialties: ['Functional Pottery', 'Decorative Ceramics', 'Custom Orders'],
    reviews: [
      { id: 'rev13', author: 'Susan W.', rating: 5, comment: 'Zola’s pottery is beautiful and unique. I love my new vase!' },
      { id: 'rev14', author: 'Mark T.', rating: 4, comment: 'Nice work, but a bit expensive for the size.' },
    ],
  },
  {
    id: 'art8',
    name: 'Nandi Tutor',
    category: 'lessons',
    skills: ['tutoring', 'math', 'science'],
    location: 'Cape Town, Western Cape',
    rating: 4.8,
    description: 'Experienced tutor for math and science subjects.',
    image: '/images/artisans/tutor.jpg',
    profileImage: '/placeholder.svg',
    services: ['Math Tutoring', 'Science Tutoring', 'Homework Help'],
    yearsOfExperience: 6,
    yearsExperience: 6,
    hourlyRate: 320,
    contact: '+27 74 789 0123',
    availability: 'Mon-Fri, 3pm-7pm',
    featured: false,
    verified: true,
    reviewCount: 22,
    distance: '1400 km',
    responseTime: '1 day',
    about: 'Experienced tutor for math and science subjects, helping students achieve their academic goals.',
    pricing: {
      currency: 'R',
      min: 280,
      max: 400
    },
    completionRate: 98,
    joinedDate: 'Dec 2019',
    specialties: ['Math Specialist', 'Science Expert', 'Exam Prep'],
    reviews: [
      { id: 'rev15', author: 'Lisa G.', rating: 5, comment: 'Nandi helped my son improve his math grade significantly.' },
      { id: 'rev16', author: 'David U.', rating: 5, comment: 'Excellent tutor and very patient.' },
    ],
  },
  {
    id: 'art9',
    name: 'Sipho Driver',
    category: 'transport',
    skills: ['driving', 'transport', 'delivery'],
    location: 'Johannesburg, Gauteng',
    rating: 4.9,
    description: 'Reliable driving and transport services for all your needs.',
    image: '/images/artisans/driver.jpg',
    profileImage: '/placeholder.svg',
    services: ['Driving Services', 'Transport Services', 'Delivery Services'],
    yearsOfExperience: 9,
    yearsExperience: 9,
    hourlyRate: 370,
    contact: '+27 81 890 1234',
    availability: '24/7, contact for availability',
    featured: true,
    verified: true,
    reviewCount: 55,
    distance: '12 km',
    responseTime: '30 mins',
    about: 'Reliable driving and transport services for all your needs, ensuring safe and timely transportation.',
    pricing: {
      currency: 'R',
      min: 330,
      max: 500
    },
    completionRate: 99,
    joinedDate: 'Aug 2020',
    specialties: ['Airport Transfers', 'Parcel Delivery', 'Long Distance'],
    reviews: [
      { id: 'rev17', author: 'Thandi N.', rating: 5, comment: 'Sipho is always on time and very professional.' },
      { id: 'rev18', author: 'Peter V.', rating: 5, comment: 'Great service and very reliable.' },
    ],
  },
  {
    id: 'art10',
    name: 'Lerato Designer',
    category: 'design',
    skills: ['graphic design', 'web design', 'logo design'],
    location: 'Pretoria, Gauteng',
    rating: 4.6,
    description: 'Creative graphic and web designer for all your design needs.',
    image: '/images/artisans/designer.jpg',
    profileImage: '/placeholder.svg',
    services: ['Graphic Design', 'Web Design', 'Logo Design'],
    yearsOfExperience: 7,
    yearsExperience: 7,
    hourlyRate: 420,
    contact: '+27 72 901 2345',
    availability: 'Mon-Fri, 9am-5pm',
    featured: false,
    verified: false,
    reviewCount: 29,
    distance: '55 km',
    responseTime: '1 day',
    about: 'Creative graphic and web designer for all your design needs, crafting visually appealing and effective designs.',
    pricing: {
      currency: 'R',
      min: 380,
      max: 550
    },
    completionRate: 96,
    joinedDate: 'Feb 2021',
    specialties: ['Branding', 'UI/UX Design', 'Print Media'],
    reviews: [
      { id: 'rev19', author: 'Karen L.', rating: 5, comment: 'Lerato created a beautiful logo for my business.' },
      { id: 'rev20', author: 'John M.', rating: 4, comment: 'Good design work, but a bit slow to respond.' },
    ],
  },
];

export const getCategoryById = (id: string | null) => {
  if (!id) return null;
  return categories.find(category => category.id === id);
};

export const filterArtisansByCategory = (categoryId: string | null) => {
  if (!categoryId) {
    return artisans;
  }
  return artisans.filter(artisan => artisan.category === categoryId);
};

export const filterArtisansBySearch = (searchTerm: string) => {
  if (!searchTerm) {
    return [];
  }
  
  const lowercaseSearch = searchTerm.toLowerCase();
  
  return artisans.filter((artisan) => {
    return (
      artisan.name.toLowerCase().includes(lowercaseSearch) ||
      artisan.skills.some(skill => skill.toLowerCase().includes(lowercaseSearch)) ||
      artisan.location.toLowerCase().includes(lowercaseSearch)
    );
  });
};
