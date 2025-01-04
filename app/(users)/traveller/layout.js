import { TravellerNavbar } from "../../../components/TravellerNavbar";

const TravellerLayout = (
    {children}
) => {
    return (
        <>
            <TravellerNavbar />
            <div>
                {children}
            </div>
            {/* <FooterPage /> */}
        </>
    )
}

export default TravellerLayout;