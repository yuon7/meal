"use client";
import React, { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
              <Link href="/">Logout</Link>
            </li>
          </ul>

          <button className={styles.hamburger} onClick={toggleMenu}>
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
          <div onClick={toggleMenu}>
            <Link href="https://nextjs.org/">Next.js</Link>
          </div>
          <div onClick={toggleMenu}>
            <Link href="https://hono.dev/">Hono</Link>
          </div>
          <div onClick={toggleMenu}>
            <Link href="https://supabase.com/">Supabase</Link>
          </div>
          <div onClick={toggleMenu}>
            <Link href="https://www.prisma.io/">Prisma</Link>
          </div>
        </ul>
      </div>
    </>
  );
}
