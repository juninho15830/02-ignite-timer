import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { Countdown } from "./components/Countdown";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NewCycleForm } from "./components/NewCycleForm";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";



const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCicleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCicleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, /*reset*/ } = newCycleForm

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)} action="">
                
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                

                { activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24}/>
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}