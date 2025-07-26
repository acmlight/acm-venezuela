import { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./sidebar.module.css";
import Image from "next/image";
import {
  IconButton as IconButtonChakra,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const navigationItems = [
  { name: "Páginas Médicas", href: "/admin" },
  { name: "Banners", href: "/admin/banners" },
  { name: "Marcas", href: "/admin/brands" },
  { name: "Testimonios", href: "/admin/testimonials" },
  { name: "Novedades", href: "/admin/news" },
];

export default function Sidebar({ pages, auth, className = "" }) {
    const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <IconButtonChakra
          bg="brand.200"
          boxShadow="md"
          colorScheme="white"
          size="lg"
          icon={<GiHamburgerMenu />}
        />
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={toggleMobileMenu} />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          isMobileMenuOpen ? styles.sidebarOpen : ""
        } ${className}`}
      >
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image
              unoptimized
              width={90}
              height={80}
              alt="ACM Logo Blanco"
              src={"/acm-logo.png"}
              priority={1}
            />
          </div>
        </div>

        {/* Navigation Section */}
        <nav className={styles.navigation}>
          <ul className={styles.navigationList}>
            <span className={styles.sectionTitle}>Configuraciones</span>
            {navigationItems.map((item) => {
                const isActive = router.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`${styles.navigationLink} ${
                      isActive ? styles.navigationLinkActive : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={styles.navigationText}>{item.name}</span>
                  </Link>
                </li>
              );
            })}
            <hr className={styles.divider}></hr>

            <span className={styles.sectionTitle}>Páginas Médicas</span>
            {pages.map((page) => (
              <li key={page.id}>
                <Link
                  className={`${styles.navigationLink}`}
                  href={`/admin/${page.id}`}
                >
                  <span className={styles.navigationText}>{page.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className={styles.footer}>
          <div className={styles.footerButtons}>
            <Link href="/admin/addproduct">
              <Button
                size={"sm"}
                bg="brand.100"
                color="white"
                boxShadow="md"
                width={"100%"}
              >
                Añadir producto
              </Button>
            </Link>
            <Link href="/">
              <Button
                size={"sm"}
                bg="brand.100"
                color="white"
                boxShadow="md"
                width={"100%"}
              >
                Regresar a inicio
              </Button>
            </Link>
          </div>
          <Button
            onClick={() => auth.signOut()}
            size="sm"
            width={"100%"}
            variant="outline"
            colorScheme="red"
          >
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </>
  );
}
