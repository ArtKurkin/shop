export async function checkImage(
    defaultImage: string,
    onError: string
): Promise<string> {
    let img = await fetch(defaultImage);

    if (img.status == 404) {
        return onError;
    }
    return defaultImage;
}
