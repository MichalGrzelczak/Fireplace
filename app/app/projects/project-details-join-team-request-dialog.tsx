import { FC, FormEvent, useState } from "react";

import * as actions from "@/app/api/requests/project-participation.actions";
import { ProjectDetailsProps } from "@/app/app/projects/project-details";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
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
import { Textarea } from "@/components/ui/textarea";

export const ProjectDetailsJoinTeamRequestDialog: FC<ProjectDetailsProps> = (
  props,
) => {
  // TODO add this to notification
  const [description, setDescription] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const [isOpenDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await actions.requestParticipation({
      projectId: props.id,
      projectName: props.projectName,
      leader: props.leader,
    });

    setOpenDialog(false);
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button size="default" variant="default">
          Send a request to join the team
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>Send a request to join the team</DialogTitle>
          </DialogHeader>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter message..."
            className="mt-space-2"
          />
          <div className="mt-space-2">
            <Select
              onValueChange={(value) => {
                setRole(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {props.rolesNeeded.map((role, index) => (
                  <SelectItem key={index} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" size="default" variant="secondary">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" size="default" className="px-space-2">
              Send
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
