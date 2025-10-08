declare module 'hijri-date/lib/safe' {
  class HijriDate {
    constructor(date?: Date);
    getFullYear(): number;
    getMonth(): number;
    getDate(): number;
    toString(): string;
  }
  export default HijriDate;
}
