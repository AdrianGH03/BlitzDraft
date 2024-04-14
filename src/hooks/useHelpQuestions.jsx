import { useState } from 'react';

export const useHelpQuestions = () => {
    const [helpQuestions, setHelpQuestions] = useState([
        {
            question: "I don't understand anything, how do I start?",
            answer: "Some basic knowledge of league of legends is needed in order to play. In addition, please check out the guides and tutorial pages for more information to get you started."
        },
        {
            question: "What is the goal of the game, I'm so confused...?",
            answer: "The goal of DraftBlitz is analyze professional LoL games and guess picks and bans as they would appear in a live esports game. A total of 20 cards are shown (10 bans, 10 picks), in which you will use your drafting analyzation skills to determine the correct pick or ban. This will significantly help you understand what works with what in League of Legends. Please note, pro matches are not reflective of your solo queue games, but may help with clash, etc."
        },
        {
            question: "How far back do games date?",
            answer: "All games loaded are from the current season. Games are from all 4 majors regions (LPL, LCK, LCS, LEC) and range from regular season games to playoffs games."
        },
        {
            question: "Do I even need an account?",
            answer: "No, not really, signing up is optional for those who wish to store their points. It really means nothing. For now (possible leaderboard in the future)."
        },
        {
            question: "Can't you just cheat in this game?",
            answer: "Yes, but you learn absolutely nothing and gain absolutely nothing, so there is no point. It is almost impossible to control cheating here. The goal is to learn."
        },
        {
            question: "I encountered a bug, how do I report it?",
            answer: "For now, you can report bugs at draftsimlol@gmail.com, but a discord will be created in the future to make this easier."
        },
        {
            question: "I have X feedback or X suggestion, how can I share it?",
            answer: "For now, you can suggest things or leave feedback at draftsimlol@gmail.com, but a discord will be created in the future to make this easier."
        },
        {
            question: "I lost my game, how do I go back?",
            answer: "Games are saved every time a pick or ban is revealed. Games expire after 2 hours. If you wish to go back to your game, simply go back to the tab."
        }
    ]);
    
    return [helpQuestions, setHelpQuestions];
}