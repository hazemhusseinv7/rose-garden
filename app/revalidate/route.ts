import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    revalidateTag("content", "page");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Content revalidated successfully",
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
