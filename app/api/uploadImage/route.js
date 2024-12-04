import { NextResponse } from "next/server";
import { auth } from "@/app/_lib/auth";
import { uploadImage } from "@/app/_lib/data-service";

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth)
      return NextResponse.json(
        { message: "u need to be authenticated to upload images" },
        { status: 401 }
      );
    const formData = await req.formData();
    const userId = formData.get("userId");
    const img = formData.get("img");

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
});
