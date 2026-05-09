"use client";

import { useEffect } from "react";

export default function ApiHouse() {

  const getHouses = async () => {
    try {
      const res = await fetch(
        "https://next.genzuni.website/api/houses?limit=10&order=DESC&sort=last_updated",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("dataaaaaaaa", data);

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <button onClick={getHouses}>wwwwwwww</button>
      <div></div>
    </>
  );
}
