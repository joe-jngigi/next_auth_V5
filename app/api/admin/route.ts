import { ServerUser } from "@/src/lib/auth";
import { data_base } from "@/src/lib/prisma-db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // const {} = await request.json();

    const session = await ServerUser();
    if (!session) {
      return NextResponse.json(
        { error: "User is not logged in!" },
        { status: 401 }
      );
    }

    if (session?.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "User not An Admin!" },
        { status: 403 }
      );
    }

    const userAccount = await data_base.account.findFirst({
      where: { id: session.id },
    });

    // Create a new Response object with the desired data
    const response = new Response(JSON.stringify({ userAccount }), {
      status: 200,
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      error: "Error 403: Something went wrong. _path_ */api/admin*",
      status: 403,
    });
  }
};
