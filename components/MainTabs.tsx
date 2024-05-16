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
      <div className={"px-5"}>
        <div
          className={"h-10 w-full border-b border-b-border flex items-center"}
        >
          {links.map((item, key) => (
            <NavLink
              key={key}
              href={item.href}
              title={item.title}
              className={
                "px-4 inline-flex items-center gap-2 place-content-center relative h-full"
              }
              activeClassName={`nav__active`}
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={"h-full flex flex-col bg-surface p-5 overflow-hidden"}>
        {children}
      </div>
    </div>
  );
};

export default MainTabs;
