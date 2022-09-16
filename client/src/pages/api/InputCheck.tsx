import { RefObject } from "react";

export const InputCheck = (inputs: Array<RefObject<HTMLInputElement | HTMLTextAreaElement>> ): boolean => {
    for(let i = 0; i < inputs.length; i++){
        let value = inputs[i].current?.value.trim();
        if(value === ""){
            window.alert("값을 입력해주세요");
            inputs[i].current?.focus();
            return false;
        }
    }

    return true;
}