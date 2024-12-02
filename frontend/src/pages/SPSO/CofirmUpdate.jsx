export const ConfirmUpdate = ({noti, closeConfirm}) => {
    return <div className="fixed bg-black/50 left-0 top-0 z-1 w-full h-full flex items-center justify-center">
        <div className="p-5 bg-blue-4 text-white rounded-xl flex flex-col gap-y-5 items-center w-max-[300px]">
            <p>{noti}</p>
            <div className="flex flex-row-reverse w-full">
                <button className="py-2 px-5 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {closeConfirm()}}>
                    OK
                </button>
            </div>
        </div>
    </div>
}