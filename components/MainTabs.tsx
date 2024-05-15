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
              {item.icon && <FontAwesomeIcon width={18} icon={item.icon} />}
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
