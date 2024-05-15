import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Counter from "./counter";

export default function Statistics() {
  return (
    <div>
      <div>
        <Counter />
      </div>
      <div className="flex mt-8 text-2xl justify-between gap-4">
        <div className="flex justify-center py-5 px-16 bg-neutral-50 items-center w-full">
          <FontAwesomeIcon icon={faRocket} width={25} className="mr-3" />
          51 awesome projects
        </div>
        <div className="flex justify-center py-5 px-16 bg-neutral-50 items-center w-full">
          <FontAwesomeIcon icon={faUsers} width={25} className="mr-3" />
          200 team members
        </div>
        <div className="flex justify-center py-5 px-16 bg-neutral-50 items-center w-full">
          <FontAwesomeIcon icon={faAward} width={25} className="mr-3" />9 awards
          to win
        </div>
        <div className="flex justify-center py-5 px-16 bg-neutral-50 items-center w-full">
          <FontAwesomeIcon icon={faCalendar} width={25} className="mr-3" />5
          days full of fun and hard work
        </div>
      </div>
    </div>
  );
}
