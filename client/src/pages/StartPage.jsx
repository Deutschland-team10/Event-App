import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const StartPage = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center",justifyContent:"space-between", padding: "1rem", marginLeft: "2rem", marginRight: "2rem"}}>
      {/* Header */}
      <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "2rem"}}>
        <h1 className="text-2xl  tracking-tight">GEMEINSAM ERLEBEN<span className="text-sm ml-1">.com</span></h1>
        <div style={{display: "flex", alignItems: "center", justifyContent:"flex-end", gap: "1rem"}}>
          <a href="/login" style={{fontSize:"24px",color:"gray", textDecoration:"none"}}>Bereits Mitglied?</a>
          <Button type="button" variant="outlined" href="/login" style={{borderRadius:"20px",color:"blue",fontSize:"24px", borderColor:"blue"}}>Login</Button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
        {/* Left - Text */}
        <motion.div
          style={{flex: 1, display: "flex", alignItems:"center", flexDirection: "column", justifyContent: "center",borderRadius:"2rem",height:"670px", backgroundColor:"lightgray", padding: "1rem",gap:"1rem",marginTop: "1rem"}}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div>
          <h2 style={{fontSize: "40px", textAlign:"left"}}>
            Finde Menschen mit gleichen Interessen & tolle Aktivitäten
          </h2>
          <p style={{fontSize: "20px", textAlign: "left", marginTop: "1rem"}}>
            Mach mit, wenn du mehr erleben und dabei neue Leute treffen willst.
          </p>
          </div>
          <Button variant="contained" size="sm" color="success" href="/register">
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
        <div
          style={{display:"flex" ,flexDirection: "column",padding: "1rem",gap:"1rem", height:"100%",maxWidth:"900px"}}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <img src="/img/friends.jpg" alt="Friends" style={{borderRadius:"2rem", maxWidth:"550px" }} />
          <img src="/img/dance.jpg" alt="Dancing" style={{borderRadius:"2rem", width:"100%"}} />
          </div>
          <div style={{ display: 'flex', gap: '16px'}}>
          <img src="/img/hike.jpg" alt="Hiking" style={{borderRadius:"2rem", width:"100%" }} />
          <img src="/img/bike.jpg" alt="Biking" style={{borderRadius:"2rem", width:"100%"}} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{textAlign: "center", marginTop: "2rem", padding: "1rem", backgroundColor: "#f8f8f8", borderRadius: "8px", color:"gray"}  }>
        <p style={{fontSize: "40px", fontWeight: "bold"}}>
          Die Plattform, um Leute in deiner Nähe kennenzulernen
        </p>
        <p style={{fontSize: "20px", marginTop: "1rem", marginLeft: "22rem", marginRight: "22rem"}}>
          Nimm bei <strong>GemeinsamErleben</strong> an spannenden Aktivitäten teil oder organisiere deine eigenen.
          Finde Gleichgesinnte für Freizeit, Sport und Reisen und füllt gemeinsam euer Leben mit mehr Abwechslung und schönen Erlebnissen.
        </p>
      </div>
    </div>
  );
};

export default StartPage;



