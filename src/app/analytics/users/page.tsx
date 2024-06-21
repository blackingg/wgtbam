"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
  name: string;
  department: string;
  reg_type: string;
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
          fetchset: ["name", "department", "reg_type"],
        },
      );
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
    </div>
  );
};
export default UsersAnalytics;
