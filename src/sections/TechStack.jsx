import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import TechStackLazy from "../sections/TechStackLazy";
import { techStackIcons } from "../constants";

const TechStack = () => {
    useGSAP(() => {
        gsap.fromTo(
            ".tech-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: "#skills",
                    start: "top center",
                },
            }
        );
    });

    return (
        <div id="skills" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Skills"
                    sub="🤝 What I Bring to the Table"
                />
                <div className="tech-grid">
                    {techStackIcons.map((icon) => (
                        <TechStackLazy key={icon.name} techStackIcon={icon} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechStack;
