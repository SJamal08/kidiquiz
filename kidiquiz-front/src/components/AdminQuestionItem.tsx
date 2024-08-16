import React, { useState } from 'react'
import { Question, QuestionPayload } from '../logic/model/question';
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useAppDispatch } from '../logic/redux/reduxHooks';
import { questionAsyncActions } from '../logic/redux/reducers/QuestionReducer';
import { SubmitHandler, useForm } from 'react-hook-form';

function AdminQuestionItem({question, withButtons}: {question: Question, withButtons?: boolean }) {


    const dispatch = useAppDispatch();


    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const { register, handleSubmit, reset } = useForm<QuestionPayload>({
        defaultValues: {
            wording: question.wording,
            options: question.options,
            answer: question.answer,
        }
    });

    const onEditSubmit: SubmitHandler<QuestionPayload> = data => {
        console.log("Form Data:", data);
        const questionPayload = data;
        const id = question.id;
        dispatch(questionAsyncActions.updateQuestion({id, questionPayload}));
        dispatch(questionAsyncActions.getAllQuestions());
        setOpenEditModal(false);
    };


    const onDelete = (id: number) => {
        dispatch(questionAsyncActions.deleteQuestion(id));
        dispatch(questionAsyncActions.getAllQuestions());
        setOpenDeleteModal(false);
    }

    return (
        <div className="border border-blue-400 shadow-md p-4 rounded-lg w-80">
          <div className="font-bold text-lg mb-2">{question.wording}</div>
        
          <ul className="list-disc list-inside mb-2">
            {question.options.map((option, index) => (
              <li key={index} className="text-gray-700">{option}</li>
            ))}
          </ul>
        
          <div className="font-semibold text-gray-800 mb-2">Réponse: {question.answer}</div>
          
          {withButtons && (
            <div className="flex space-x-4">
              <button onClick={() => setOpenEditModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Modifier</button>
              <button onClick={() => setOpenDeleteModal(true)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Supprimer</button>
            </div>
          )}


        {/*  DELETE MODAL */}
        <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)}>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Êtes-vous sur de vouloir supprimer cette question ?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => onDelete(question.id) }>
                        {"Oui"}
                    </Button>
                    <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                        Non
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>

                        {/* Modal de modification */}
                        <Modal show={openEditModal} size="md" onClose={() => setOpenEditModal(false)}>
                <Modal.Header>Modifier la question</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onEditSubmit)}>
                        <div className="mb-4">
                            <Label htmlFor="wording" value="Libellé de la question" />
                            <TextInput 
                                id="wording" 
                                {...register("wording", { required: true })} 
                                placeholder="Libellé de la question"
                                defaultValue={question.wording}
                                className="mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="options" value="Options" />
                            {question.options.map((option, index) => (
                                <TextInput 
                                    key={index} 
                                    id={`option-${index}`} 
                                    {...register(`options.${index}`, { required: true })} 
                                    placeholder={`Option ${index + 1}`} 
                                    defaultValue={option}
                                    className="mt-1"
                                />
                            ))}
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="answer" value="Réponse" />
                            <TextInput 
                                id="answer" 
                                {...register("answer", { required: true })} 
                                placeholder="Réponse correcte"
                                defaultValue={question.answer}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button type="submit" className='bg-blue-600'>
                                Sauvegarder
                            </Button>
                            <Button onClick={() => setOpenEditModal(false)} color="gray" className="mr-2">
                                Annuler
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
      );
}

export default AdminQuestionItem