import { useState } from 'react';

export const useHelpQuestions = () => {
    const [helpQuestions, setHelpQuestions] = useState([
        {
            question: "I don't understand anything, how do I start?",
            answer: "Some basic knowledge of league of legends is needed in order to play. In addition, please check out the guides and tutorial pages for more information to get you started."
        },
        {
            question: "What is the goal of the game, I'm so confused...?",
            answer: "The goal of BlitzDraft is analyze professional LoL games and guess picks and bans as they would appear in a live esports game. A total of 20 cards are shown (10 bans, 10 picks), in which you will use your drafting analyzation skills to determine the correct pick or ban. This will significantly help you understand what works with what in League of Legends team compositions. Please note, pro matches are not reflective of your solo queue games, but may help with clash, etc."
        },
        {
            question: "How far back do games date?",
            answer: "All games loaded are from the current season. Games are from all 4 majors regions (LPL, LCK, LCS, LEC) and minor regions (VCS, PCS, CBLOL, LLA) and range from regular season games to playoffs games. Worlds and MSI will be included accordingly."
        },
        {
            question: "I have X question or X issue, how can I contact you?",
            answer: "You can contact me for inquiries at draftsimlol@gmail.com. I will gladly help to resolve any issue or question that arises. Please note that I am a student and may not be able to respond immediately. I will try my best to respond as soon as possible."
        },
        {
            question: "Can't you just cheat?",
            answer: "Yes, but you learn absolutely nothing and gain absolutely nothing, so there is no point. It is almost impossible to control cheating here. The goal is to learn."
        },
        {
            question: "I lost my game, how do I go back?",
            answer: "Please note that games are deleted every time you start a new game. Games expire after 30 minutes. If you wish to go back to your current game, simply go back to the tab. If you want to retry a game, also just refresh"
        },
        {
            question: "Why isn't X tournament here?",
            answer: "Tournaments will be added as they start and have 10 games played (for population purposes)."
        },
        {
            question: "Why was this created?",
            answer: "I made this as a learning tool and student project for myself and others. I love LoL Esports and I wanted to make something that would help me and others learn more about the game. I hope you enjoy it as much as I do! :)"
        },
        {
            question: "Is this site affiliated with Riot Games?",
            answer: "No, BlitzDraft is a fan-made project. BlitzDraft isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc."
        }
    ]);
    
    return [helpQuestions, setHelpQuestions];
}