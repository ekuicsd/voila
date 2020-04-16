import { Guide } from './guide.model';

export interface Answer {
    id?: string;
    guideId?: Guide;
    answerOne?: string;
    answerTwo?: string;
    answerThree?: string;

}