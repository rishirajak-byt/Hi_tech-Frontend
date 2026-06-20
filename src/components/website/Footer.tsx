import Link from "next/link";
import { Mail, Phone, MapPin, Globe, MessageCircle, Share2, Camera } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070f1e] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-hitech-saffron rounded-lg flex items-center justify-center">
                <span className="text-hitech-navy font-heading font-bold text-xl">HT</span>
              </div>
              <div className="flex flex-col text-white">
                <span className="font-heading font-bold leading-tight">HiTech</span>
                <span className="text-xs font-medium tracking-widest uppercase">University</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Shaping Engineers, Building Futures. HiTech University is a premier institution dedicated to academic excellence, innovative research, and holistic student development.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-hitech-saffron hover:text-hitech-navy transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-hitech-saffron hover:text-hitech-navy transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-hitech-saffron hover:text-hitech-navy transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-hitech-saffron hover:text-hitech-navy transition-colors">
                <Camera className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-hitech-saffron"></span>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/coming-soon" className="hover:text-hitech-saffron transition-colors">About the College</Link></li>
              <li><Link href="/coming-soon" className="hover:text-hitech-saffron transition-colors">Academic Programs</Link></li>
              <li><Link href="/coming-soon" className="hover:text-hitech-saffron transition-colors">Admission 2026-27</Link></li>
              <li><Link href="/coming-soon" className="hover:text-hitech-saffron transition-colors">Faculty Directory</Link></li>
              <li><Link href="/coming-soon" className="hover:text-hitech-saffron transition-colors">Campus Life & Hostel</Link></li>
              <li><Link href="/admin/login" className="hover:text-hitech-saffron transition-colors">Admin / Teacher Portal</Link></li>
              <li><Link href="/login" className="hover:text-hitech-saffron transition-colors">Student Portal</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-hitech-saffron"></span>
              Accreditations
            </h4>
            <div className="space-y-4">
              <div className="bg-white/5 p-3 rounded flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-xs font-bold text-hitech-navy">AICTE</div>
                <div className="text-sm">Approved by AICTE, New Delhi</div>
              </div>
              <div className="bg-white/5 p-3 rounded flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-xs font-bold text-hitech-navy">NAAC</div>
                <div className="text-sm">Accredited with &apos;A+&apos; Grade</div>
              </div>
              <div className="bg-white/5 p-3 rounded flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-xs font-bold text-hitech-navy">NBA</div>
                <div className="text-sm">Tier-1 NBA Accredited Programs</div>
              </div>
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-hitech-saffron"></span>
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-hitech-saffron shrink-0" />
                <span>Knowledge Park III, Education Corridor, New Delhi NCR, India - 1100XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-hitech-saffron shrink-0" />
                <span>+91 11 2345 6780 / 81</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-hitech-saffron shrink-0" />
                <span>admissions@hitech.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} HiTech University Management System. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/coming-soon" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/coming-soon" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/coming-soon" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
