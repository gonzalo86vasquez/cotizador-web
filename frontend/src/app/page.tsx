import Link from 'next/link';
import {
  ArrowRight,
  Truck,
  Shield,
  Clock,
  Phone,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { CategoryCard } from '@/components/features/CategoryCard';
import { ProductCard } from '@/components/features/ProductCard';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { categories, products } from '@/data/mock';

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ══════════════════════════════════════════
          HERO
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-hero bg-noise">
        {/* Mesh gradient glow spots */}
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

        {/* Forge orange glow */}
        <div
          className="absolute pointer-events-none animate-glow-pulse"
          style={{
            top: '-20%',
            right: '-10%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 60%)',
          }}
        />

        {/* Cobalt blue glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '-10%',
            left: '-5%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 60%)',
          }}
        />

        <Container size="wide" className="relative z-10">
          <div className="pt-20 pb-20 lg:pt-28 lg:pb-28 max-w-3xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8 animate-fade-in-down">
              <div className="h-px w-8 bg-forge-600" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-forge-500">
                Industria Minera · Chile · Est. 2003
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="animate-fade-in-up"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--color-foreground)',
                marginBottom: '1.5rem',
              }}
            >
              Repuestos de<br />
              Alta Calidad<br />
              <span className="text-gradient-forge">para Molinos SAC</span>
            </h1>

            {/* Accent bar */}
            <div
              className="w-16 h-1 bg-gradient-forge rounded-lg mb-6 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            />

            {/* Body */}
            <p
              className="text-lg text-[var(--color-foreground-muted)] leading-relaxed max-w-lg mb-10 animate-fade-in-up"
              style={{ animationDelay: '150ms' }}
            >
              Abastecemos a la minería chilena con piezas y componentes
              de primera calidad. Solicita tu cotización y recibe
              respuesta en menos de 24 horas.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              <Link href="/catalogo">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-forge-600 text-white font-semibold rounded-lg transition-all duration-150 hover:bg-forge-500 hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.4)] active:scale-[0.98] text-sm tracking-wide">
                  Ver Catálogo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/contacto">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 text-forge-400 font-semibold rounded-lg border border-[var(--color-border)] transition-all duration-150 hover:bg-[var(--color-background-muted)] hover:border-forge-500 active:scale-[0.98] text-sm tracking-wide">
                  Contactar Asesor
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-[var(--color-border)] animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              {[
                { value: '20+', label: 'Años Experiencia' },
                { value: '500+', label: 'Productos' },
                { value: '<24h', label: 'Respuesta' },
                { value: '100%', label: 'Certificado' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-gradient-forge font-extrabold leading-none animate-count-up"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '-0.03em' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.1em] text-[var(--color-foreground-muted)] mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
          ══════════════════════════════════════════ */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-background-subtle)]">
        <Container size="wide">
          <ScrollReveal stagger threshold={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
              {[
                {
                  icon: Truck,
                  title: 'Despacho a Faenas',
                  description: 'Envío directo a tu operación minera, en cualquier región.',
                },
                {
                  icon: Shield,
                  title: 'Calidad Garantizada',
                  description: 'Productos certificados bajo estándares industriales exigentes.',
                },
                {
                  icon: Clock,
                  title: 'Respuesta en 24h',
                  description: 'Cotización formal en menos de un día hábil, garantizado.',
                },
                {
                  icon: Phone,
                  title: 'Soporte Técnico',
                  description: 'Asesoría especializada de ingenieros con 20+ años en faena.',
                },
              ].map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group p-8 hover:bg-[var(--color-background-muted)] transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-background-muted)] flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary-light)] transition-colors">
                      <Icon className="w-5 h-5 text-cobalt-500" />
                    </div>
                    <h3 className="font-semibold text-[var(--color-foreground)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          CATEGORIES
          ══════════════════════════════════════════ */}
      <section className="py-24 bg-[var(--color-background)]">
        <Container size="wide">
          <ScrollReveal direction="up" threshold={0.2}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-6 bg-forge-600" />
                  <span className="text-xs font-semibold tracking-[0.14em] uppercase text-forge-500">
                    Explora nuestro catálogo
                  </span>
                </div>
                <h2
                  className="text-[var(--color-foreground)]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  }}
                >
                  Categorías de Productos
                </h2>
                <p className="mt-3 text-[var(--color-foreground-muted)] max-w-md text-sm leading-relaxed">
                  Componentes organizados por tipo. Encuentra lo que necesitas
                  para mantener tu molino en operación.
                </p>
              </div>

              <Link
                href="/categorias"
                className="flex items-center gap-2 text-sm font-semibold text-forge-500 hover:text-forge-400 transition-colors self-start md:self-auto"
              >
                Ver todas
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger threshold={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.slice(0, 6).map((category, index) => (
                <div
                  key={category.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PRODUCTS
          ══════════════════════════════════════════ */}
      <section className="py-24 bg-[var(--color-background-subtle)] border-y border-[var(--color-border)]">
        <Container size="wide">
          <ScrollReveal direction="up" threshold={0.2}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-6 bg-forge-600" />
                  <span className="text-xs font-semibold tracking-[0.14em] uppercase text-forge-500">
                    Los más solicitados
                  </span>
                </div>
                <h2
                  className="text-[var(--color-foreground)]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  }}
                >
                  Productos Destacados
                </h2>
                <p className="mt-3 text-[var(--color-foreground-muted)] max-w-md text-sm leading-relaxed">
                  Repuestos preferidos por equipos de mantenimiento en faenas de cobre y hierro.
                </p>
              </div>

              <Link
                href="/catalogo"
                className="flex items-center gap-2 text-sm font-semibold text-forge-500 hover:text-forge-400 transition-colors self-start md:self-auto"
              >
                Catálogo completo
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger threshold={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BAR
          ══════════════════════════════════════════ */}
      <section className="bg-[var(--color-background)] border-b border-[var(--color-border)]">
        <Container size="wide">
          <ScrollReveal direction="fade" threshold={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-8 py-8">
              {[
                'Despacho a faenas',
                'Productos certificados',
                'Soporte técnico 24/7',
                'Más de 500 referencias',
                'Respuesta en &lt; 24 horas',
              ].map((item, i) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-forge-500" />
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-foreground-muted)]">
                    {item}
                  </span>
                  {i < 4 && (
                    <span className="hidden lg:block ml-4 text-[var(--color-border)] text-xl">|</span>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          CTA
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-forge">
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />

        {/* Glow effect */}
        <div
          className="absolute inset-0 pointer-events-none animate-glow-pulse"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
        />

        <Container size="default" className="relative z-10 py-24 text-center">
          <ScrollReveal direction="scale" threshold={0.3}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-8 bg-white/40" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/70">
                Atención personalizada
              </span>
              <div className="h-px w-8 bg-white/40" />
            </div>

            <h2
              className="text-white mb-5"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              ¿No encuentras<br />lo que buscas?
            </h2>

            <p className="text-white/90 text-base leading-relaxed max-w-md mx-auto mb-10">
              Nuestro equipo técnico te ayudará a identificar la pieza exacta
              que necesitas. Más de 20 años de experiencia en molinos SAC.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contacto">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-forge-700 font-semibold rounded-lg text-sm tracking-wide transition-all duration-150 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-[0.98]">
                  Contactar Asesor
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <a href="tel:+56223456789">
                <button className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-semibold rounded-lg text-sm tracking-wide transition-all duration-150 hover:bg-white/10 hover:border-white/50 active:scale-[0.98]">
                  <Phone className="w-4 h-4" />
                  +56 2 2345 6789
                </button>
              </a>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
