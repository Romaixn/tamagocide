import { useRef } from "react";
import { css } from "../styled-system/css";
import { useProgress } from "@react-three/drei";
import { useGame } from "./stores/useGame";

const Welcome = () => {
  const start = useGame((state) => state.start);
  const phase = useGame((state) => state.phase);

  // Loader configuration
  const { progress, active } = useProgress();

  const size = 140;
  const strokeWidth = 1.5;
  const color = "var(--ui-color)";
  const center = size / 2;
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - progress / 100);
  const isLoaded = progress === 100;

  return (
    <div
      className={css({
        position: "fixed",
        inset: 0,
        display: "flex",
        zIndex: 1000,
        pointerEvents: phase !== "welcome" ? "none" : "auto",
        opacity: phase !== "welcome" ? 0 : 1,
        transition: "opacity 1.5s",
      })}
    >
      {/* Main Content Container */}
      <div
        className={css({
          position: "relative",
          zIndex: 2,
          display: "flex",
          width: "100%",
          height: "100%",
        })}
      >
        {/* Left Side Content */}
        <div
          className={css({
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
            maxWidth: { base: "100%", md: "50%" },
          })}
        >
          {/* Header */}
          <header
            className={css({
              textAlign: { base: "center", md: "left" },
              marginBottom: "1.5rem",
              textTransform: "uppercase",
              opacity: 1,
              transition: "opacity 0.4s ease-in-out",
            })}
          >
            A challenge by Bruno Simon "Tamagotchi" theme • Built by <a href="https://rherault.dev" target="_blank">Romain Herault</a>
          </header>
        </div>

        {/* Center Launch Button Container */}
        <div
          className={css({
            position: "absolute",
            left: "50%",
            top: { base: "auto", md: "50%" },
            bottom: { base: "1%", md: "auto" },
            transform: {
              base: "translateX(-50%)",
              md: "translate(-50%, -50%)",
            },
            opacity: 1,
            transition: "opacity 0.4s ease-in-out",
            zIndex: 3,
          })}
        >
          <div
            onClick={isLoaded ? start : undefined}
            style={{
              cursor: isLoaded ? "pointer" : "default",
            }}
          >
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className={css({
                transition: "transform 0.4s ease-out",
              })}
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                opacity={0.2}
              />
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${center} ${center})`}
                style={{
                  transition: "stroke-dashoffset 0.1s ease-out",
                }}
              />
              <text
                x={center}
                y={center}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={color}
                style={{
                  fontFamily: "var(--ui-font-family)",
                  fontSize: isLoaded ? "14px" : "12px",
                  textTransform: isLoaded ? "uppercase" : "none",
                  letterSpacing: isLoaded ? "0.05em" : "normal",
                  opacity: active ? 0.7 : 1,
                  transition: "all 0.4s ease-out",
                  pointerEvents: "none",
                }}
              >
                {isLoaded ? "GO" : `${Math.round(progress)}%`}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
