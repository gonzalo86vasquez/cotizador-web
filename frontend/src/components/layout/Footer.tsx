import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Twitter } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const footerNavigation = {
  products: [
    { name: 'Catalogo de Productos', href: '/catalogo' },
    { name: 'Revestimientos', href: '/catalogo?category=revestimientos' },
    { name: 'Pernos y Fijaciones', href: '/catalogo?category=pernos-fijaciones' },
    { name: 'Lifters', href: '/catalogo?category=lifters' },
    { name: 'Transmision', href: '/catalogo?category=transmision' },
  ],
  company: [
    { name: 'Sobre Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Mi Cotizacion', href: '/cotizacion' },
  ],
  legal: [
    { name: 'Politica de Privacidad', href: '/privacidad' },
    { name: 'Terminos de Uso', href: '/terminos' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--iron-900)] text-slate-300 overflow-hidden">
      {/* Subtle forge glow */}
      <div className="absolute top-0 left-1/3 w-96 h-64 bg-forge-500/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide" className="relative">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-lg bg-forge-600 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-forge-500 group-hover:shadow-[0_4px_14px_rgba(245,158,11,0.4)]">
                <span
                  className="text-white font-extrabold text-xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  CS
                </span>
              </div>
              <div>
                <h3
                  className="text-white font-extrabold text-xl tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Cotizador<span className="text-forge-400">SAC</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">Repuestos Industriales</p>
              </div>
            </Link>

            <p className="mt-6 text-sm text-slate-400 max-w-sm leading-relaxed">
              Especialistas en repuestos y piezas para molinos SAC utilizados en faenas mineras.
              Mas de 20 anos de experiencia abasteciendo a la mineria chilena con productos de primera calidad.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-forge-600/20 hover:text-forge-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-forge-600/20 hover:text-forge-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Productos
            </h4>
            <ul className="space-y-3">
              {footerNavigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-forge-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-forge-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+56223456789"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-forge-600/20 transition-colors">
                    <Phone className="w-4 h-4 text-forge-400" />
                  </span>
                  +56 2 2345 6789
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@cotizador.cl"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-forge-600/20 transition-colors">
                    <Mail className="w-4 h-4 text-forge-400" />
                  </span>
                  contacto@cotizador.cl
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <span className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-forge-400" />
                  </span>
                  <span>
                    Av. Industrial 1234,<br />
                    Santiago, Chile
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            {currentYear} CotizadorSAC. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-slate-500 hover:text-forge-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
