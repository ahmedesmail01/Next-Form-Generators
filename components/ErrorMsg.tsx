import React from "react";
import { GoAlert } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";

const ErrorMsg = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <p className="text-red-500 flex pl-[5px] items-center gap-[4px] text-sm mt-1 text-right">
      <IoIosInformationCircleOutline className="mt-[-2px]" />
      {message}
    </p>
  );
};

export default ErrorMsg;
