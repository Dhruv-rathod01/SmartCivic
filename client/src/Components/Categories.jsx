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
} from "react-icons/fa";

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
    title: "Parks & Trees",
    description: "Fallen trees, park maintenance.",
    icon: FaTree,
    path: "/report/parks",
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
];
export default categories;