import Replicate from "replicate";

// voorbeelden om images op te halen
// stuur de image als URL terug naar de browser
// voor unsplash en replicate moet een API key in de ENV file staan


//
// static image uit public folder
//
export async function getImage(subject) {
    console.log(`🔧 now getting the ${subject} image`)
    let imageUrl = `http://localhost:3000/${subject}.png`
    return imageUrl;
}


//
// replicate ai image komt terug als URL, dus die kan je doorsturen naar de client
//
export async function getReplicateImage(subject) {
    console.log(`🔧 now generating the ${subject} image`);

    const replicate = new Replicate();
    const input = {
        "prompt": `a drawing of ${subject}. the image style is manga illustration.`,
        aspect_ratio: "3:2"
    };

    try {
        // kies hier het image generation model
        const output = await replicate.run("ideogram-ai/ideogram-v3-turbo", { input });
        const imageUrl = output.url();
        console.log("🐹 finished!");
        return imageUrl;
    } catch (err) {
        const statusText = err?.response?.statusText;
        console.log("Replicate Error:", statusText);
        return `https://placehold.co/600x400/CCCCCC/000000?text=Ultimate+Fail`;

    }
}

//
// unsplash image search
//
export async function getUnsplashImage(topic) {
    try {
        const endpoint = `https://api.unsplash.com/photos/random?query=${topic}&orientation=landscape`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Authorization": `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
            }
        });

        if (!response.ok) {
            // Handle API errors (e.g., 401 Unauthorized, 403 Rate Limit)
            console.error("Unsplash API Error:", response.status, await response.text());
            throw new Error(`Unsplash API request failed with status: ${response.status}`);
        }
        const data = await response.json();

        // decide the size
        const imageUrl = data.urls.regular;
        // const imageUrl = data.urls.thumb;

        // or create url for this image with custom size
        //const baseImageUrl = data.urls.full;
        //const imageUrl = `${baseImageUrl}&w=${W}&h=${H}&fit=crop`;

        return imageUrl

    } catch (err) {
        console.error("Error fetching Unsplash image:", err.message);
        return `https://placehold.co/600x400/CCCCCC/000000?text=Ultimate+Fail`;
    }
}