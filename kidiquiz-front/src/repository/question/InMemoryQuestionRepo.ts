import { Question, QuestionPayload } from "../../logic/model/question";
import { IQuestionRepo } from "./IquestionRepo";

export class InMemoryQuestionRepo implements IQuestionRepo {

    public questions: Question[];
    
    constructor() {
        this.questions =  [
            {
              id: 1,
              wording: "Quelle couleur a le ciel par une journée ensoleillée?",
              options: ["Bleu", "Rouge", "Vert", "Jaune"],
              answer: "Bleu"
            },
            {
              id: 2,
              wording: "Combien de pattes a un chien?",
              options: ["Deux", "Quatre", "Six", "Huit"],
              answer: "Quatre"
            },
            {
              id: 3,
              wording: "Quel est le plus petit nombre?",
              options: ["3", "7", "1", "5"],
              answer: "1"
            },
            {
              id: 4,
              wording: "Que mange un lapin?",
              options: ["Carotte", "Pizza", "Bonbon", "Hamburger"],
              answer: "Carotte"
            },
            {
              id: 5,
              wording: "Quel est l'animal qui rugit?",
              options: ["Chat", "Lion", "Vache", "Chien"],
              answer: "Lion"
            },
            {
              id: 6,
              wording: "Combien y a-t-il de jours dans une semaine?",
              options: ["5", "7", "10", "14"],
              answer: "7"
            },
            {
              id: 7,
              wording: "Quelle est la forme d'un ballon de football?",
              options: ["Carré", "Triangle", "Cercle", "Rectangle"],
              answer: "Cercle"
            },
            {
              id: 8,
              wording: "Quel fruit est jaune et courbé?",
              options: ["Pomme", "Banane", "Raisin", "Orange"],
              answer: "Banane"
            },
            {
              id: 9,
              wording: "Combien de côtés a un triangle?",
              options: ["2", "3", "4", "5"],
              answer: "3"
            },
            {
              id: 10,
              wording: "Quel animal vole?",
              options: ["Poisson", "Chien", "Oiseau", "Éléphant"],
              answer: "Oiseau"
            }
          ];
    }
    
    async create(questionPayload: QuestionPayload): Promise<Question> {
        const id = this.questions.length + 1;
        const newQuestion: Question = {id, ...questionPayload};
        this.questions.push(newQuestion);
        return Promise.resolve(newQuestion);
    }
    async getAll(): Promise<Question[]> {
        return Promise.resolve(this.questions);
    }
    async getById(id: number): Promise<Question | undefined> {
        const questionToFind: Question | undefined = this.questions.find(q => q.id === id);
        return Promise.resolve(questionToFind);
    }
    async update(id: number, question: QuestionPayload): Promise<Question | undefined> {
        const questionUpdated = this.questions.find(q => q.id === id);
        if (questionUpdated) {
        questionUpdated.answer = question.answer;
        questionUpdated.options = question.options;
        questionUpdated.wording = question.wording;
        }
        return Promise.resolve(questionUpdated);
    }
    async delete(id: number): Promise<boolean> {
        const index = this.questions.findIndex(q => q.id === id);
        if (index !== -1) {
          this.questions.splice(index, 1);
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

}