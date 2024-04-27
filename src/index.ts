import { ElevenLabsClient, PronunciationDictionary, TextToSpeech } from "elevenlabs";
import fs from "fs";

async function main() {
    // Initialize the ElevenLabs client
    const elevenlabs = new ElevenLabsClient({ apiKey: "YOUR_API_KEY" });

    // Step 1: Create a Pronunciation Dictionary from a File
    const fileStream = fs.createReadStream("/path/to/your/phoneme/file.pls");
    const dictionary = await elevenlabs.pronunciationDictionary.addFromFile(fileStream, {
        name: "TomatoPhonemes",
        description: "Phonemes for tomato and Tomato"
    });

    // Step 2: Play "tomato" with the Voice ID "Rachel"
    let audioStream = await elevenlabs.textToSpeech.convert("Rachel", {
        text: "tomato",
        model_id: "eleven_multilingual_v2",
        pronunciation_dictionary_id: dictionary.id
    });
    play(audioStream);

    // Step 3: Remove the "tomato" Rule from the Pronunciation Dictionary
    await elevenlabs.pronunciationDictionary.removeRulesFromThePronunciationDictionary(dictionary.id, {
        rule_strings: ["tomato"]
    });

    // Step 4: Play "tomato" without the Rule with the Voice ID "Rachel"
    audioStream = await elevenlabs.textToSpeech.convert("Rachel", {
        text: "tomato",
        model_id: "eleven_multilingual_v2",
        pronunciation_dictionary_id: dictionary.id
    });
    play(audioStream);

    // Step 5: Add the Rule "tomato" Again Using its Phoneme
    await elevenlabs.pronunciationDictionary.addRulesToThePronunciationDictionary(dictionary.id, {
        rules: [
            {
                string_to_replace: "tomato",
                phoneme: "təˈmɑːtoʊ",
                alphabet: "IPA",
                type: "phoneme"
            }
        ]
    });

    // Step 6: Play "tomato" with the Voice ID "Rachel" Again
    audioStream = await elevenlabs.textToSpeech.convert("Rachel", {
        text: "tomato",
        model_id: "eleven_multilingual_v2",
        pronunciation_dictionary_id: dictionary.id
    });
    play(audioStream);
}

function play(audioStream: any) {
    // Assume we have a function to play the audio stream
    console.log("Playing audio...");
    // Implementation to play audio would go here
}

main().catch(console.error);
