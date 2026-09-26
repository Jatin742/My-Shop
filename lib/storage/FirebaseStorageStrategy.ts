import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import { ImageStorageStrategy } from "./ImageStorageStrategy";

export class FirebaseStorageStrategy implements ImageStorageStrategy {

    async upload(file: File): Promise<string> {
        const storage = getStorage(firebaseApp);

        const fileName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `products/${fileName}`);

        const snapshot = await uploadBytes(storageRef, file);

        return await getDownloadURL(snapshot.ref);
    }
}