import { Category, Product } from '@/types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Revestimientos',
    slug: 'revestimientos',
    description: 'Revestimientos para molinos SAC de alta resistencia',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
    productCount: 24,
  },
  {
    id: 2,
    name: 'Pernos y Fijaciones',
    slug: 'pernos-fijaciones',
    description: 'Pernos de alta resistencia y sistemas de fijación',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
    productCount: 18,
  },
  {
    id: 3,
    name: 'Lifters',
    slug: 'lifters',
    description: 'Barras elevadoras para molinos SAC',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop',
    productCount: 12,
  },
  {
    id: 4,
    name: 'Componentes de Transmisión',
    slug: 'transmision',
    description: 'Piñones, coronas y componentes de transmisión',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=400&h=300&fit=crop',
    productCount: 15,
  },
  {
    id: 5,
    name: 'Sellos y Juntas',
    slug: 'sellos-juntas',
    description: 'Sellos mecánicos y juntas de estanqueidad',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    productCount: 20,
  },
  {
    id: 6,
    name: 'Repuestos Varios',
    slug: 'repuestos-varios',
    description: 'Otros repuestos y componentes para molinos',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    productCount: 30,
  },
];

export const products: Product[] = [
  {
    id: 1,
    sku: 'REV-SAC5000-001',
    name: 'Revestimiento Shell Molino SAC 5000',
    description: 'Revestimiento de casco fabricado en acero al manganeso de alta resistencia al impacto y abrasión. Diseñado específicamente para molinos SAC 5000 con geometría optimizada para máxima eficiencia de molienda.',
    categoryId: 1,
    categoryName: 'Revestimientos',
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Material': 'Acero al Manganeso Austenítico',
      'Dureza': '220-280 HB',
      'Peso': '450 kg',
      'Espesor': '75 mm',
      'Largo': '1200 mm',
      'Ancho': '800 mm',
    },
    compatibleModels: ['SAC 5000', 'SAC 5500'],
    availableForQuote: true,
    inStock: true,
    estimatedDeliveryDays: 5,
  },
  {
    id: 2,
    sku: 'REV-SAC6000-001',
    name: 'Revestimiento Shell Molino SAC 6000',
    description: 'Revestimiento de casco de alta performance para molinos SAC 6000. Fabricado con aleación especial para máxima durabilidad en condiciones extremas de operación.',
    categoryId: 1,
    categoryName: 'Revestimientos',
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Material': 'Acero al Cromo-Molibdeno',
      'Dureza': '250-320 HB',
      'Peso': '520 kg',
      'Espesor': '85 mm',
      'Largo': '1400 mm',
      'Ancho': '900 mm',
    },
    compatibleModels: ['SAC 6000', 'SAC 6500'],
    availableForQuote: true,
    inStock: true,
    estimatedDeliveryDays: 7,
  },
  {
    id: 3,
    sku: 'REV-HEAD-5000',
    name: 'Revestimiento Tapa Descarga SAC 5000',
    description: 'Revestimiento para tapa de descarga con diseño de flujo optimizado. Resistente a la abrasión y al impacto de material.',
    categoryId: 1,
    categoryName: 'Revestimientos',
    images: [
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Material': 'Acero al Manganeso',
      'Dureza': '220 HB',
      'Peso': '380 kg',
      'Diámetro': '1800 mm',
    },
    compatibleModels: ['SAC 5000'],
    availableForQuote: true,
    inStock: false,
    estimatedDeliveryDays: 15,
  },
  {
    id: 4,
    sku: 'PERNO-M36-001',
    name: 'Perno Liner M36 x 180mm',
    description: 'Perno de alta resistencia para fijación de revestimientos. Grado 10.9 con tuerca y arandela incluida. Tratamiento anticorrosivo.',
    categoryId: 2,
    categoryName: 'Pernos y Fijaciones',
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Grado': '10.9',
      'Diámetro': 'M36',
      'Largo': '180 mm',
      'Material': 'Acero aleado',
      'Recubrimiento': 'Zinc-Níquel',
    },
    compatibleModels: ['SAC 5000', 'SAC 6000', 'SAC 5500', 'SAC 6500'],
    availableForQuote: true,
    inStock: true,
    estimatedDeliveryDays: 3,
  },
  {
    id: 5,
    sku: 'PERNO-M42-001',
    name: 'Perno Liner M42 x 200mm',
    description: 'Perno de extra alta resistencia para aplicaciones de alto torque. Grado 12.9 con sistema de fijación seguro.',
    categoryId: 2,
    categoryName: 'Pernos y Fijaciones',
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Grado': '12.9',
      'Diámetro': 'M42',
      'Largo': '200 mm',
      'Material': 'Acero aleado',
      'Recubrimiento': 'Dacromet',
    },
    compatibleModels: ['SAC 6000', 'SAC 6500', 'SAC 7000'],
    availableForQuote: true,
    inStock: true,
    estimatedDeliveryDays: 3,
  },
  {
    id: 6,
    sku: 'LIFT-SAC5000-HI',
    name: 'Lifter Bar Alto SAC 5000',
    description: 'Barra elevadora de perfil alto para molinos SAC 5000. Diseño optimizado para máxima elevación de carga y eficiencia de molienda.',
    categoryId: 3,
    categoryName: 'Lifters',
    images: [
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Material': 'Acero al Cromo',
      'Altura': '150 mm',
      'Largo': '3600 mm',
      'Peso': '280 kg',
      'Ángulo de ataque': '15°',
    },
    compatibleModels: ['SAC 5000', 'SAC 5500'],
    availableForQuote: true,
    inStock: true,
    estimatedDeliveryDays: 10,
  },
  {
    id: 7,
    sku: 'LIFT-SAC6000-HI',
    name: 'Lifter Bar Alto SAC 6000',
    description: 'Barra elevadora de perfil alto para molinos SAC 6000. Mayor resistencia al desgaste con aleación especial.',
    categoryId: 3,
    categoryName: 'Lifters',
    images: [
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Material': 'Acero al Cromo-Molibdeno',
      'Altura': '180 mm',
      'Largo': '4200 mm',
      'Peso': '350 kg',
      'Ángulo de ataque': '18°',
    },
    compatibleModels: ['SAC 6000', 'SAC 6500'],
    availableForQuote: true,
    inStock: false,
    estimatedDeliveryDays: 20,
  },
  {
    id: 8,
    sku: 'PIN-CORONA-001',
    name: 'Piñón de Ataque Molino SAC',
    description: 'Piñón de ataque forjado y mecanizado con precisión. Dientes templados por inducción para máxima durabilidad.',
    categoryId: 4,
    categoryName: 'Componentes de Transmisión',
    images: [
      'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Módulo': '24',
      'Número de dientes': '18',
      'Material': 'Acero 4340',
      'Dureza dientes': '55-60 HRC',
      'Peso': '850 kg',
    },
    compatibleModels: ['SAC 5000', 'SAC 6000'],
    availableForQuote: true,
    inStock: true,
    estimatedDeliveryDays: 30,
  },
  {
    id: 9,
    sku: 'SELLO-TRUNNION-001',
    name: 'Sello Trunnion Completo',
    description: 'Conjunto de sello para muñón de molino. Incluye sello principal, sello de polvo y componentes de montaje.',
    categoryId: 5,
    categoryName: 'Sellos y Juntas',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Tipo': 'Laberinto + Labio',
      'Diámetro interno': '2000 mm',
      'Material sello': 'NBR reforzado',
      'Material laberinto': 'Bronce SAE 660',
    },
    compatibleModels: ['SAC 5000', 'SAC 5500', 'SAC 6000'],
    availableForQuote: true,
    inStock: true,
    estimatedDeliveryDays: 12,
  },
  {
    id: 10,
    sku: 'JUNTA-TAPA-001',
    name: 'Junta Tapa Inspección',
    description: 'Junta de estanqueidad para tapa de inspección de molino. Material resistente a temperaturas y presión.',
    categoryId: 5,
    categoryName: 'Sellos y Juntas',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    ],
    technicalSpecs: {
      'Material': 'Grafito expandido',
      'Espesor': '3 mm',
      'Diámetro exterior': '600 mm',
      'Temperatura máx': '450°C',
    },
    compatibleModels: ['SAC 5000', 'SAC 6000', 'SAC 5500', 'SAC 6500'],
    availableForQuote: true,
    inStock: true,
    estimatedDeliveryDays: 5,
  },
];

export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter((p) => p.categoryId === categoryId);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((c) => c.slug === slug);
};
