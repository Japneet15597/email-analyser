import React, { useState } from "react";
import ScoreBar from "../components/ScoreBar";
import Navbar from "../components/Navbar";
import { SpinDiv } from "../components/SpinDiv";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const liVariants = {
  entry: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const ulVariants = {
  entry: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

function Index() {
  const [email, setEmail] = useState<string>("");

  const [wordCount, setWordCount] = useState<number>(0);

  const [confidenceScore, setConfidenceScore] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<
    { improvementType: string; improvementText: string }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);

  const countWords = () => {
    if (!email) {
      return 0;
    } else {
      return email.trim().split(/\s+/).length;
    }
  };

  const checkConfidence = () => {
    fetch("/api/checkConfidence", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWordCount(countWords());

        if (data.code) {
          setLoading(false);
          toast.error("Check Confidence API failed, Please try again");
        } else {
          setConfidenceScore(data.confidenceScore);
          setLoading(false);
        }
      });
  };

  const suggestImprovements = () => {
    fetch("/api/suggestImprovements", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setSuggestionsLoading(false);
          toast.error("Suggest Improvements API failed, Please try again");
        } else {
          setSuggestions(data);
          setSuggestionsLoading(false);
        }
      });
  };

  const handleAnalyzeClicked = () => {
    if (!email) {
      toast.error("Please enter text to analyze.");
      return;
    }

    if (loading || suggestionsLoading) {
      return;
    }

    setLoading(true);
    setSuggestionsLoading(true);

    checkConfidence();

    suggestImprovements();
  };

  return (
    <div className="flex justify-center items-center relative h-screen bg-gray-100">
      <Navbar />

      <div className="rounded-lg shadow-lg py-4 px-6 bg-white w-[90%] mt-12">
        <h1 className="text-gray-800 font-bold text-xl mb-4">
          Type your email below and click analyze
        </h1>

        <div className="grid grid-cols-4 gap-4 h-[45rem] overflow-none">
          <div className="relative col-span-4 lg:col-span-3">
            <textarea
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              rows={24}
              className="rounded-lg border border-gray-700 bg-gray-50 p-4 resize-none overflow-auto w-full h-full"
            ></textarea>
            <button
              onClick={handleAnalyzeClicked}
              disabled={loading}
              className="absolute bottom-4 right-5 flex items-center ease-in-out duration-200 rounded-md px-12 py-2 max-w-min mt-4 ml-auto shadow-md font-medium bg-white hover:bg-gray-900 hover:text-white disabled:bg-white disabled:text-gray-900"
            >
              {loading && <SpinDiv />}
              Analyze
            </button>
          </div>

          <div className="col-span-4 lg:col-span-1 w-full ">
            <div className="bg-gray-50 border border-gray-700 p-4 rounded-lg space-y-4 overflow-auto">
              <ScoreBar
                maxScorePossible={500}
                score={wordCount}
                title={"Word Length"}
              />
              <ScoreBar
                maxScorePossible={100}
                score={confidenceScore}
                title={"Confidence Score"}
                decorator={"%"}
              />

              <div className="inline-flex items-center ">
                <span className="mr-1 font-medium">
                  Improvement Suggestions:
                </span>
                {suggestionsLoading && <SpinDiv />}
              </div>

              <motion.div
                initial={"entry"}
                animate={suggestionsLoading ? "exit" : "entry"}
                className="h-[32rem] overflow-auto pr-2"
              >
                <motion.ul variants={ulVariants} className="space-y-4">
                  {suggestions.map((item) => {
                    return (
                      <motion.li variants={liVariants}>
                        <div className="relative flex flex-row rounded-xl border border-gray-200 bg-white p-4 shadow-sm overflow-hidden">
                          <div className="absolute left-0 top-0 h-full bg-blue-400/75 p-[0.25rem]"></div>

                          <div className="flex-col">
                            <p className="text-sm ">{item.improvementText}</p>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ImprovementCardsSkeleton = () => {
  return (
    <>
      <div className="relative flex flex-row rounded-xl border border-gray-200 bg-white p-4 shadow-sm overflow-hidden">
        <div className="absolute left-0 top-0 h-full bg-blue-400/75 p-[0.25rem]"></div>

        <div className="flex-col w-full animate-pulse space-y-2">
          <div className="w-full h-2 rounded bg-slate-100 p-2"></div>

          <div className="w-full h-2 rounded bg-slate-100 p-2"></div>
        </div>
      </div>

      <div className="relative flex flex-row rounded-xl border border-gray-200 bg-white p-4 shadow-sm overflow-hidden">
        <div className="absolute left-0 top-0 h-full bg-blue-400/75 p-[0.25rem]"></div>

        <div className="flex-col w-full animate-pulse space-y-2">
          <div className="w-full h-2 rounded bg-slate-100 p-2"></div>

          <div className="w-full h-2 rounded bg-slate-100 p-2"></div>
        </div>
      </div>

      <div className="relative flex flex-row rounded-xl border border-gray-200 bg-white p-4 shadow-sm overflow-hidden">
        <div className="absolute left-0 top-0 h-full bg-blue-400/75 p-[0.25rem]"></div>

        <div className="flex-col w-full animate-pulse space-y-2">
          <div className="w-full h-2 rounded bg-slate-100 p-2"></div>

          <div className="w-full h-2 rounded bg-slate-100 p-2"></div>
        </div>
      </div>
    </>
  );
};

export default Index;
