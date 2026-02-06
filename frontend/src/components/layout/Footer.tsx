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
    <footer className="relative bg-neutral-950 text-neutral-300 overflow-hidden">
      {/* Gradient orb decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <Container size="wide" className="relative">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
                  <span className="text-white font-bold text-2xl tracking-tight">C</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-neutral-950" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl tracking-tight">CotizadorSAC</h3>
                <p className="text-xs text-neutral-500 font-medium tracking-wide">Repuestos Industriales</p>
              </div>
            </Link>

            <p className="mt-6 text-sm text-neutral-400 max-w-sm leading-relaxed">
              Especialistas en repuestos y piezas para molinos SAC utilizados en faenas mineras.
              Mas de 20 anos de experiencia abasteciendo a la mineria chilena con productos de primera calidad.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors"
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
                    className="text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
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
                    className="text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
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
                  className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                    <Phone className="w-4 h-4 text-violet-400" />
                  </span>
                  +56 2 2345 6789
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@cotizador.cl"
                  className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                    <Mail className="w-4 h-4 text-violet-400" />
                  </span>
                  contacto@cotizador.cl
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-neutral-400">
                  <span className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-violet-400" />
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
        <div className="py-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            {currentYear} CotizadorSAC. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-neutral-500 hover:text-white transition-colors"
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
