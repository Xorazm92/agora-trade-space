"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import useStorage from "@/app/hooks/state/useStorage";
import { useSignOutMutation } from "@/app/store/apis/AuthApi";
import {
  LayoutDashboard,
  ShoppingCart,
  Layers,
  Users,
  LogOut,
  PanelsRightBottom,
  Boxes,
  ChartCandlestick,
  ClipboardPlus,
  ClipboardCheck,
  Section,
  ChartArea,
  Package,
  MessageSquare,
  Percent,
  Heart,
} from "lucide-react";

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useStorage<boolean>(
    "sidebarOpen",
    false,
    "local"
  );
  const pathname = usePathname();
  const router = useRouter();
  const [signout] = useSignOutMutation();
  const t = useTranslations("dashboard");

  // Hook'larni conditional render'dan oldin chaqirish
  const sections = useMemo(
    () => [
      {
        title: t("overview"),
        links: [
          { name: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
        ],
      },
      {
        title: t("ecommerce"),
        links: [
          { name: t("products"), href: "/products", icon: Layers },
          { name: "Buyurtmalar", href: "/orders", icon: Package },
          { name: t("inventory"), href: "/inventory", icon: Section },
          { name: t("attributes"), href: "/attributes", icon: Layers },
          { name: t("categories"), href: "/categories", icon: Boxes },
          { name: t("transactions"), href: "/transactions", icon: ShoppingCart },
          { name: t("users"), href: "/users", icon: Users },
          { name: t("chats"), href: "/chats", icon: ChartArea },
        ],
      },
      {
        title: "Marketing",
        links: [
          { name: "Sharhlar", href: "/reviews", icon: MessageSquare },
          { name: "Kuponlar", href: "/coupons", icon: Percent },
          { name: "Sevimlilar", href: "/wishlist-analytics", icon: Heart },
        ],
      },
      {
        title: t("stats"),
        links: [
          { name: t("analytics"), href: "/analytics", icon: ChartCandlestick },
          { name: t("reports"), href: "/reports", icon: ClipboardPlus },
          { name: t("logs"), href: "/logs", icon: ClipboardCheck },
        ],
      },
    ],
    [t]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const prependDashboard = (href: string) =>
    href.startsWith("/dashboard") ? href : `/dashboard${href}`;

  const handleSignOut = async () => {
    try {
      await signout().unwrap();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const SidebarLink = ({
    name,
    href,
    Icon,
  }: {
    name: string;
    href: string;
    Icon: React.ElementType;
  }) => {
    const fullHref = prependDashboard(href);
    const isActive = pathname === fullHref;

    return (
      <Link
        href={fullHref}
        prefetch={false}
        className={`relative group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-indigo-100 text-indigo-600 font-medium shadow-sm"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          <Icon
            className={`h-5 w-5 transition ${
              isActive ? "text-indigo-600" : "group-hover:text-black"
            }`}
          />
        </motion.div>
        {isOpen && <span className="text-sm">{name}</span>}
      </Link>
    );
  };

  if (!isMounted) {
    return (
      <aside className="bg-white border-r border-gray-200 shadow-lg min-h-fit flex flex-col p-4 space-y-6" style={{ width: "80px" }}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{
        width: isOpen ? 260 : 80,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      className="bg-white border-r border-gray-200 shadow-lg min-h-fit flex flex-col p-4 justify-between md:w-auto w-full md:static fixed top-0 left-0 z-50"
    >
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 flex items-center justify-end rounded-lg transition mb-4 w-full"
        >
          <PanelsRightBottom size={24} className="text-gray-700" />
        </button>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {sections.map((section, idx) => (
            <div key={section.title} className="mb-2">
              {isOpen && (
                <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 ml-4 mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.links.map((link) => (
                  <SidebarLink
                    key={link.name}
                    name={link.name}
                    href={link.href}
                    Icon={link.icon}
                  />
                ))}
              </div>
              {idx < sections.length - 1 && (
                <hr className="my-3 border-t border-gray-200" />
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-300 group"
        >
          <LogOut className="h-5 w-5 text-red-500 group-hover:text-red-600" />
          {isOpen && (
            <span className="text-sm font-medium text-red-600">{t("sign_out")}</span>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
