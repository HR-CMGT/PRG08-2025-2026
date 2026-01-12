import { writeFile } from "fs/promises";
import Replicate from "replicate";
const replicate = new Replicate();

// kokoro text to speech via replicate api

const input = {
    text: "Hi! I'm Hamster Pip!, today is the first day of a grand adventure!",
    voice: "af_nicole"
};

const output = await replicate.run("jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13", { input });

// To access the file URL:
console.log(output.url());
//=> "https://replicate.delivery/.../output.wav"

// To write the file to disk:
await writeFile("output.wav", output);
//=> output.wav written to disk