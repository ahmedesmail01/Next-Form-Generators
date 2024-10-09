type Section = "section1" | "section2" | "section3" | "section4";
type selectedSeat = {
  section: Section;
  seatIndex: number;
};
type Sections = {
  [key in Section]: boolean[];
};
