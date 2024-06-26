"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
  name: string;
  // department: string;
  // reg_type: string;
  phone: string;
}

const UsersAnalytics = () => {
  const [participants, setParticipants] = useState<User[]>([]);
  const [attendees, setAttendees] = useState<User[]>([]);

  const fetchParticipants = async () => {
    try {
      const response = await axios.post(
        "https://oneklass2.oauife.edu.ng/api/wgtbam/fetchuser",
        {
          fetchpair: {
            reg_type: "participant",
          },
          // fetchset: ["name", "department", "reg_type"],
          fetchset: ["name", "phone"],
        },
      );
      console.log("reddrer", response);

      setParticipants(response.data.queryset);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch participants");
    }
  };

  const fetchAttendees = async () => {
    try {
      const response = await axios.post(
        "https://oneklass2.oauife.edu.ng/api/wgtbam/fetchuser",

        {
          fetchpair: {
            reg_type: "attendee",
          },
          fetchset: ["name", "department", "reg_type"],
        },
      );
      setAttendees(response.data.queryset);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch attendees");
    }
  };

  useEffect(() => {
    fetchParticipants();
    fetchAttendees();
    // fetchQuestions();
  }, []);

  return (
    <div className="space-y-4 p-8 text-base capitalize">
      <h1 className="underline underline-offset-2">Analytics</h1>
      <p>
        participants: <b>{participants.length}</b>
      </p>
      <p>
        attendees: <b>{attendees.length}</b>
      </p>
      <p>
        Total: <b>{participants.length + attendees.length}</b>
      </p>

      {/* {participants.length > 1 && <CSVDownloadButton persons={participants} />} */}
    </div>
  );
};
export default UsersAnalytics;

// interface Person {
//   name: string;
//   phone: string;
// }

// const convertToCSV = (data: Person[]) => {
//   const header = ["Name", "Phone Number"];
//   // const rows = data.map((person) => [person.name, person.phone]);
//   const rows = data.map((person) => [person.name, `'${person.phone}`]);

//   const csvContent = [
//     header.join(","),
//     ...rows.map((row) => row.join(",")),
//   ].join("\n");

//   return csvContent;
// };

// const downloadCSV = (csvContent: string, fileName: string) => {
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const link = document.createElement("a");
//   const url = URL.createObjectURL(blob);

//   link.setAttribute("href", url);
//   link.setAttribute("download", fileName);
//   link.style.visibility = "hidden";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const CSVDownloadButton: React.FC<{ persons: any }> = ({ persons }) => {
//   const handleDownload = () => {
//     const csvContent = convertToCSV(persons);
//     downloadCSV(csvContent, "participants.csv");
//   };

//   return <button onClick={handleDownload}>Download CSV</button>;
// };
