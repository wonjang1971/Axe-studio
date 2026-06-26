import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  alwaysDark?: boolean;
}

export function Navbar({ alwaysDark = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(alwaysDark);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    if (alwaysDark) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysDark]);

  const navLinks = [
    { name: "소식", href: "#news" },
    { name: "프로젝트", href: "#project" },
    { name: "게임", href: "#game" },
    { name: "캐스팅", href: "/casting" },
    { name: "회사정보", href: "#company" },
    { name: "파트너쉽", href: "#sponsor" },
    { name: "로드맵", href: "#roadmap" },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const dark = isScrolled || alwaysDark;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        dark
          ? "bg-background/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <img
            src="/logo.png"
            alt="AXE STUDIO"
            className="h-16 w-auto object-contain"
            style={{ maxWidth: 140 }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                dark ? "text-muted-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 -mr-2 ${dark ? "text-foreground" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-base font-medium text-foreground py-2 border-b border-border/50 last:border-0"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
