import { FC } from "react";
import { FaCheck, FaCrown, FaTimes, FaTrash } from "react-icons/fa";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { ProjectUser } from "./types";

enum MemberType {
  "Leader",
  "Current",
  "Requested",
}

interface DialogContentMemberProps {
  rolesNeeded: string[];
}

export const DialogContentMember: FC<DialogContentMemberProps> = ({
  rolesNeeded,
}) => {
  return (
    <>
      <Textarea placeholder="Enter message..." className="mt-space-2" />
      <div className="mt-space-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            {rolesNeeded.map((role, index) => (
              <SelectItem key={index} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

interface DialogContentLeaderProps {
  currentTeamMembers: string[];
  allUsers: ProjectUser[];
  userRequests?: ProjectUser[];
  leader: ProjectUser;
  acceptRequest?: () => void;
  declineRequest?: () => void;
  kickMember?: () => void;
  onSelectMember?: (member: string) => void;
}

export const DialogContentLeader: FC<DialogContentLeaderProps> = ({
  currentTeamMembers,
  allUsers,
  userRequests,
  leader,
  acceptRequest,
  declineRequest,
  kickMember,
  onSelectMember,
}) => {
  const teamMembers = currentTeamMembers.map((user) => (
    <Member
      key={user}
      userName={user}
      memberType={MemberType.Current}
      kickMember={kickMember}
    />
  ));

  const requestMembers = userRequests?.map((user) => (
    <Member
      key={user.email}
      userName={user.displayName}
      memberType={MemberType.Requested}
      acceptRequest={acceptRequest}
      declineRequest={declineRequest}
    />
  ));
  const availableUsers = allUsers
    .filter((user) => !(user.displayName === "No Leader Yet"))
    .map((user, index) => (
      <SelectItem key={index} value={user.email}>
        {user.displayName}
      </SelectItem>
    ))
    .slice(0, 5);

  return (
    <>
      <div>
        <div className="typography--font-ui-small pb-1">Invite members</div>
        <Select onValueChange={onSelectMember}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select person" />
          </SelectTrigger>
          <SelectContent>{availableUsers}</SelectContent>
        </Select>
      </div>
      <div className="flex border-gray-300 border-t border-collapse flex-col text-sm w-full">
        <Member userName={leader.displayName} memberType={MemberType.Leader} />
        {teamMembers}
        {requestMembers}
      </div>
    </>
  );
};

interface MemberProps {
  memberType: MemberType;
  userName: string;
  email?: string;
  acceptRequest?: () => void;
  declineRequest?: () => void;
  kickMember?: () => void;
}

export const Member: FC<MemberProps> = ({
  userName,
  memberType,
  acceptRequest,
  declineRequest,
  kickMember,
}) => {
  const { Current, Leader, Requested } = MemberType;

  return (
    <>
      <div className="flex items-center h-8 border-gray-300 border-b border-collapse justify-between">
        <div className="truncate flex gap-1 items-center">
          {memberType === Leader && <FaCrown className="text-blue-600" />}
          {userName}
          {memberType === Requested && (
            <Badge className="bg-amber-100 text-amber-800 uppercase text-xs font-semibold">
              Waiting for Approval
            </Badge>
          )}
        </div>
        <div>
          {memberType === Current && (
            <FaTrash cursor="pointer" onClick={kickMember} />
          )}
          {memberType === Requested && (
            <div className="flex gap-1">
              <FaTimes cursor="pointer" onClick={declineRequest} />
              <FaCheck cursor="pointer" onClick={acceptRequest} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
