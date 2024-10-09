import { Button, message } from "antd";
import React, { useState } from "react";

const FormStep2 = ({
  form,
  next,
  prev,
  stepsLength,
  current,
  isStepperRendered,
  client,
  setClient,
}: {
  form: any;
  next: () => void;
  prev: () => void;
  stepsLength: number;
  current: number;
  isStepperRendered: boolean;
  client: any;
  setClient: any;
}) => {
  console.log();
  const [clientDataString, setClientDataString] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [remainingSeatsCount, setRemainingSeatsCount] = useState(0);
  const [reservedSeatsCount, setReservedSeatsCount] = useState(0);
  const [sections, setSections] = useState(form.sections);
  const [selectedSeat, setSelectedSeat] = useState<selectedSeat | null>(null);
  const [reservedSeats, setReservedSeats] = useState<any>({
    section1: [],
    section2: [],
    section3: [],
    section4: [],
  });

  // const handleSubmit = async () => {
  //     if (!selectedSeat) {
  //       toast.error("يجب عليك تحديد مقعد");
  //       return;
  //     }

  //     const { section, seatIndex } = selectedSeat;
  //     if (reservedSeats[section].includes(seatIndex)) {
  //       toast.error("هذا المقعد محجوز");
  //       return;
  //     }
  //     setIsLoading(true);
  //     try {
  //       const res = await axios.post(
  //         "https://managethenow.com/api/api/reservation",
  //         {
  //           ...clientData,
  //           chair_number: seatIndex,
  //           section_sets: section,
  //         }
  //       );

  //       if (res.status === 201 || res.status === 200) {
  //         setIsLoading(false);
  //         setRegistrationSuccess(true);
  //         PlayTickSound();
  //         window?.localStorage.removeItem("clientvaluedata");
  //         toast.success("تم التسجيل و حجز المقعد بنجاح");
  //       }
  //     } catch (err: any) {
  //       setIsLoading(false);

  //       let errorMsg = `${
  //         err.response.data.error ||
  //         "Something went wrong! Please try again later."
  //       } `;
  //       toast.error(errorMsg);
  //       PlayTickSound();
  //     }
  //   };

  const handleSubmit = async () => {
    if (!selectedSeat) return message.info("يجب عليك تحديد مقعد");
    console.log(client);
  };
  function handleClick(section: Section, index: number) {
    setSelectedSeat({ section, seatIndex: index });

    sections[section] = true;
  }

  const renderSeat = (
    sectionName: Section,
    value: boolean,
    seatIndex: number,
    is_booked: boolean
  ) => {
    // seatIndex = seatIndex + 1;
    const isReserved = is_booked;

    const className = `w-[27.90px]  h-[25.11px] border rounded-tl-[11.16px] rounded-tr-[11.16px]x
                          ${
                            isReserved || !value
                              ? "bg-[#1A2C50] cursor-not-allowed text-black"
                              : selectedSeat?.seatIndex === seatIndex &&
                                selectedSeat?.section === sectionName
                              ? "bg-[#118EEA] text-white"
                              : "bg-[#D1D1D1] cursor-pointer"
                          }`;

    return (
      <button
        key={`${sectionName}-${seatIndex}`}
        className={className}
        onClick={() =>
          !isReserved && value && handleClick(sectionName as Section, seatIndex)
        }
        disabled={isReserved}
      >
        {seatIndex}
      </button>
    );
  };

  return (
    <div className="flex gap-5 flex-col items-center justify-center p-4 lg:px-24 w-full">
      <p className=" text-center text-black text-[32px] font-extrabold">
        احجز مقعدك الان
      </p>
      <div className="flex lg:justify-between flex-wrap gap-4 justify-center items-center w-full">
        <div className="flex gap-4 flex-col md:flex-row w-full md:w-fit  ">
          <div className="w-full flex flex-col lg:flex-row gap-2 lg:h-[46px] p-2 rounded-lg border border-black justify-center items-center">
            <div className="lg:w-[150px] flex gap-2 text-black text-base font-bold">
              <span>مقعد متبقي</span>
              <span>{remainingSeatsCount}</span>
            </div>
            <div className="w-[27.90px] h-[25.11px] px-1 py-4 bg-[#D1D1D1] rounded-tl-2xl rounded-tr-2xl" />
          </div>
          {/* <div className="w-full flex gap-2 flex-col lg:flex-row lg:h-[46px] p-2 rounded-lg border border-black justify-center items-center ">
          <div className="text-black flex gap-2 text-base font-bold  ">
            <span>مقعد محجوز</span>
            <span>{reservedSeatsCount}</span>
          </div>
          <div className="w-[27.90px] h-[25.11px] px-1 py-4 bg-[#1A2C50] rounded-tl-2xl rounded-tr-2xl" />
        </div> */}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 ">
          <div className=" justify-start items-center gap-3 inline-flex">
            <p className="text-zinc-800 text-base font-bold ">محدد</p>
            <div className="w-6 h-6 bg-[#118EEA]" />
          </div>
          <div className=" items-center gap-3 flex">
            <p className=" text-zinc-800 text-base font-bold ">محجوز</p>
            <div className="w-6 h-6 bg-[#1A2C50]" />
          </div>
          <div className=" justify-start items-center gap-3 inline-flex">
            <p className=" text-zinc-800 text-base font-bold ">غير محجوز</p>
            <div className="w-6 h-6 bg-[#D2D2D2]" />
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row  flex-col justify-center lg:mt-20 gap-9">
        {/* {console.log(Object.keys(sections))} */}
        {sections.map((section: any) => {
          console.log(section);
          return (
            <div className="flex flex-col">
              <div className="flex flex-wrap justify-center gap-2">
                {section?.seats?.map((value: any, index: number) =>
                  renderSeat(
                    section as Section,
                    value,
                    value.seat,
                    value.is_booked
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex flex-row-reverse gap-2 flex-wrap">
        <Button
          type="primary"
          className="!bg-primary flex-1 !p-5 !font-bold"
          // htmlType="submit"
          onClick={handleSubmit}
        >
          تأكيد الحجز
        </Button>

        {current > 0 && (
          <Button
            className="flex-1 !p-5 !font-bold"
            onClick={() => prev && prev()}
          >
            السابق
          </Button>
        )}
      </div>

      {/* <Button
        disabled={isLoading}
        color={"primary"}
        variant="solid"
        onClick={handleSubmit}
        loading={isLoading}
        className={`text-white text-base font-bold p-4 bg-[#1A2C50] py-4 w-[333px] text-center my-5 rounded-3xl `}
      >
        تأكيد الحجزِ
      </Button> */}
    </div>
  );
};

export default FormStep2;

// "use client";
// import { useEffect, useState } from "react";
// import { redirect } from "next/navigation";
// import { toast } from "react-toastify";
// import { PlayTickSound } from "@/utils/playsSound";
// import Success from "@/components/Success";
// import axios from "axios";
// import { Button } from "@nextui-org/react";
// import { sections, totalSeats } from "./constants";

// const page = () => {

//     {
//       section1: [],
//       section2: [],
//       section3: [],
//       section4: [],
//     }
//   );

// //   useEffect(() => {
// //     axios.get("https://managethenow.com/api/api/checkChair").then(
// //       ({ data: { sections, reservedCount } }) => {
// //         setReservedSeats(sections);
// //         // console.log(reservedCount);

// //         console.log(reservedCount);
// //         console.log(sections);

// //         setReservedSeatsCount(reservedCount);
// //         setRemainingSeatsCount(totalSeats - reservedCount);
// //       },
// //       (err) => {
// //         console.error(err);
// //       }
// //     );
// //   }, [setReservedSeats]);

// //   useEffect(() => {
// //     if (typeof window?.localStorage != "undefined") {
// //       let clientDataString = window?.localStorage.getItem("client_data");
// //       setClientDataString(clientDataString);

// //       if (clientDataString) {
// //         setClientData(JSON.parse(clientDataString));
// //       } else {
// //         redirect("/");
// //       }
// //     }
// //   }, []);

//   if (registrationSuccess) return <Success name={clientData?.client_name!} />;

//   return (

//   );
// };

// // export default page;
