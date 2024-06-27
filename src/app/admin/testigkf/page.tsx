"use client";

import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Eltestio = () => {
  const fetchQuestions = async () => {
    try {
      const response = await axios.post(
        "https://oneklass2.oauife.edu.ng/api/wgtbam/fetchquestion",
        {
          fetchpair: {
            // qtype: "currentaffairs",
            // difficulty: "2",
          },
          adminpass: "admin0987",
        },
      );
      // setParticipants(response.data.queryset);
      // console.log("questions", response.data);
    } catch (error) {
      // console.log("error", error);
      toast.error("Failed to fetch questions");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return <div>page</div>;
};
export default Eltestio;

// {
//   headers: {
//     adminpass: "admin0987",
//   },
// },
