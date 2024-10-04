import React, { useState } from "react";
import Button from "./Button";
import RadialGradient from "./RadialGradient";
import { headerIntroData } from "../assets/lib/data";
import { useSectionInView } from "../assets/lib/hooks";
import { useActiveSectionContext } from "../context/active-section-context";
import { BsMouse } from "react-icons/bs";
import { FiUpload } from "react-icons/fi"; // Import de l'icône de téléchargement

const HeaderIntro: React.FC = () => {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleCvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCvFile(event.target.files[0]);
      console.log("Uploaded CV:", event.target.files[0].name);
    }
  };

  return (
    <section
      className="hero flex flex-col justify-center gap-10 items-center h-full max-lg:h-full max-lg:gap-6"
      ref={ref}
      id="home"
    >
      <RadialGradient scale="scale-y-125" opacity="opacity-30" />

      <img
        src={headerIntroData.profilepicture}
        alt={headerIntroData.profilepicture}
        className="w-1/6 drop-shadow-2xl rounded-full shadow-2xl avatar-img max-lg:w-3/4"
      />
      <h1>
        {headerIntroData.title.en}
        <span className="wave text-7xl">&#128075;&#127997;</span>
      </h1>
      <h2>{headerIntroData.subtitle}</h2>
      <p className="w-1/2 text-center max-lg:hidden">
        {headerIntroData.description.en}
      </p>

      {/* Conteneur des boutons incluant le bouton Upload CV */}
      <div className="button-container flex items-center justify-center mr-8 gap-10 mb-12 max-lg:flex-col max-lg:items-center">
        {headerIntroData.buttons.map((button, index) => (
          <Button
            key={index}
            label={button.label.en}
            iconSVG={button.icon}
            link={`#${button.name.toLocaleLowerCase()}`}
            buttoncolor={button.color}
            onClick={() => {
              setActiveSection(button.name);
              setTimeOfLastClick(Date.now());
            }}
          />
        ))}

        {/* Bouton Upload CV avec icône */}
        <label
          htmlFor="cv-upload"
          className="bg-[--orange] text-white font-bold py-2 px-6 rounded-lg cursor-pointer flex items-center gap-2"
        >
          <FiUpload className="text-xl" /> {/* Icône de téléchargement */}
          Download CV
        </label>
        <input
          type="file"
          id="cv-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleCvUpload}
          className="hidden"
        />
      </div>

      {cvFile && (
        <p className="text-sm mt-2 text-center">
          Uploaded: {cvFile.name}
        </p>
      )}

      <div className="scroll-down-container animate-bounce flex gap-6">
        <BsMouse className="text-[2.6rem]" />
      </div>
    </section>
  );
};

export default HeaderIntro;
