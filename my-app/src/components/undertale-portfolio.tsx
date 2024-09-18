'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VT323 } from 'next/font/google'

const vt323 = VT323({ weight: '400', subsets: ['latin'] })

export function UndertalePortfolio() {
  const [text, setText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [evilMode, setEvilMode] = useState(false)
  const [evilStage, setEvilStage] = useState(0)
  const [isShaking, setIsShaking] = useState(false)

  const dialogues = [
    "* Hi, I'm Andrew.",
    "* Welcome to my Undertale-themed website!",
    "* I'm a student in Computer Science with a passion for designing fun, interactive websites like this one.",
    "* My skills include web development, machine learning, and UI/UX design.",
    "* Want to see my projects? Just select 'Projects' below!",
    "* Feel free to contact me anytime.",
    "* Thanks for visiting!"
  ]

  const evilDialogues = ["why...", "WHY DID YOU CLICK THE BUTTON!?!?", "I told you not to..."]

  useEffect(() => {
    if (isTyping) {
      const currentDialogue = evilMode ? evilDialogues[evilStage] : dialogues[currentTextIndex]
      if (text.length < currentDialogue.length) {
        const timeout = setTimeout(() => {
          setText(currentDialogue.slice(0, text.length + 1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setIsTyping(false)
        if (evilMode && evilStage < evilDialogues.length - 1) {
          setTimeout(() => {
            setEvilStage(evilStage + 1)
            setText('')
            setIsTyping(true)
          }, 1000)
        }
      }
    }
  }, [text, isTyping, currentTextIndex, evilMode, evilStage])

  const handleNext = () => {
    if (!evilMode) {
      if (text.length < dialogues[currentTextIndex].length) {
        setText(dialogues[currentTextIndex])
        setIsTyping(false)
      } else if (currentTextIndex < dialogues.length - 1) {
        setCurrentTextIndex(currentTextIndex + 1)
        setText('')
        setIsTyping(true)
      }
    }
  }

  const handlePrev = () => {
    if (!evilMode && currentTextIndex > 0) {
      setCurrentTextIndex(currentTextIndex - 1)
      setText('')
      setIsTyping(true)
    }
  }

  const handleEvilClick = () => {
    setEvilMode(true)
    setEvilStage(0)
    setText('')
    setIsTyping(true)
    setIsShaking(true)
  }

  const handleGoBack = () => {
    setEvilMode(false)
    setEvilStage(0)
    setText('')
    setIsTyping(true)
    setIsShaking(false)
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${evilMode ? 'bg-true-red' : 'bg-black'} ${isShaking ? 'shake' : ''} ${vt323.className}`}>
      <style jsx global>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .shake {
          animation: shake 0.5s;
          animation-iteration-count: infinite;
        }
        .bg-true-red {
          background-color: #880000;
        }
        .text-scarlet {
          color: #FF2400;
        }
        .retro-button {
          background-color: black;
          border: 2px solid white;
          color: white;
          padding: 10px;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .retro-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .retro-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .evil-flower {
          filter: brightness(0.85);
        }
        .small-button {
          font-size: 12px;
          padding: 5px;
          height: auto;
          width: auto;
        }
        .green-button {
          background-color: black;
          border: 2px solid #00FF00;
          color: #00FF00;
        }
        .green-button:hover {
          background-color: #001100;
        }
        .red-button {
          background-color: black;
          border: 2px solid #FF0000;
          color: #FF0000;
        }
        .red-button:hover {
          background-color: #110000;
        }
      `}</style>
      <div className="relative w-full max-w-2xl p-8">
        <div className="mb-4 flex justify-center">
          <img
            src={evilMode 
              ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/evil_flowey_undertale-removebg-preview-nLCs9CPxspZW4hXbu972CdIT7zEDds.png"
              : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pngegg-xX3hkNESNTITOCd6ZsjBWEMtDnHZ7k.png"}
            alt={evilMode ? "Evil flower pixel art" : "Smiling flower pixel art"}
            style={{ height: '15vh', width: 'auto' }}
            className={evilMode ? 'evil-flower' : ''}
          />
        </div>
        <div className="p-4 bg-black text-white rounded border-2 border-white">
          <p className={`text-2xl leading-relaxed whitespace-pre-wrap ${evilMode ? 'text-scarlet' : ''}`}>{text}</p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            className="retro-button"
            disabled={currentTextIndex === 0 || evilMode}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="retro-button"
            disabled={(currentTextIndex === dialogues.length - 1 && text.length === dialogues[currentTextIndex].length) || evilMode}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <nav className="mt-8 flex justify-center space-x-4">
        <button className="retro-button w-32 h-16">
          Projects
        </button>
        <button className="retro-button w-32 h-16">
          Skills
        </button>
        <button className="retro-button w-32 h-16">
          Contact
        </button>
      </nav>
      <button 
        className="retro-button small-button red-button absolute bottom-4 left-4"
        onClick={handleEvilClick}
        disabled={evilMode}
      >
        DON'T CLICK HERE
      </button>
      {evilMode && (
        <button 
          className="retro-button green-button absolute bottom-4 right-4 text-xs"
          onClick={handleGoBack}
        >
          GO BACK
        </button>
      )}
    </div>
  )
}