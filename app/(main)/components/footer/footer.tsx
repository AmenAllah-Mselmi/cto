/* eslint-disable react/no-unescaped-entities */
// components/layout/SimpleFooter.tsx
import Link from 'next/link'
import { 
  Dumbbell, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react'

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Accueil', href: '/' },
      { name: 'Exercices', href: '/exercices' },
      { name: 'Conseils', href: '/conseils' },
      { name: 'FAQ', href: '/faq' },
    ]
  },
  {
    title: 'À Propos',
    links: [
      { name: 'Notre Mission', href: '/about' },
      { name: 'L\'Équipe', href: '/team' },
      { name: 'Contact', href: '/contact' },
      { name: 'Carrières', href: '/careers' },
    ]
  },
  {
    title: 'Légal',
    links: [
      { name: 'Mentions Légales', href: '/legal' },
      { name: 'Confidentialité', href: '/privacy' },
      { name: 'CGU', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
    ]
  }
]

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

export default function SimpleFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">SportPosture</h2>
                <p className="text-sm text-gray-400">by Decathlon</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              Améliorez votre posture sportive avec nos conseils experts et exercices personnalisés.
            </p>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 py-8 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Téléphone</div>
              <div className="font-semibold">01 23 45 67 89</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Email</div>
              <div className="font-semibold">contact@sportposture.fr</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Adresse</div>
              <div className="font-semibold">Decathlon Digital, Lille</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center">
              <p>© {new Date().getFullYear()} SportPosture by Decathlon. Tous droits réservés.</p>
              <p className="mt-1">Challenge "Devenez le CTO de Votre Santé Posturale"</p>
            </div>
            
            {/* Decathlon Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
              <div className="w-6 h-6 bg-linear-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                <Dumbbell className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-sm">DECATHLON</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}