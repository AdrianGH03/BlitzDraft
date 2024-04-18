import { useState } from 'react';

export const useYoutubeVideos = () => {
  const [youtubeVideos, setYoutubeVideos] = useState([
    {
        "TITLE": "League of Legends - The Art of Drafting (Competitive Guide)",
        "Link": "https://www.youtube.com/embed/chy1-iWqoUQ?si=o9kSdRwbDAvDzdsW",
        "Channel": "Quachdaddy",
        "LinkTo": "https://www.youtube.com/watch?v=chy1-iWqoUQ",
        "LinkToChannel": "https://www.youtube.com/@quachdaddy",
        "DatePosted": "Aug 20, 2021"
    },
    {
        "TITLE": "Complete Drafting Guide - Competitive League of Legends",
        "Link": "https://www.youtube.com/embed/ohjVSB-WPjU?si=yFRMxIq-_tvO8jPZ",
        "Channel": "TheBritishPoro",
        "LinkTo": "https://www.youtube.com/watch?v=ohjVSB-WPjU",
        "LinkToChannel": "https://www.youtube.com/@thebritishporo",
        "DatePosted": "Oct 27, 2022"
    },
    {
        "TITLE": "DRAFTING FUNDAMENTALS - Everything On Drafting For All Levels Of Play - Using Examples",
        "Link": "https://www.youtube.com/embed/l0cEU0W8DD8?si=qit2Tr6vfoiLtSOC",
        "Channel": "Coach Curtis",
        "LinkTo": "https://www.youtube.com/watch?v=l0cEU0W8DD8",
        "LinkToChannel": "https://www.youtube.com/@CoachCurtis",
        "DatePosted": "Apr 24, 2020"
    },
    {
        "TITLE": "LoL Pick and Ban Explained - Drafting Guide",
        "Link": "https://www.youtube.com/embed/rkh91cVb82o?si=ks3uUiGcJh7ErJEj",
        "Channel": "Trajan TC",
        "LinkTo": "https://www.youtube.com/watch?v=rkh91cVb82o",
        "LinkToChannel": "https://www.youtube.com/@trajantc",
        "DatePosted": "Aug 30, 2019"
    },
    {
        "Link": "https://www.youtube.com/embed/ib2BFb4tR_I?si=UCwaD2oqxFB9yRfB",
        "LinkTo": "https://www.youtube.com/watch?v=ib2BFb4tR_I",
        "Channel": "Randomonium",
        "TITLE": "League Drafting 101 | Beginner's Guide to Professional League of Legends Pick/Ban Phase",
        "LinkToChannel": "https://www.youtube.com/@randomonium",
    }, 
    {
        "Link": "https://www.youtube.com/embed/i4tPKWt5pBY?si=-gDpzEWuOr9r0MyC",
    }, 
    {
        "Link": "https://www.youtube.com/embed/UD17oTuE4rA?si=Wq1AMAPBxrVH3EXn"
    }, 
    {
        "TITLE": "Caedrel's In-Depth Explanation On How Teams Draft In Pro Play (Worlds 2023)",
        "Link": "https://www.youtube.com/embed/RDi3NC6mhrw?si=OcEmgI4z5gskdYNC",
        "Channel": "Caedrel Clips",
        "LinkTo": "https://www.youtube.com/watch?v=RDi3NC6mhrw&t=28s",
        "LinkToChannel": "https://www.youtube.com/@caedrelclips",
        "DatePosted": "Nov 11, 2023"
    },
    {
        "TITLE": "LS | HOW I ANALYZE DRAFTS | FULL DRAFT ANALYSIS | C9 vs EG",
        "Link": "https://www.youtube.com/embed/asA77GBD7NY?si=cM62B-IC5AOY_UU4",
        "Channel": "LS",
        "LinkTo": "https://www.youtube.com/watch?v=asA77GBD7NY&t=722s",
        "LinkToChannel": "https://www.youtube.com/@LSXYZ9",
        "DatePosted": "Aug 15, 2022"
    }
  ]);

  return [youtubeVideos, setYoutubeVideos];
};