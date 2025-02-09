export interface Question {
	question_cid: string;
	question_text: string;
}

export interface RecordingScore {
	pacing: number;
	clarity: number;
	delivery: number;
	engagement: number;
	comments: string;
}

export interface QuestionScore {
	depth: number;
	clarity: number;
	comments: string;
	relevance: number;
}

export interface Word {
	end: number;
	word: string;
	start: number;
	confidence: number;
}

export interface Answer {
	url: string;
	words: Word[];
}

export interface Recording {
	id: string;
	created_at: string;
	transcript: string;
	audio_cid: string;
	questions: Question[];
	recording_score: RecordingScore;
	question_score: QuestionScore;
	answers: Answer | null;
	words: Word[];
	presentation_id: string;
}
