import { useState } from "react";

const useVoiceSearch = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = SpeechRecognition
        ? new SpeechRecognition()
        : null;

    if (recognition) {
        recognition.continuous = false;
        recognition.lang = "en-US";
    }

    const startListening = () => {
        if (!recognition) {
            alert("Voice Search not supported");
            return;
        }

        recognition.start();

        setIsListening(true);

        recognition.onresult = (event) => {
            const voiceText = event.results[0][0].transcript;

            setTranscript(voiceText);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    return {
        isListening,
        transcript,
        startListening,
    };
};

export default useVoiceSearch;