import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import audio from './Cross Candy Audio.mp3';

// UI Components Imports
import { Container } from './ui/reused-ui/Container.jsx'
import Candies from './Candies.jsx'

// Assets Imports
import Flexi_Hello from './assets/flexi_hello.png'
import Flexi_Stars from './assets/flexi_stars.png'
import Flexi_Confused from './assets/flexi_confused.png'

// UI Animation Imports
import './ui/reused-animations/fade.css';
import './ui/reused-animations/scale.css';
import './ui/reused-animations/glow.css';

const CrossOutSubtraction = () => {
        // Helpers
        const initialRound = useMemo(() => {
                const newCandies = Math.floor(Math.random() * 7) + 6; // 6-12
                const newToKeep = Math.floor(Math.random() * (newCandies - 1)) + 1; // 1..newCandies-1
                return { candies: newCandies, toKeep: newToKeep };
        }, []);

        // State Management
        const [candies, setCandies] = useState(initialRound.candies)
        const [candiesToKeep, setCandiesToKeep] = useState(initialRound.toKeep);
        const [candiesLeft, setCandiesLeft] = useState(initialRound.candies);
        const [flexiImage, setFlexiImage] = useState(Flexi_Hello);
        const [isCorrect, setIsCorrect] = useState(false);
        const [roundId, setRoundId] = useState(0);
        const resetTimeoutRef = useRef(null);
        const [winPulseId, setWinPulseId] = useState(0);
        const audioRef = useRef(new Audio(audio));

        // Functions
        const handleCandyDelta = (delta) => {
                setCandiesLeft((prev) => prev + delta);
        };

        const randomizeRound = () => {
                const newCandies = Math.floor(Math.random() * 7) + 6; // 6-12
                const newToKeep = Math.floor(Math.random() * (newCandies - 1)) + 1; // 1..newCandies-1
                setCandies(newCandies);
                setCandiesToKeep(newToKeep);
                setCandiesLeft(newCandies);
                setFlexiImage(Flexi_Hello);
                setIsCorrect(false);
                setRoundId((id) => id + 1);
        };

        const handleCheckAnswer = () => {
                const expected = candies - candiesToKeep;
                if (candiesLeft === expected) {
                        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
                        setFlexiImage(Flexi_Stars);
                        setIsCorrect(true);
                        setWinPulseId((id) => id + 1);
                        if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
                        resetTimeoutRef.current = setTimeout(() => {
                                randomizeRound();
                        }, 3000);
                } else {
                        setFlexiImage(Flexi_Confused);
                        setIsCorrect(false);
                }
        };

        const handleCountButtonClick = () => {
                if (isCorrect) return;
                handleCheckAnswer();
        };

        useEffect(() => {
                return () => {
                        if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
                };
        }, []);

        const handleSoundClick = () => {
                audioRef.current.currentTime = 0; // Reset to beginning
                audioRef.current.play()
        };

        // Render
        return (
                <Container 
                        text="Cross Out Subtraction"
                        showResetButton={false}
                        borderColor="#FF7B00"
                        showSoundButton={true}
                        onSound={handleSoundClick}
                >       
                <div className='h-[100%] flex flex-col items-center space-between'>
                        <div className='text-center text-sm text-gray-500 p-5'>
                                Flexi wants to share some candy with you! Cross out the candies he wants to keep to see how many he can give you!
                        </div>

                        <div className='w-[93%] h-[72%] flex flex-col items-center'>
                                <div className='relative top-[15%] translate-y-[-15%] flex flex-col items-center gap-4'>
                                        <Candies key={roundId} number={candies} onToggleDelta={handleCandyDelta} pulseTrigger={winPulseId} />
                                        <button type='button' className={`text-xl md:text-2xl font-bold px-2 py-1 bg-green-100 text-green-700 border border-green-300 rounded-lg shadow-sm hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-[0.98] transition ${isCorrect ? 'cursor-default' : 'cursor-pointer'}`} onClick={handleCountButtonClick}>
                                                {candiesLeft} Candies
                                        </button>
                                </div>

                                <div className='absolute bottom-[5%] w-[100%] ml-[-3%] flex flex-row items-center gap-3'>
                                        <img 
                                                src={flexiImage} 
                                                alt="Flexi Confused" 
                                                className='w-[70px] ml-[5%] mt-3' 
                                                />
                                        <div className='text-[#FF7B00] font-extrabold text-sm'>
                                                {isCorrect 
                                                        ? `That's right! You can have these now.`
                                                        : `I have ${candies} candies but I want to keep ${candiesToKeep} for myself. How many candies can I give you?`}
                                        </div>
                                </div>
                        </div>
                </div>
                </Container>
        )
};


export default CrossOutSubtraction;