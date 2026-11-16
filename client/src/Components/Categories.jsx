import {
  FaExclamationTriangle,
  FaTrash,
  FaTint,
  FaWater,
  FaRoad,
  FaLightbulb,
  FaTree,
  FaBuilding,
  FaDog,
  FaToilet,
   FaBolt,
  FaVolumeUp,
  FaEllipsisH,
} from "react-icons/fa";
import { FaMosquito } from "react-icons/fa6";

export const categories = [
  {
    title: "Emergency Report",
    description: "For critical, urgent issues.",
    icon: FaExclamationTriangle,
    path: "/report/emergency",
    emergency: true,
  },
  {
    title: "Garbage",
    description: "Overflowing bins, illegal dumping.",
    icon: FaTrash,
    path: "/report/garbage",
  },
  {
    title: "Water Supply & Quality",
    description: "Contamination, low pressure.",
    icon: FaTint,
    path: "/report/water",
  },
  {
    title: "Drainage Issues",
    description: "Blocked drains, overflowing sewers.",
    icon: FaWater,
    path: "/report/drainage",
  },
  {
    title: "Roads & Footpaths",
    description: "Potholes, broken sidewalks.",
    icon: FaRoad,
    path: "/report/roads",
  },
  {
    title: "Streetlights",
    description: "Outages, flickering lights.",
    icon: FaLightbulb,
    path: "/report/streetlights",
  },
    {
    title: "Mosquito Control",
    description: "Mosquito breeding, stagnant water, and insect infestations.",
    icon: FaMosquito,
    path: "/report/mosquito",
  },
  {
    title: "Parks & Trees",
    description: "Fallen trees, park maintenance.",
    icon: FaTree,
    path: "/report/parks",
  },
    {
    title: "Electricity Issues",
    description: "Exposed wires, damaged poles, and power-related hazards.",
    icon: FaBolt,
    path: "/report/electricity",
  },
  {
    title: "Noise Pollution",
    description: "Excessive noise from construction, loudspeakers, and traffic.",
    icon: FaVolumeUp,
    path: "/report/noise",
  },
  {
    title: "Illegal Constructions",
    description: "Unauthorized buildings.",
    icon: FaBuilding,
    path: "/report/construction",
  },
  {
    title: "Stray Animals",
    description: "Stray dogs, animal control.",
    icon: FaDog,
    path: "/report/animals",
  },
  {
    title: "Sanitation",
    description: "Public toilet cleanliness.",
    icon: FaToilet,
    path: "/report/sanitation",
  },
  {
  title: "Other Issues",
  description: "Report civic problems not covered by the listed categories.",
  icon: FaEllipsisH,
  path: "/report/other",
},
];
export default categories;