"use client";
import React, { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default function Header() {
  const supabase = await createClient();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error.message);
    } else {
      console.log("User logged out");
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
              <button onClick={handleLogout}>Logout</button>
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
