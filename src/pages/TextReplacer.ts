import { getMessage, StorableKeys } from "../MessageStore";
import { ENGLISH_SIGNATURE, LANGUAGE_KEY } from "./landing/SelectLanguage";

export { getMessage };

export const FACULTIES: {
  [code: string]: {
    en: string;
    th: string;
  };
} = {
  "20": { en: "Graduate School", th: "บัณฑิตวิทยาลัย" },
  "21": { en: "Faculty of Engineering", th: "คณะวิศวกรรมศาสตร์" },
  "22": { en: "Faculty of Arts", th: "คณะอักษรศาสตร์" },
  "23": { en: "Faculty of Science", th: "คณะวิทยาศาสตร์" },
  "24": {
    en: "Faculty of Political Science",
    th: "คณะรัฐศาสตร์",
  },
  "25": {
    en: "Faculty of Architecture",
    th: "คณะสถาปัตยกรรมศาสตร์",
  },
  "26": {
    en: "Faculty of Commerce And Accountancy",
    th: "คณะพาณิชยศาสตร์และการบัญชี",
  },
  "27": { en: "Faculty of Education", th: "คณะครุศาสตร์" },
  "28": {
    en: "Faculty of Communication Arts",
    th: "คณะนิเทศศาสตร์",
  },
  "29": { en: "Faculty of Economics", th: "คณะเศรษฐศาสตร์" },
  "30": { en: "Faculty of Medicine", th: "คณะแพทยศาสตร์" },
  "31": {
    en: "Faculty of Veterinary Science",
    th: "คณะสัตวแพทยศาสตร์",
  },
  "32": { en: "Faculty of Dentistry", th: "คณะทันตแพทยศาสตร์" },
  "33": {
    en: "Faculty of Pharmaceutical Sciences",
    th: "คณะเภสัชศาสตร์",
  },
  "34": { en: "Faculty of Law", th: "คณะนิติศาสตร์" },
  "35": {
    en: "Faculty of Fine And Applied Arts",
    th: "คณะศิลปกรรมศาสตร์",
  },
  "36": { en: "Faculty of Nursing", th: "คณะพยาบาลศาสตร์" },
  "37": {
    en: "Faculty of Allied Health Sciences",
    th: "คณะสหเวชศาสตร์",
  },
  "38": { en: "Faculty of Psychology", th: "คณะจิตวิทยา" },
  "39": {
    en: "Faculty of Sports Science",
    th: "คณะวิทยาศาสตร์การกีฬา",
  },
  "40": {
    en: "School of Agricultural Resources",
    th: "สำนักวิชาทรัพยากรการเกษตร",
  },
  "51": {
    en: "College of Population Studies",
    th: "วิทยาลัยประชากรศาสตร์",
  },
  "53": {
    en: "College of Public Health Sciences",
    th: "วิทยาลัยวิทยาศาสตร์สาธารณสุข",
  },
  "55": { en: "Language Institute", th: "สถาบันภาษา" },
  "56": {
    en: "School of Integrated Innovation",
    th: "สถาบันนวัตกรรมบูรณาการ",
  },
  "58": {
    en: "Sasin Graduate Institute of Business Administion",
    th: "สถาบันบัณฑิตบริหารธุรกิจ ศศินทร์ฯ",
  },
  "99": { en: "Other University", th: "มหาวิทยาลัยอื่น" },
  "01": {
    en: "The Sirindhorn Thai Language Institute",
    th: "สถาบันภาษาไทยสิรินธร",
  },
  "02": {
    en: "office of Academic Affairs",
    th: "ศูนย์การศึกษาทั่วไป",
  },
};

// These show that texts with these two will be replaced
const NAME_SIGNATURE = "(name)";
const FACULTY_SIGNATURE = "(faculty)";

export const getFacultyCode = (studentId: string) => studentId.slice(8, 10);

export const isEnglish = () => localStorage.getItem(LANGUAGE_KEY) === ENGLISH_SIGNATURE;

const getFacultyText = (studentId: string) => {
  const faculty = FACULTIES[getFacultyCode(studentId)];
  return isEnglish() ? faculty.en : faculty.th;
};

const replaceLine = (line: string) =>
  line
    .replaceAll(NAME_SIGNATURE, getMessage(StorableKeys.Nickname) as string)
    .replaceAll(FACULTY_SIGNATURE, getFacultyText(getMessage(StorableKeys.ID) as string));

// The parameter of this must be t("sceneXX")
export const replaceNameAndFaculty = (translatedTexts: string): string | string[] => {
  const texts = translatedTexts as unknown;
  if (typeof texts === "string") {
    return replaceLine(texts);
  }
  return (texts as string[]).map(line => replaceLine(line));
};
