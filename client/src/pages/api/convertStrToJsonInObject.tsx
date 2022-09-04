
// objectの　keysを　使って　jsonに 変換する
export default function convertStrToJson(obj: {[key: string]: string}, ...keys:string[]): object{
    let newObject = Object.assign({}, obj);
    for(let i = 0; i < keys.length; i++){
        newObject[keys[i]] = JSON.parse(newObject[keys[i]] as string);
    }
    return newObject;
}