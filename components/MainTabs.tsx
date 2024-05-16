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
    <div className={"flex flex-col h-full overflow-hidden"}>
      <div className={"px-space-3"}>
        <div
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
        </div>
      </div>
      <div
        className={"h-full flex flex-col bg-surface p-space-3 overflow-hidden"}
      >
        {children}
      </div>
    </div>
  );
};

export default MainTabs;
