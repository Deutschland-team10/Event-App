import React from "react";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

const StartPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // sm: 600px altı

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f5f5f5",
                padding: 2,
                boxSizing: "border-box",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center",
                    mb: 2,
                    gap: 2,
                }}
            >
                <Typography variant="h5">
                    ZusammenFun
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <a
                        href="/login"
                        style={{ fontSize: "18px", color: "gray", textDecoration: "none" }}
                    >
                        Bereits Mitglied?
                    </a>
                    <Button
                        variant="contained"
                        href="/login"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            backgroundColor: "lightblue",
                            fontSize: "18px",
                            borderColor: "blue",
                            textTransform: "none",
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    flex: 1,
                    overflow: "hidden",
                    gap: 2,
                }}
            >
                {/* Left Section */}
                <motion.div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "1rem",
                        backgroundColor: "lightgray",
                        borderRadius: "1rem",
                        gap: "1rem",
                        height: isMobile ? "auto" : "100%",
                    }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Typography variant={isMobile ? "h6" : "h5"}>
                        Finde Menschen mit gleichen Interessen & tolle Aktivitäten
                    </Typography>
                    <Typography variant="body1">
                        Mach mit, wenn du mehr erleben und dabei neue Leute treffen willst.
                    </Typography>
                    <Button
                        variant="contained"
                        href="/register"
                        sx={{
                            width: "300px",
                            height: "55px",
                            fontSize: "18px",
                            borderRadius: "20px",
                            color: "white",
                            backgroundColor: "lightblue",
                        }}
                    >
                        Kostenlos mitmachen
                    </Button>

                    <Box display="flex" gap={2} mt={2} flexWrap="wrap">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                            style={{ height: "40px", objectFit: "contain" }}
                        />
                        <img
                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="App Store"
                            style={{ height: "40px", objectFit: "contain" }}
                        />
                    </Box>
                </motion.div>

                {/* Right Section - Images */}
                <motion.div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        overflow: "hidden",
                        height: isMobile ? "auto" : "100%",
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Box
                        display="flex"
                        flexDirection={isMobile ? "column" : "row"}
                        gap={2}
                        height={isMobile ? "auto" : "50%"}
                    >
                        <img
                            src="/img/friends.jpg"
                            alt="Friends"
                            style={{
                                flex: 1,
                                objectFit: "cover",
                                borderRadius: "1rem",
                                width: "100%",
                                height: isMobile ? "200px" : "100%",
                            }}
                        />
                        <img
                            src="/img/dance.jpg"
                            alt="Dance"
                            style={{
                                flex: 1,
                                objectFit: "cover",
                                borderRadius: "1rem",
                                width: "100%",
                                height: isMobile ? "200px" : "100%",
                            }}
                        />
                    </Box>

                    <Box
                        display="flex"
                        flexDirection={isMobile ? "column" : "row"}
                        gap={2}
                        height={isMobile ? "auto" : "50%"}
                    >
                        <img
                            src="/img/hike.jpg"
                            alt="Hike"
                            style={{
                                flex: 1,
                                objectFit: "cover",
                                borderRadius: "1rem",
                                width: "100%",
                                height: isMobile ? "200px" : "100%",
                            }}
                        />
                        <img
                            src="/img/bike.jpg"
                            alt="Bike"
                            style={{
                                flex: 1,
                                objectFit: "cover",
                                borderRadius: "1rem",
                                width: "100%",
                                height: isMobile ? "200px" : "100%",
                            }}
                        />
                    </Box>
                </motion.div>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: "#f8f8f8",
                    borderRadius: "8px",
                    color: "gray",
                    textAlign: "center",
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Die Plattform, um Leute in deiner Nähe kennenzulernen
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 1,
                        mx: "auto",
                        maxWidth: isMobile ? "100%" : "800px",
                    }}
                >
                    Nimm bei <strong>GemeinsamErleben</strong> an spannenden Aktivitäten
                    teil oder organisiere deine eigenen. Finde Gleichgesinnte für
                    Freizeit, Sport und Reisen und füllt gemeinsam euer Leben mit mehr
                    Abwechslung und schönen Erlebnissen.
                </Typography>
            </Box>
        </Box>
    );
};

export default StartPage;


