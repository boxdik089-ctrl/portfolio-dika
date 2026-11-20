import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import type { SongItem } from '../data/portfolioData';

interface AudioContextType {
  songs: SongItem[];
  currentIndex: number;
  currentSong: SongItem;
  isPlaying: boolean;
  progress: number;
  currentTimeStr: string;
  durationStr: string;
  togglePlay: () => void;
  playSongByIndex: (index: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (percent: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const songs = portfolioData.songs;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [durationStr, setDurationStr] = useState('04:01');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songs[currentIndex] || songs[0];

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = currentSong.audio;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (!audio.duration || isNaN(audio.duration)) return;
      const current = audio.currentTime;
      const total = audio.duration;
      setProgress((current / total) * 100);
      setCurrentTimeStr(formatTime(current));
      setDurationStr(formatTime(total));
    };

    const onEnded = () => {
      // Auto play next song
      setCurrentIndex((prev) => (prev + 1) % songs.length);
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDurationStr(formatTime(audio.duration));
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audioRef.current = null;
    };
  }, []);

  // Update src when current song changes
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const shouldPlay = isPlaying;

    audio.src = currentSong.audio;
    audio.currentTime = 0;
    setProgress(0);
    setCurrentTimeStr('00:00');
    setDurationStr(currentSong.duration);

    if (shouldPlay) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play prevented by browser policy:', err);
        setIsPlaying(false);
      });
    }
  };

  const playSongByIndex = (index: number) => {
    if (index === currentIndex && isPlaying) {
      togglePlay();
      return;
    }
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const seek = (percent: number) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const clamped = Math.max(0, Math.min(100, percent));
    const targetTime = (clamped / 100) * audioRef.current.duration;
    audioRef.current.currentTime = targetTime;
    setProgress(clamped);
  };

  return (
    <AudioContext.Provider
      value={{
        songs,
        currentIndex,
        currentSong,
        isPlaying,
        progress,
        currentTimeStr,
        durationStr,
        togglePlay,
        playSongByIndex,
        nextSong,
        prevSong,
        seek
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
