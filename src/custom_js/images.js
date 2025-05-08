import api from './api';
export default class Images {
    static copyImage() {
        const { showBanner } = api.Front;

        /* Create hints for all the images with the src prop */
        api.Hints.create('img[src]', async element => {
            showBanner('Copying the image...');

            try {
                /* Try to fetch the image data */
                const img = await fetch(element.src, { mode: 'cors' })
                    .then(response => response.blob())
                    .then(blob => createImageBitmap(blob));

                /* Draw the canvas */
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);

                /* Write the image to the clipboard (if supported) */
                canvas.toBlob(async png_blob => {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': png_blob })
                    ]);
                    showBanner('The image was copied successfully');
                }, 'image/png');
            } catch (e) { showBanner(e); }
        });
    }
}