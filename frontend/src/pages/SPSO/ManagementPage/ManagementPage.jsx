import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { DefaultA4Pages } from "./DefaultA4Pages";
import { ValidDocuments } from "./ValidDocuments";

export const ManagementPage = () => {
    return <>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            <div className="justify-center flex">
                {/* Big */}
                <div className="hidden md:flex justify-center my-5 gap-x-10 bg-blue-3 min-w-[50%] p-2 rounded-xl text-xl">
                    <ValidDocuments className="bg-black"/>
                    <DefaultA4Pages/>
                </div>
                {/* Big */}
                <div className="flex flex-col md:hidden justify-center my-5 gap-x-10 bg-blue-3 min-w-[50%] p-2 rounded-xl text-xl">
                    <ValidDocuments className="bg-black"/>
                    <DefaultA4Pages/>
                </div>
            </div>
            <Footer />
        </div>
    </>
}