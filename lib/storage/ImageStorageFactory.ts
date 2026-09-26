import { ImageStorageStrategy } from "./ImageStorageStrategy";
import { FirebaseStorageStrategy } from "./FirebaseStorageStrategy";
import { CloudinaryStorageStrategy } from "./CloudinaryStorageStrategy";

export class ImageStorageFactory {

    static getStrategy(): ImageStorageStrategy {

        const provider = process.env.IMAGE_STORAGE_PROVIDER?.toLowerCase();

        switch (provider) {

            case "firebase":
                return new FirebaseStorageStrategy();

            case "cloudinary":
                return new CloudinaryStorageStrategy();

            default:
                throw new Error(
                    `Unsupported image storage provider: ${provider}`
                );
        }
    }
}