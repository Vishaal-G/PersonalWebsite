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
    {
        name: "Testimonials",
        link: "#testimonials",
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

const logoIconsList = [
    {
        imgPath: "/images/logos/company-logo-1.png",
    },
    {
        imgPath: "/images/logos/company-logo-2.png",
    },
    {
        imgPath: "/images/logos/company-logo-3.png",
    },
    {
        imgPath: "/images/logos/company-logo-4.png",
    },
    {
        imgPath: "/images/logos/company-logo-5.png",
    },
    {
        imgPath: "/images/logos/company-logo-6.png",
    },
    {
        imgPath: "/images/logos/company-logo-7.png",
    },
    {
        imgPath: "/images/logos/company-logo-8.png",
    },
    {
        imgPath: "/images/logos/company-logo-9.png",
    },
    {
        imgPath: "/images/logos/company-logo-10.png",
    },
    {
        imgPath: "/images/logos/company-logo-11.png",
    },
];

const abilities = [
    {
        imgPath: "/images/seo.png",
        title: "Quality Focus",
        desc: "Delivering high-quality results while maintaining attention to every detail.",
    },
    {
        imgPath: "/images/chat.png",
        title: "Growth Mindset",
        desc: "Always seeking new challenges to sharpen technical skills and apply classroom knowledge to real-world problems."
    },
    {
        imgPath: "/images/time.png",
        title: "On-Time Delivery",
        desc: "Accustomed to balancing multiple responsibilities while delivering quality results under time constraints.",
    },
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

const expLogos = [
    {
        name: "logo1",
        imgPath: "/images/logo1.png",
    },
    {
        name: "logo2",
        imgPath: "/images/logo2.png",
    },
    {
        name: "logo3",
        imgPath: "/images/logo3.png",
    },
];

const testimonials = [
    {
        name: "Torin M",
        mentions: "@torinM",
        review:
            "It was great working with Vishaal to design the suction wedge project. He took on a leadership and put maximum effort into his work, ensuring that the project was completed with high quality.",
        imgPath: "/images/client1.png",
    },
    {
        name: "Daniel M",
        mentions: "@danielM",
        review:
            "Working with Vishaal was an absolute game-changer. His ability to simplify complex challenges and keep our team aligned made a huge impact on project delivery.",
        imgPath: "/images/client3.png",
    },
    {
        name: "Leo C",
        mentions: "@leoC",
        review:
            "The commitment to quality and a problem-solving mindset made a noticeable difference throughout the project lifecycle.",
        imgPath: "/images/client2.png",
    },
    {
        name: "Aarav P",
        mentions: "@aaravP",
        review:
            "Vishaal consistently brings fresh ideas and technical skill to every hackathon we’ve worked on together. His ability to quickly prototype and pivot under pressure is what sets him apart.",
        imgPath: "/images/client5.png",
    },
    {
        name: "Jia L",
        mentions: "@jiaL",
        review:
            "What impressed me most was how Venkat balanced both leadership and listening. He knows when to take charge, and when to elevate the ideas of others.",
        imgPath: "/images/client4.png",
    },
    {
        name: "Bob T",
        mentions: "@bobT",
        review:
            "His calm under pressure and collaborative spirit made him the glue of our team. Whether it was debugging at 2 AM or pitching to judges, Vishaal was all in.",
        imgPath: "/images/client6.png",
    },
];

const socialImgs = [
    {
        name: "insta",
        imgPath: "/images/insta.png",
    },
    {
        name: "fb",
        imgPath: "/images/fb.png",
    },
    {
        name: "x",
        imgPath: "/images/x.png",
    },
    {
        name: "linkedin",
        imgPath: "/images/linkedin.png",
    },
];

export {
    words,
    abilities,
    logoIconsList,
    counterItems,
    expCards,
    expLogos,
    testimonials,
    socialImgs,
    techStackIcons,
    techStackImgs,
    navLinks,
};