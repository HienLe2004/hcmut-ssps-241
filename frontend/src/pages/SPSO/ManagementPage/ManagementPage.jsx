import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";

export const ManagementPage = () => {
    return <>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            <div className="flex flex-col flex-grow items-center justify-center w-full my-5">
                <h1>ManagementPage</h1>
            </div>
            <Footer />
        </div>
    </>
}