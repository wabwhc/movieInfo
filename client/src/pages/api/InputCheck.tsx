import { RefObject } from "react";
//inputや　textareaの　値を　確認して　入力しなかった　ことが　あると　focusする
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