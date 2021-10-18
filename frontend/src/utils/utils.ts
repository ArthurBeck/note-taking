export async function loadImage(image: File) {
    const imgBuffer = await image.arrayBuffer();

    // https://medium.com/@koteswar.meesala/convert-array-buffer-to-base64-string-to-display-images-in-angular-7-4c443db242cd

    const imgIntArray = new Uint8Array(imgBuffer);

    const imgString = imgIntArray.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
    }, '');

    return 'data:image/jpg;base64,' + btoa(imgString);
}
