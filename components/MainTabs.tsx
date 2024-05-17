import { IconType } from "react-icons";

import NavLink from "@/components/NavLink";

const MainTabs = ({
  children,
  links,
}: {
  children: React.ReactNode;
  links: { title: string; href: string; icon?: React.ReactNode }[];
}) => {
  return (
    <section className={"flex flex-col h-full overflow-hidden"}>
      <div className={"px-space-3"}>
        <nav
          aria-label="Main"
          className={
            "h-size-40 w-full border-b border-b-border flex items-center"
          }
        >
          {links.map((item, key) => (
            <NavLink
              key={key}
              href={item.href}
              title={item.title}
              className={
                "px-space-3 inline-flex items-center gap-space-2 place-content-center relative h-full"
              }
              activeClassName={`nav__active`}
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
      <section
        className={"h-full flex flex-col bg-surface p-space-3 overflow-hidden"}
      >
        {children}
      </section>
    </section>
  );
};

export default MainTabs;
