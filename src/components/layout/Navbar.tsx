import { PAGES } from "@/lib/pages";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const [activeItem, setActiveItem] = useState<HTMLElement | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null); 
  const location = useLocation();

  const positionBackdrop = (element: HTMLElement | null) => {
    if (!element || !backdropRef.current || !navRef.current) return;
    const { left, top, width, height } = element.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    backdropRef.current.style.transform = `translate(${left - navRect.left}px, ${
      top - navRect.top
    }px)`;
    backdropRef.current.style.width = `${width}px`;
    backdropRef.current.style.height = `${height}px`;
    backdropRef.current.style.opacity = "1";
  };

  useEffect(() => {
    const activeLink = document.querySelector<HTMLElement>(
      `#nav-links [data-href="${location.pathname}"]`
    );
    if (activeLink) {
      setActiveItem(activeLink);
      setHoveredItem(location.pathname); 
      positionBackdrop(activeLink);
    }
  }, [location]);

  return (
    <nav
      ref={navRef}
      id="landing-header"
      className="relative w-full lg:w-2/3 bg-accent rounded-lg shadow-md"
    >
      <div
        ref={backdropRef}
        className="absolute bg-white rounded transition-all duration-300 ease-in-out opacity-0"
        style={{ zIndex: 1 }}
      />
      <ul
        id="nav-links"
        className="relative flex items-center justify-between gap-2 h-15 w-full px-2 z-30"
      >
        {PAGES.map((item) => (
          <li
            key={item.path}
            data-href={item.path}
            className={`relative z-20 cursor-pointer px-4 py-2 rounded font-semibold uppercase text-lg transition-colors duration-300 ${
              hoveredItem === item.path ? "text-brand" : "text-white"
            }`}
            onMouseEnter={(e) => {
              positionBackdrop(e.currentTarget as HTMLElement);
              setHoveredItem(item.path); 
            }}
            onMouseLeave={() => {
              if (activeItem) {
                positionBackdrop(activeItem);
                setHoveredItem(activeItem.getAttribute("data-href"));
              }
            }}
          >
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
