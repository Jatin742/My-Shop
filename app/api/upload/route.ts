import { NextResponse } from "next/server";
import { ImageStorageFactory } from "@/lib/storage/ImageStorageFactory";

export async function POST(request: Request) {

    try {
        const formData = await request.formData();

        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const storageStrategy = ImageStorageFactory.getStrategy();

        const imageUrl = await storageStrategy.upload(file);

        return NextResponse.json({
            url: imageUrl,
        });

    } catch (error) {

        console.error("Image upload error:", error);

        return NextResponse.json(
            { error: "Image upload failed" },
            { status: 500 }
        );
    }
}