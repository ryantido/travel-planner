import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();
  const { id } = context.params;

  if (!session) {
    return NextResponse.redirect(new URL("/?unauthorized", req.url));
  }

  try {
    await prisma.trip.delete({
      where: {
        id_userId: {
            id: id,
            userId: session.user?.id!
        }
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting trip:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to delete trip",
      { status: 500 }
    );
  }
}
