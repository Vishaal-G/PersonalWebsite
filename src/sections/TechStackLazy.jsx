// components/TechCardLazy.jsx
import { useInView } from "react-intersection-observer";
import TechIconCardExperience from "./tech_logos/TechIconCardExperience";

const TechStackLazy = ({ techStackIcon }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div
            ref={ref}
            className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
        >
            <div className="tech-card-animated-bg" />
            <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                    {inView && <TechIconCardExperience model={techStackIcon} />}
                </div>
                <div className="padding-x w-full">
                    <p>{techStackIcon.name}</p>
                </div>
            </div>
        </div>
    );
};

export default TechStackLazy;
