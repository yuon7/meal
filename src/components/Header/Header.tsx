"use client";
import React, { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      console.log("User logged out successfully.");
      router.refresh();
    }
  };

  return (
    <>
      {menuOpen && <div onClick={toggleMenu}></div>}

      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Next-Hono-Template</Link>
        </div>

        <nav className={styles.nav}>
          <ul>
            <li>
              <button className={styles.button} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>

          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <p></p>
            <p></p>
            <p></p>
          </button>
        </nav>
      </header>

      <div
        className={`${styles.drawerMenu} ${menuOpen ? styles.drawerOpen : ""}`}
      >
        <ul>
          <div className={styles.toggleMenu}>
            <div onClick={toggleMenu}>
              <Link href="https://www.typescriptlang.org/" target="_blank">
                TypeScript
              </Link>
            </div>
            <div onClick={toggleMenu}>
              <Link href="https://ja.react.dev/" target="_blank">
                React
              </Link>
            </div>
            <div onClick={toggleMenu}>
              <Link href="https://nextjs.org/" target="_blank">
                Next.js
              </Link>
            </div>
            <div onClick={toggleMenu}>
              <Link href="https://hono.dev/" target="_blank">
                Hono
              </Link>
            </div>
            <div onClick={toggleMenu}>
              <Link href="https://supabase.com/" target="_blank">
                Supabase
              </Link>
            </div>
            <div onClick={toggleMenu}>
              <Link href="https://www.prisma.io/" target="_blank">
                Prisma
              </Link>
            </div>
            <div onClick={toggleMenu}>
              <Link href="https://vercel.com/" target="_blank">
                Vercel
              </Link>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}
