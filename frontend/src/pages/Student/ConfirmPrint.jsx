

export const ConfirmPrint = ({ onClose, onConfirm, numPage, size }) => {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-4 rounded-lg px-4 py-0 text-white text-xl  ">
            <div className="flex flex-col justify-evenly w-[100%] h-[100%] px-2 py-4 ">
                <p className="mb-4">
                    Yêu cầu này cần sử dụng {numPage} tờ {size}
                    <br />
                    Bạn có chắc chắn yêu cầu này không?
                </p>
                
                <div className="flex flex-row justify-around my-2">
                    <button className="bg-blue-5 px-6 py-3 w-32 rounded-full"
                            onClick={onConfirm}>
                        Đồng ý
                    </button>

                    <button className="bg-blue-5 px-6 py-3 w-32 rounded-full"
                            onClick={onClose}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}