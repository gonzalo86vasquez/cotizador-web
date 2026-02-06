import Link from 'next/link';
import { ArrowRight, Truck, Shield, Clock, Phone, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { CategoryCard } from '@/components/features/CategoryCard';
import { ProductCard } from '@/components/features/ProductCard';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { categories, products } from '@/data/mock';

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-animated min-h-[600px] lg:min-h-[700px]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float delay-300" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float delay-500" />
        </div>

        <Container size="wide" className="relative py-20 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-6 animate-fade-in-down">
              <Badge variant="primary" className="bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Mas de 20 anos de experiencia
              </Badge>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-fade-in-up">
              Repuestos de{' '}
              <span className="text-gradient-hero">Alta Calidad</span>
              {' '}para Molinos SAC
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed animate-fade-in-up delay-100">
              Abastecemos a la mineria chilena con piezas y componentes de primera calidad.
              Solicita tu cotizacion hoy y recibe respuesta en menos de 24 horas.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up delay-200">
              <Link href="/catalogo">
                <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100 shadow-xl hover:shadow-2xl">
                  Ver Catalogo
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contacto">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white border border-white/30 hover:bg-white/10 hover:border-white/50"
                >
                  Contactar Asesor
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-8 text-white/70 text-sm animate-fade-in-up delay-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>Despacho a faenas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>Productos certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>Soporte tecnico 24/7</span>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Features Section */}
      <section className="relative -mt-16">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Truck,
                title: 'Despacho a Faenas',
                description: 'Envio directo a tu operacion minera',
                color: 'violet',
              },
              {
                icon: Shield,
                title: 'Calidad Garantizada',
                description: 'Productos certificados y testeados',
                color: 'emerald',
              },
              {
                icon: Clock,
                title: 'Respuesta Rapida',
                description: 'Cotizacion en menos de 24 horas',
                color: 'amber',
              },
              {
                icon: Phone,
                title: 'Soporte Tecnico',
                description: 'Asesoria especializada disponible',
                color: 'blue',
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-white rounded-2xl p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_8px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                    feature.color === 'violet'
                      ? 'bg-violet-100 text-violet-600'
                      : feature.color === 'emerald'
                        ? 'bg-emerald-100 text-emerald-600'
                        : feature.color === 'amber'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-mesh">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="primary" className="mb-4">
                <Zap className="w-3.5 h-3.5" />
                Explora nuestro catalogo
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                Categorias de Productos
              </h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                Encuentra los repuestos que necesitas organizados por tipo de componente
              </p>
            </div>
            <Link
              href="/categorias"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium group"
            >
              Ver todas las categorias
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category, index) => (
              <div
                key={category.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-neutral-50">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="success" className="mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Los mas solicitados
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                Productos Destacados
              </h2>
              <p className="mt-3 text-neutral-600 max-w-xl">
                Los repuestos preferidos por nuestros clientes del sector minero
              </p>
            </div>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium group"
            >
              Ver catalogo completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/catalogo">
              <Button variant="secondary">
                Ver catalogo completo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-violet-900" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

        <Container size="default" className="relative text-center">
          <Badge variant="primary" className="mb-6 bg-white/10 text-white border border-white/20">
            Atencion personalizada
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            No encuentras lo que buscas?
          </h2>

          <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
            Nuestro equipo tecnico te ayudara a encontrar la pieza exacta que necesitas para tu molino.
            Contamos con mas de 20 anos de experiencia en el sector.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contacto">
              <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100 shadow-xl">
                Contactar Asesor
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+56223456789">
              <Button
                size="lg"
                variant="ghost"
                className="text-white border border-white/30 hover:bg-white/10"
              >
                <Phone className="w-5 h-5" />
                +56 2 2345 6789
              </Button>
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
