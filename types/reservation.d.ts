type selectedSeat = {
  section: Section;
  seatIndex: number;
};
type Sections = {
  [key in Section]: boolean[];
};
