import { NextResponse } from "next/server";
import { uploadImage } from "@/app/_lib/data-service";
import { getUserFromSession } from "@/app/_lib/session";
import { cookies } from "next/headers";

export async function POST(req) {
  const user = await getUserFromSession(cookies());
  if (!user) {
    return NextResponse.json(
      { message: "You need to be authenticated to upload images" },
      { status: 401 },
    );
  }
  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const img = formData.get("img");

    // Verify the user is uploading their own image
    if (userId !== user.id) {
      return NextResponse.json(
        { message: "Unauthorized to upload for this user" },
        { status: 403 },
      );
    }

    const { image } = await uploadImage(img, userId);

    return NextResponse.json({
      message: "success",
      status: 200,
      image,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
