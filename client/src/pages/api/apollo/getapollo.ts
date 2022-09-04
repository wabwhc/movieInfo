/** 원하는 정보의 key, 데이터 가져오는 query문, 데이터를 저장하는 setState 함수 */
//　欲しい　情報の　key、　データを　持ってくる　query、　データを　保存する　setState
export default async function apollo(arg: any, argFn: (Farg: any) => any, setState: (Sarg: any) => void): Promise<void> {
    const data = await argFn(arg);
    setState(data);
}

