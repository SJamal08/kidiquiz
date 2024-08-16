import { Quiz, QuizPayload } from "../../model/Quiz";
import { IQuizRepo } from "./IQuizRepo";

export class InMemoryQuizRepo implements IQuizRepo {

    public quizList: Quiz[]

    constructor() {
        this.quizList = [
            {
                id: 0,
                name: "super Quiz",
                questions: [
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
                  ]
            }
        ]


    }
    async create(quizPayload: QuizPayload): Promise<Quiz> {
        console.log("in controller create quiz");
        let array = [...this.quizList];
        const id = array.length + 1;
        const newQuiz: Quiz = {id, ...quizPayload};
        console.log("create quiz try push in list");
        try {
            array.push(newQuiz);
            this.quizList = array;
            console.log("New quiz added to the list", array);
        } catch (error) {
            console.error("Error pushing new quiz to list:", error);
        }
    
        return Promise.resolve(newQuiz);
    }
    async getAll(): Promise<Quiz[]> {
        return Promise.resolve(this.quizList);
    }
    getById(id: number): Promise<Quiz | undefined> {
        throw new Error("Method not implemented.");
    }
    update(id: number, quizPayload: QuizPayload): Promise<Quiz | undefined> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}