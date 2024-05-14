import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavLink from "@/components/NavLink";

const MainTabs = ({
  children,
  links,
}: {
  children: React.ReactNode;
  links: { title: string; href: string; icon?: IconDefinition }[];
}) => {
  return (
    <main
      className={"h-screen flex flex-col bg-background-neutral pb-10 px-10"}
    >
      <div className={" px-5"}>
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
              {item.icon && <FontAwesomeIcon width={18} icon={item.icon} />}
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={"h-full bg-white p-5 overflow-hidden"}>{children}</div>
    </main>
  );
};

export default MainTabs;
