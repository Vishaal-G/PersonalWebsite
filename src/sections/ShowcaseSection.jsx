import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
    const sectionRef = useRef(null);
    const rydeRef = useRef(null);
    const libraryRef = useRef(null);
    const ycDirectoryRef = useRef(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );

        // Animations for each app showcase
        const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                    },
                }
            );
        });
    }, []);

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    <div ref={rydeRef} className="first-project-wrapper">
                        <div className="image-wrapper">
                            <img src="/images/utopia.png" alt="Utopia" />
                        </div>
                        <div className="text-content">
                            <h2>
                                UTopia: Event Finder At UofT
                            </h2>
                            <p className="text-white-50 md:text-xl">
                                Built using React.js, Python, DynamoDB and Java Open Street Map (JOSM)
                            </p>
                        </div>
                    </div>

                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={libraryRef}>
                            <div className="image-wrapper bg-[#FFEFDB]">
                                <img
                                    src="/images/robot.jpg"
                                    alt="Library Management Platform"
                                />
                            </div>
                            <h2>VoltsWagon: Arduino Powered Trash Collector</h2>
                        </div>

                        <div className="project" ref={ycDirectoryRef}>
                            <div className="image-wrapper bg-[#FFE7EB]">
                                <img src="/images/reverse.png" alt="YC Directory App" />
                            </div>
                            <h2>Reversi Game With Built In Minimax AI Opponent</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppShowcase;