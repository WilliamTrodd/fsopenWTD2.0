import diaryData from '../../data/diaries.json';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<DiaryEntry> => diaries;

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => diaries.map(({
  id, date, weather, visibility,
}) => ({
  id, date, weather, visibility,
}));

const addDiary = () => null;

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
};
