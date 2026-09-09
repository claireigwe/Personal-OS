"use client";

let currentAudio: HTMLAudioElement | null = null;

// Cleans up lesson strings so they pronounce properly as single Dutch letters or words
function cleanDutchText(text: string): string {
  let cleaned = text.trim();

  // If format is like "A a" or "B b" (capital and small letter pair), extract just ONE single letter!
  const letterPairMatch = cleaned.match(/^([A-Za-z])\s+\1$/i);
  if (letterPairMatch) {
    const letter = letterPairMatch[1].toLowerCase();
    if (letter === "y") return "Griekse ij";
    return letter;
  }

  // If format is like "IJ ij", pronounce as Dutch "lange ij"
  if (/^ij\s+ij$/i.test(cleaned)) {
    return "lange ij";
  }

  // If format is like "a (in 'kat')", extract the Dutch example word 'kat'
  const wordInQuotes = cleaned.match(/\(in\s+['"]([^'"]+)['"]\)/i);
  if (wordInQuotes) {
    return wordInQuotes[1];
  }

  // Remove any leftover parenthetical English notes e.g. " (Greek ij)"
  cleaned = cleaned.replace(/\s*\([^)]*\)/g, "").trim();

  return cleaned || text;
}

export function speakDutch(text: string, onEnd?: () => void): boolean {
  if (typeof window === "undefined") return false;

  const textToSpeak = cleanDutchText(text);

  // Stop any existing audio or speech synthesis
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  // 1. Play authentic native Dutch audio stream via our local /api/tts proxy
  try {
    const audioUrl = `/api/tts?q=${encodeURIComponent(textToSpeak)}&lang=nl`;
    const audio = new Audio(audioUrl);
    currentAudio = audio;

    audio.onended = () => {
      currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      currentAudio = null;
      // Fallback to Web Speech API if offline
      fallbackToSpeechSynthesis(textToSpeak, onEnd);
    };

    audio.play().catch(() => {
      fallbackToSpeechSynthesis(textToSpeak, onEnd);
    });

    return true;
  } catch {
    fallbackToSpeechSynthesis(textToSpeak, onEnd);
    return true;
  }
}

function fallbackToSpeechSynthesis(text: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "nl-NL";
  utterance.rate = 0.85;

  const voices = window.speechSynthesis.getVoices();
  const dutchVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith("nl") ||
      v.name.toLowerCase().includes("dutch") ||
      v.name.toLowerCase().includes("nederlands")
  );
  if (dutchVoice) {
    utterance.voice = dutchVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}
