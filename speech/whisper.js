// code snippet voor Azure Whisper Speech to Text
// niet getest met langchain 1.0

//
// npm i @langchain/community
//
import { OpenAIWhisperAudio } from "@langchain/community/document_loaders/fs/openai_whisper_audio";

const filePath = "./audio/test.mp3";

const loader = new OpenAIWhisperAudio(filePath, {
    transcriptionCreateParams: {
        language: "en",         // optional: specify language
        model: "deploy-whisper" // naam van model op azure 
    }
});

const docs = await loader.load();
console.log(docs.map(d => d.pageContent).join("\n\n"));
