import { Guide } from './guide.model';

export interface Answer {
    _id?: string;
    guideId?: Guide;
    answerOne?: string;
    answerTwo?: string;
    answerThree?: string;

}