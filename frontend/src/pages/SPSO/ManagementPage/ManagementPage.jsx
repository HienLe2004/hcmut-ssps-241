import { SPSOHeader } from "../../../components/SPSOHeader"
import { Footer } from "../../../components/footer";
import { DefaultA4Pages } from "./DefaultA4Pages";
import { ValidDocuments } from "./ValidDocuments";

export const ManagementPage = () => {
    return <>
        <div className="flex flex-col min-h-screen">
            <SPSOHeader />
            <div className="flex flex-col flex-grow items-center justify-center w-full my-5 gap-y-10">
                <ValidDocuments/>
                <DefaultA4Pages/>
            </div>
            <Footer />
        </div>
    </>
}