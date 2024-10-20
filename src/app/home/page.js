"use client";

import { useState, useEffect, useRef } from "react";
import FlaggedNote from "../components/home/FlaggedNote";
import {
  PhoneArrowUpRightIcon,
  PhoneArrowDownLeftIcon,
  HeartIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import AudioStreamer from "../components/home/AudioStreamer";
import SiriCircle from "../components/home/SiriCircle";

const navigation = [
  { name: "Home", href: "/home", icon: HomeIcon, current: true },
  { name: "Family", href: "/family", icon: HeartIcon, current: false },
  { name: "Friends", href: "/friends", icon: UserGroupIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [audioContext, setAudioContext] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const recognitionRef = useRef(null);
  const [micIconAnimation, setMicIconAnimation] = useState(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support speech recognition. Please use Chrome or Edge."
      );
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptChunk;
        } else {
          interimTranscript += transcriptChunk;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error detected: " + event.error);
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setMicIconAnimation(true); // Trigger animation when recording stops
      setTimeout(() => setMicIconAnimation(false), 2500); // Reset animation after 2.5 seconds
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      setMicIconAnimation(true); // Trigger animation when recording starts
      setTimeout(() => setMicIconAnimation(false), 2500); // Reset animation after 2.5 seconds
    }
  };

  return (
    <>
      <div className="flex h-screen text-neutral-700">
        {/* Desktop Sidebar */}
        <div className="flex flex-col min-w-64">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 items-center">
              <Image
                src="/advait.jpeg"
                alt="Your Company"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-6 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              item.current
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <Image
                      src="/advait.jpeg"
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Joe Biden</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Content Area 1 */}
        <div className="w-1/2 min-h-screen flex flex-col items-center justify-between p-10 bg-[#F5F7F8]">
          <div className="w-full text-start flex justify-between">
            <h1 className="text-2xl font-bold">Sample Audio</h1>
            <button
              className={`h-10 w-10 ${isRecording ? 'text-red-500' : 'text-green-500'} ${micIconAnimation ? 'animate-bounce' : ''}`}
              onClick={toggleRecording}
              aria-label={isRecording ? "Stop Recording" : "Start Recording"}
            >
              {isRecording ? <PhoneArrowDownLeftIcon className="h-6 w-6" /> : <PhoneArrowUpRightIcon className="h-6 w-6" />}
            </button>
          </div>

          <div className="flex-grow flex-col flex items-center justify-center">
            <AudioStreamer isRecording={isRecording} setAudioContext={setAudioContext} setMediaStream={setMediaStream}/>
            {isRecording && audioContext && mediaStream && (
              <SiriCircle
                audioContext={audioContext}
                mediaStream={mediaStream}
              />
            )}
            <h1 className="pt-16 font-bold">
              {(transcript && isRecording) ? `"${transcript}"` : 'Click the microphone to start the call'}
            </h1>
          </div>
          <div className="h-20"></div>
        </div>

        {/* Content Area 2 */}
        <div className="w-1/2 border-l">
          <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Conversation Notes</h1>
            <FlaggedNote
              title="Important Note"
              description="This is an important note."
            />
            <FlaggedNote
              title="Important Note"
              description="This is an important note."
            />
            <FlaggedNote
              title="Important Note"
              description="This is an important note."
            />
          </div>
        </div>
      </div>
    </>
  );
}