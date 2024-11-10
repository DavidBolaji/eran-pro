import db from "@/db/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email as string,
      },
    });
    return user;
  } catch (e) {
    console.log((e as Error).message);
  }
};
