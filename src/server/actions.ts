"use server"

import { finalUserData } from "@/types";
import axios from "axios";

export async function registerUser(data: finalUserData) {
    const response = await axios.post(
      "https://oneklass2.oauife.edu.ng/api/wgtbam/createuser",
      data,
    );

    return response.data;
  }