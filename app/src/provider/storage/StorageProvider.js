import {initializeFirebase} from "../FirebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

const { storage } = initializeFirebase();


async function UploadFiles(file,path) {
    try {
        const fileRef = ref(storage, path);
        await uploadBytes(fileRef, file);
        return true;
    } catch (err) {
        throw err;
    }

}

async function RetrieveFiles(path) {
    try {
        const fileRef = ref(storage,path)
        return await getDownloadURL(fileRef);

    } catch (err) {
        throw err;
    }
}

export {UploadFiles, RetrieveFiles};