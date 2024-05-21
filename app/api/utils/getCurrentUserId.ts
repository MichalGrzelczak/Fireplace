import { auth } from "@/app/api/auth/(config)/auth";

export async function getCurrentUserId() {
  const session = await auth();
  const userId: string | null | undefined = session?.user?.email;
  if (!userId) {
    throw new Error("Cannot get current user id.");
  }
  return Promise.resolve("" + userId);
}

export async function getCurrentUser() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw new Error("Cannot get current user");
  }
  return user;
}
