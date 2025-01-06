"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes"; // Assuming you're using next-themes for managing dark mode

function Header() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const { theme, setTheme } = useTheme(); // next-themes hook to manage theme

  // Toggle dark mode
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex justify-between py-4 px-8 border-b-2 items-center">
      <h1 className="font-semibold text-2xl">Neilit</h1>
      {user ? (
        <div className="flex items-center space-x-4">
          <h1 className="font-2xl font-semibold">{user.name}</h1>
          <Button onClick={() => signOut()} className="font-semibold text-sm">
            Log Out
          </Button>
        </div>
      ) : (
        <Button onClick={() => signIn()} className="font-semibold text-sm">
          Log in
        </Button>
      )}
      <Button onClick={toggleDarkMode} className="font-semibold text-sm">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>
    </div>
  );
}

export default Header;
