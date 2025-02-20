export const Notification = ({noti, closeNoti}) => {
    return <div className="fixed bg-black/50 left-0 top-0 z-1 w-full h-full flex items-center justify-center">
        <div className="p-5 bg-blue-3 text-white rounded-xl flex flex-col gap-y-5 items-center max-w-[80%]">
            <p>{noti}</p>
            <div className="flex flex-row-reverse w-full">
                <button className="py-2 px-5 bg-blue-4 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {closeNoti()}}>
                    OK
                </button>
            </div>
        </div>
    </div>
}