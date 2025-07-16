import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const StartPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-8 pb-16">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">GEMEINSAM ERLEBEN<span className="text-sm font-normal ml-1">.com</span></h1>
        <div>
          <a href="/login" className="text-sm text-gray-700 mr-4">Bereits Mitglied?</a>
          <Button variant="outlined" size="small">Login</Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full max-w-6xl flex flex-col-reverse lg:flex-row gap-6">
        {/* Left - Text */}
        <motion.div
          className="flex-1 bg-gray-100 p-6 rounded-xl flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            Finde Menschen mit gleichen Interessen & tolle Aktivitäten
          </h2>
          <p className="text-gray-600 mb-6">
            Mach mit, wenn du mehr erleben und dabei neue Leute treffen willst.
          </p>
          <Button variant="contained" size="large" color="primary">
            Kostenlos mitmachen
          </Button>
          <div className="flex gap-4 mt-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div>
        </motion.div>

        {/* Right - Images */}
        <motion.div
          className="flex-1 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src="/img/friends.jpg" alt="Friends" className="rounded-xl object-cover h-48 w-full" />
          <img src="/img/dance.jpg" alt="Dancing" className="rounded-xl object-cover h-48 w-full" />
          <img src="/img/hike.jpg" alt="Hiking" className="rounded-xl object-cover h-48 w-full" />
          <img src="/img/bike.jpg" alt="Biking" className="rounded-xl object-cover h-48 w-full" />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center max-w-4xl text-gray-700">
        <h3 className="text-xl font-semibold mb-2">
          Die Plattform, um Leute in deiner Nähe kennenzulernen
        </h3>
        <p>
          Nimm bei <strong>GemeinsamErleben</strong> an spannenden Aktivitäten teil oder organisiere deine eigenen.
          Finde Gleichgesinnte für Freizeit, Sport und Reisen und füllt gemeinsam euer Leben mit mehr Abwechslung und schönen Erlebnissen.
        </p>
      </div>
    </div>
  );
};

export default StartPage;



