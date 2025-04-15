
export interface LectureFile {
  id?: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  createdAt?: Date;
}

export interface LectureTranscription {
  text: string;
  segments?: {
    start: number;
    end: number;
    text: string;
  }[];
}

export interface CodeSnippet {
  code: string;
  explanation: string;
  language: string;
  lineStart?: number;
  lineEnd?: number;
}

export interface LectureSummary {
  summary: string;
  keyPoints: string[];
  codeSnippets?: CodeSnippet[];
  topics?: string[];
  questions?: string[];
}

export interface ProcessedLecture {
  id?: string;
  title?: string;
  file: LectureFile;
  transcription: LectureTranscription;
  summary: LectureSummary;
  createdAt?: Date;
  userId?: string;
}
