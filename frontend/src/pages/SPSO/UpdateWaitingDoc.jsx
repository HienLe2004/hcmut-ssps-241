export const UpdateWaitingDoc = ({closeUpdate, openConfirm}) => {
    return <div className="fixed bg-black/50 left-0 top-0 z-1 w-full h-full flex items-center justify-center">
        <div className="p-5 bg-blue-4 text-white rounded-xl flex flex-col gap-y-5 items-center w-max-[300px]">
            <p>Xác nhận tài liệu đã được in xong?</p>
            <div className="flex flex-row justify-around w-full">
                <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {openConfirm(); closeUpdate()}}>
                    Đồng ý
                </button>
                <button className="p-2 bg-blue-5 rounded-xl hover:scale-110 duration-200"
                    onClick={() => {closeUpdate()}}>
                    Hủy
                </button>
            </div>
        </div>
    </div>
}