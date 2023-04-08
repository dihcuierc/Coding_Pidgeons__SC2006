const imageExtension = [
    "jpg",
    "jpeg",
    "png",
    "gif"
]

export default function setFilePath(url,path) {
    const extension = url.split(".").slice(-1)[0].toLowerCase();
    const image = url.split("\\").slice(-1);
    if (imageExtension.includes(extension)) {
        return path + image;
    } else {
        throw new Error("Only accept image files with extension of GIF, JPG, PNG")
    }
}