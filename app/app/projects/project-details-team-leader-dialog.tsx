// "use client";
import { FC, useEffect, useState } from "react";
import { FaCheck, FaCrown, FaTimes, FaTrash } from "react-icons/fa";

import * as actions from "@/app/api/requests/project-participation.actions";
import { updateIssueMembers } from "@/app/app/projects/jira-projects-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProjectUser } from "./types";

enum MemberType {
  "Leader",
  "Current",
  "Requested",
}

interface ProjectDetailsTeamLeaderDialogProps {
  projectId: string;
  projectName: string;
  teamMembers: string[];
  allUsers: ProjectUser[];
  userRequests?: ProjectUser[];
  leader: ProjectUser;
}

export const ProjectDetailsTeamLeaderDialog: FC<
  ProjectDetailsTeamLeaderDialogProps
> = (props) => {
  const [internalTeamMembers, setInternalTeamMembers] = useState<string[]>(
    props.teamMembers,
  );

  const [internalTeamMemberRequests, setInternalTeamMemberRequests] =
    useMembersRequestingToJoin({
      projectId: props.projectId,
      // TODO better mapping
      initialMemberRequests:
        props.userRequests?.map((user) => user.email) ?? [],
    });

  async function acceptRequest(userId: string) {
    await actions.acceptParticipationRequest({
      requestingUserId: userId,
      projectName: props.projectName,
      projectId: props.projectId,
    });

    // TODO
    // await updateIssueMembers(props.projectId, [userId],)

    const teamMemberRequests = internalTeamMemberRequests.filter(
      (internalUserId) => internalUserId !== userId,
    );
    setInternalTeamMemberRequests(teamMemberRequests);

    setInternalTeamMembers([...internalTeamMembers, userId]);
  }

  async function declineRequest(userId: string) {
    await actions.declineParticipationRequest({
      requestingUserId: userId,
      projectName: props.projectName,
      projectId: props.projectId,
    });
    // TODO better solution - fetch from backend
    setInternalTeamMemberRequests(
      internalTeamMemberRequests.filter(
        (internalTeamMember) => internalTeamMember !== userId,
      ),
    );
  }

  function kickMember(userId: string) {
    // TODO
    alert("TODO: kickMember");
  }

  function inviteMember(member: string) {
    // TODO
    alert("TODO: selectMember");
  }

  const teamMembersList = internalTeamMembers.map((user) => (
    <Member
      key={user}
      userName={user}
      email={user}
      memberType={MemberType.Current}
      kickMember={() => kickMember(user)}
    />
  ));

  const requestMembersList = internalTeamMemberRequests.map((teamMember) => (
    <Member
      key={teamMember}
      userName={teamMember}
      email={teamMember}
      memberType={MemberType.Requested}
      acceptRequest={() => acceptRequest(teamMember)}
      declineRequest={() => declineRequest(teamMember)}
    />
  ));

  const availableUsersList = props.allUsers
    .filter((user) => !(user.displayName === "No Leader Yet"))
    .map((user, index) => (
      <SelectItem key={index} value={user.email}>
        {user.displayName}
      </SelectItem>
    ))
    .slice(0, 5);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="default" variant="default">
            Manage members
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage team members</DialogTitle>
          </DialogHeader>
          <div>
            <div className="typography--font-ui-small pb-1">Invite members</div>
            <Select onValueChange={inviteMember}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select person" />
              </SelectTrigger>
              <SelectContent>{availableUsersList}</SelectContent>
            </Select>
          </div>
          <div className="flex border-gray-300 border-t border-collapse flex-col text-sm w-full">
            <Member
              email={props.leader.email}
              userName={props.leader.displayName}
              memberType={MemberType.Leader}
            />
            {teamMembersList}
            {requestMembersList}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface MemberProps {
  memberType: MemberType;
  userName: string;
  email: string;
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

function useMembersRequestingToJoin(config: {
  projectId: string;
  initialMemberRequests?: string[];
}) {
  const [requests, setRequests] = useState<string[]>([]);

  useEffect(() => {
    function fetchRequests() {
      console.log("fetchRequests, projectId", config.projectId);
      actions.getRequestsToJoinProject(config.projectId).then((requests) => {
        console.log("requests", requests);
        const userIdsToJoin = requests.map((request) => request.userId);
        // TODO get user from jira ?
        setRequests(userIdsToJoin);
      });
    }

    fetchRequests();
  }, [config.projectId]);

  return [requests, setRequests] as const;
}
