import { useEffect, useState } from "react";

const useFormattedDateTime = (timestamp) => {
  const [formattedDateTime, setFormattedDateTime] = useState("");

  useEffect(() => {
    const date = new Date(timestamp);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "UTC", 
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    setFormattedDateTime(formattedDate);
  }, [timestamp]);

  return formattedDateTime;
};

export default useFormattedDateTime;
