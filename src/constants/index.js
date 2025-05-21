const navLinks = [
    {
        name: "Work",
        link: "#work",
    },
    {
        name: "Experience",
        link: "#experience",
    },
    {
        name: "Skills",
        link: "#skills",
    },
];

const words = [
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
    { value: 2, suffix: "+", label: "Years of Experience" },
    { value: 8, suffix: "+", label: "Completed Projects" },
    { value: 6, suffix: "+", label: "Hackathons Attended" },
    { value: 8, suffix: "+", label: "Courses Completed" },
];



const techStackImgs = [
    {
        name: "React Developer",
        imgPath: "/images/logos/react.png",
    },
    {
        name: "Python Developer",
        imgPath: "/images/logos/python.svg",
    },
    {
        name: "Backend Developer",
        imgPath: "/images/logos/node.png",
    },
    {
        name: "Interactive Developer",
        imgPath: "/images/logos/three.png",
    },
    {
        name: "Project Manager",
        imgPath: "/images/logos/git.svg",
    },
];

const techStackIcons = [
    {
        name: "React Developer",
        modelPath: "/models/react_logo-transformed.glb",
        scale: 1,
        rotation: [0, 0, 0],
    },
    {
        name: "Python Developer",
        modelPath: "/models/python-transformed.glb",
        scale: 0.8,
        rotation: [0, 0, 0],
    },
    {
        name: "Backend Developer",
        modelPath: "/models/node-transformed.glb",
        scale: 5,
        rotation: [0, -Math.PI / 2, 0],
    },
    {
        name: "Interactive Developer",
        modelPath: "/models/three.js-transformed.glb",
        scale: 0.05,
        rotation: [0, 0, 0],
    },
    {
        name: "Project Manager",
        modelPath: "/models/git-svg-transformed.glb",
        scale: 0.05,
        rotation: [0, -Math.PI / 4, 0],
    },
];

const expCards = [
    {
        review: "Robotics for Space Exploration (RSX) is the UofT Mars Rover design team. They compete with Mars Rovers in international competitions, such as the University Rover Challenge and Canadian International Rover Challenge.",
        imgPath: "/images/rsxbanner.jpeg",
        logoPath: "/images/rsxLogo.png",
        title: "Software Developer",
        date: "November 2024 - Present",
        responsibilities: [
            "Designed and implemented hierarchical state machnes using the SMACH library in ROS to allow rover to execute complex autonomous behaviour.",
            "Developed path-planning algorithms using Python and C++ to assist the rover in navigating through rough terrain and avoiding obstacles.",
            "Used Altium to analyze schematics and PCB layouts to identify and resolve circuit design issues.",
        ],
    },
    {
        review: "Worked alongside a conservator from the EJ Pratt Library to optimize the library's book preservation methods while maintaining safe quality of the paper. A full scale model was presented to the client.",
        imgPath: "/images/exp2.png",
        logoPath: "/images/logo2.png",
        title: "Project Manager",
        date: "December 2024 - April 2025",
        responsibilities: [
            "Utilized Fusion360 model a custom suction wedge protototype for the EJ Pratt Library and operated a 3d printer to produce a functional physical mode.",
            "Led a team of 6 to create a project requirements document and conceptual design specification encompassing project needs, constraints and functions.",
            "Coordinated regular teem meetings and developed a Gantt chart to map out timelines and understand task dependencies",
        ],
    },
    {
        review: "Code Ninjas is a franchise that teaches kids ages 5 - 14 how to code through building video game. The content focuses on problem-solving, critical thinking and logical reasoning through interactive activties.",
        imgPath: "/images/codeNinjasBanner.jpg",
        logoPath: "/images/codeNinjas.png",
        title: "Course Developer",
        date: "May 2023 - August 2024",
        responsibilities: [
            "Collaborated with a team to structure an interactive course that teaches programming skills in Scratch, JavaScript, and C++ to over 250 students.",
            "Designed a new game development curriculum using Roblox Studio to teach students the principles of video game design and graphical interfaces.",
            "Instructed middle school students the basics of 3d printing and modelling using AutoCad in a 2 month summer camp.",
        ],
    },
];


const socialImgs = [
    {
        name: "insta",
        imgPath: "/images/insta.png",
    },
    {
        name: "linkedin",
        imgPath: "/images/linkedin.png",
    },
];

export {
    words,
    counterItems,
    expCards,
    socialImgs,
    techStackIcons,
    techStackImgs,
    navLinks,
};