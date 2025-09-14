export type TournamentsItem = {
  title: string;
  description: string;
  prize: string;
  status: "LIVE" | "STARTING" | "UPCOMING" | "FEATURED";
  image: string;
  participants: string;
  avatarColors: string[];
  jointournament: string;
  buttonColor: string;
};
import live from "../assets/live.jpg";
import lol from "../assets/league.jpg";
import fortnite from "../assets/fortnite.jpg";
import war from "../assets/war.jpg";

export const featuredTournaments: TournamentsItem[] = [
  {
    title: "Go Live Tournament",
    description:
      "Compete with your friends in this winner-take-all tournament.",
    prize: "1,500",
    status: "LIVE",
    buttonColor: "#FF6B35",
    image: live,
    participants: "127,2k",
    avatarColors: ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4"],
    jointournament: "Go Live",
  },
  {
    title: "League Of Legends Tournaments",
    description: "One more recent to running again and well get started...",
    prize: "2,800",
    status: "STARTING",
    buttonColor: "#4ECDC4",
    image: lol,
    participants: "89,1k",
    avatarColors: ["4ECDC4", "FFD93D", "FF6B6B", "45B7D1"],
    jointournament: "Join Now",
  },
  {
    title: "Fortnite Epic Challenge",
    description:
      "The epic edition of events gives you the ultimate gaming experience.",
    prize: "5,200",
    status: "UPCOMING",
    buttonColor: "#8B5CF6",
    image: fortnite,
    participants: "156,8k",
    avatarColors: ["8B5CF6", "FF6B6B", "4ECDC4", "FFD93D"],
    jointournament: "Join Now",
  },
  {
    title: "Guns N Glory Championship",
    description:
      "Manage your crew all in guns blazers-kingdom with this epic tournament.",
    prize: "7,800",
    status: "FEATURED",
    buttonColor: "#FFD93D",
    image: war,
    participants: "234,5k",
    avatarColors: ["FFD93D", "8B5CF6", "FF6B6B", "4ECDC4"],
    jointournament: "Soon",
  },
];
