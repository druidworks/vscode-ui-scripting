import { IConfig } from '../models/config';

export function defaultAnswers(config: IConfig, answers: (string | undefined)[]) {
	return answers.map((answer: string | undefined) => {
		answer = typeof answer === 'string' ? answer.replace(/^\s*$/g, '') : answer;
		switch (answer) {
			case null:
			case undefined:
			case '':
				return config.defaultAnswerValue || '.';
			default:
				return answer;
		}
	});
}